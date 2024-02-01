import {
  LocationRequirement,
  QuestProof,
  QuestWithRequirements,
  UserRequirement,
} from "@/types";
import {
  MembershipProof,
  MerkleProof,
  PublicInputs,
  Signature,
  batchProveMembership,
  computeMerkleProof,
  derDecodeSignature,
  deserializeMembershipProof,
  getECDSAMessageHash,
  getPublicInputsFromSignature,
  hexToBigInt,
  proveMembership,
  publicKeyFromString,
  serializeMembershipProof,
} from "babyjubjub-ecdsa";
import {
  LocationSignature,
  User,
  getLocationSignatures,
  getUsers,
} from "./localStorage";
// @ts-ignore
import { buildPoseidonReference as buildPoseidon } from "circomlibjs";
import {
  getClientPathToCircuits,
  getRandomNullifierRandomness,
} from "../shared/provingConfig";

export const serializeQuestProof = (proof: QuestProof): string => {
  return JSON.stringify({
    userProofs: proof.userProofs.map((proofs) =>
      proofs.map(serializeMembershipProof)
    ),
    locationProofs: proof.locationProofs.map((proofs) =>
      proofs.map(serializeMembershipProof)
    ),
  });
};

export const deserializeQuestProof = (serializedProof: string): QuestProof => {
  const proof = JSON.parse(serializedProof);
  return {
    userProofs: proof.userProofs.map((proofs: string[]) =>
      proofs.map(deserializeMembershipProof)
    ),
    locationProofs: proof.locationProofs.map((proofs: string[]) =>
      proofs.map(deserializeMembershipProof)
    ),
  };
};

export type QuestProvingState = {
  numRequirementsUpdate?: {
    numRequirementsTotal: number;
    numRequirementsProven: number;
  };
  currentRequirementUpdate?: {
    currentRequirementNumSigsTotal: number;
    currentRequirementNumSigsProven: number;
  };
};

export const generateProofForQuest = async (
  quest: QuestWithRequirements,
  onUpdateProvingState?: (newProvingState: QuestProvingState) => void
): Promise<string> => {
  const poseidon = await buildPoseidon();
  const users = getUsers();
  const locationSignatures = getLocationSignatures();

  // TODO: Add sig nullifier randomness AT THE REQUIREMENT LEVEL
  const sigNullifierRandomness = "0";

  let onUpdateProvingStateForCurrentRequirement = undefined;
  if (onUpdateProvingState) {
    onUpdateProvingStateForCurrentRequirement = (newProvingState: {
      currentRequirementNumSigsTotal: number;
      currentRequirementNumSigsProven: number;
    }) => {
      onUpdateProvingState({
        currentRequirementUpdate: newProvingState,
      });
    };
  }

  const numRequirementsTotal =
    quest.userRequirements.length + quest.locationRequirements.length;
  if (onUpdateProvingState) {
    onUpdateProvingState({
      numRequirementsUpdate: {
        numRequirementsTotal,
        numRequirementsProven: 0,
      },
    });
  }

  const userProofs: MembershipProof[][] = [];
  for (let i = 0; i < quest.userRequirements.length; i++) {
    const requirement = quest.userRequirements[i];
    try {
      const proof = await generateProofForUserRequirement(
        users,
        requirement,
        sigNullifierRandomness,
        poseidon,
        onUpdateProvingStateForCurrentRequirement
      );
      userProofs.push(proof);

      if (onUpdateProvingState) {
        onUpdateProvingState({
          numRequirementsUpdate: {
            numRequirementsTotal,
            numRequirementsProven: i + 1,
          },
        });
      }
    } catch (e) {
      throw new Error(
        `Failed to generate proof for user requirement #${i + 1}: ${e}`
      );
    }
  }

  const locationProofs: MembershipProof[][] = [];
  for (let i = 0; i < quest.locationRequirements.length; i++) {
    const requirement = quest.locationRequirements[i];
    try {
      const proof = await generateProofForLocationRequirement(
        locationSignatures,
        requirement,
        sigNullifierRandomness,
        poseidon,
        onUpdateProvingStateForCurrentRequirement
      );
      locationProofs.push(proof);

      if (onUpdateProvingState) {
        onUpdateProvingState({
          numRequirementsUpdate: {
            numRequirementsTotal,
            numRequirementsProven: quest.userRequirements.length + i + 1,
          },
        });
      }
    } catch (e) {
      throw new Error(
        `Failed to generate proof for location requirement #${i + 1}: ${e}`
      );
    }
  }
  return serializeQuestProof({ userProofs, locationProofs });
};

const generateProofForUserRequirement = async (
  users: Record<string, User>,
  requirement: UserRequirement,
  sigNullifierRandomness: string,
  hashFn: any,
  onUpdateProvingState?: (newProvingState: {
    currentRequirementNumSigsTotal: number;
    currentRequirementNumSigsProven: number;
  }) => void
): Promise<MembershipProof[]> => {
  const requiredSigPubKeys = requirement.users.map(
    (user) => user.signaturePublicKey
  );
  const collectedSigUsers = Object.values(users).filter(
    (user) =>
      user.sigPk &&
      user.sig &&
      user.msg &&
      requiredSigPubKeys.includes(user.sigPk)
  );
  if (collectedSigUsers.length < requirement.numSigsRequired) {
    throw new Error("Not enough signatures for user requirement");
  }

  // Must use random nullifier randomness for each batch membership proof
  const randomNullifierRandomness = hexToBigInt(getRandomNullifierRandomness());
  const requiredSigPubKeysEdwards = requiredSigPubKeys.map((pubKey) =>
    publicKeyFromString(pubKey).toEdwards()
  );
  const proofSigUsers = collectedSigUsers.slice(0, requirement.numSigsRequired);

  if (onUpdateProvingState) {
    onUpdateProvingState({
      currentRequirementNumSigsTotal: requirement.numSigsRequired,
      currentRequirementNumSigsProven: 0,
    });
  }

  const proofs: MembershipProof[] = [];
  for (let i = 0; i < proofSigUsers.length; i++) {
    const user = proofSigUsers[i];
    const sig = derDecodeSignature(user.sig!);
    const msgHash = hexToBigInt(getECDSAMessageHash(user.msg!));
    const index = requiredSigPubKeys.indexOf(user.sigPk!);
    const pubKey = publicKeyFromString(user.sigPk!);
    const publicInputs = getPublicInputsFromSignature(sig, msgHash, pubKey);
    const merkleProof = await computeMerkleProof(
      requiredSigPubKeysEdwards,
      index,
      hashFn
    );

    const proof = await proveMembership({
      sig,
      msgHash,
      publicInputs,
      merkleProof,
      sigNullifierRandomness: hexToBigInt(sigNullifierRandomness),
      pubKeyNullifierRandomness: randomNullifierRandomness,
      pathToCircuits: getClientPathToCircuits(),
    });
    proofs.push(proof);

    if (onUpdateProvingState) {
      onUpdateProvingState({
        currentRequirementNumSigsTotal: requirement.numSigsRequired,
        currentRequirementNumSigsProven: i + 1,
      });
    }
  }

  return proofs;
};

const generateProofForLocationRequirement = async (
  locations: Record<string, LocationSignature>,
  requirement: LocationRequirement,
  sigNullifierRandomness: string,
  hashFn: any,
  onUpdateProvingState?: (newProvingState: {
    currentRequirementNumSigsTotal: number;
    currentRequirementNumSigsProven: number;
  }) => void
): Promise<MembershipProof[]> => {
  const requiredSigPubKeys = requirement.locations.map(
    (location) => location.signaturePublicKey
  );
  const collectedSigLocations = Object.values(locations).filter(
    (location) =>
      location.pk &&
      location.sig &&
      location.msg &&
      requiredSigPubKeys.includes(location.pk)
  );
  if (collectedSigLocations.length < requirement.numSigsRequired) {
    throw new Error("Not enough signatures for location requirement");
  }

  // Must use random nullifier randomness for each batch membership proof
  const randomNullifierRandomness = hexToBigInt(getRandomNullifierRandomness());
  const requiredSigPubKeysEdwards = requiredSigPubKeys.map((pubKey) =>
    publicKeyFromString(pubKey).toEdwards()
  );
  const proofSigLocations = collectedSigLocations.slice(
    0,
    requirement.numSigsRequired
  );

  if (onUpdateProvingState) {
    onUpdateProvingState({
      currentRequirementNumSigsTotal: requirement.numSigsRequired,
      currentRequirementNumSigsProven: 0,
    });
  }

  const proofs: MembershipProof[] = [];
  for (let i = 0; i < proofSigLocations.length; i++) {
    const location = proofSigLocations[i];
    const sig = derDecodeSignature(location.sig!);
    const msgHash = hexToBigInt(getECDSAMessageHash(location.msg!));
    const index = requiredSigPubKeys.indexOf(location.pk!);
    const pubKey = publicKeyFromString(location.pk!);
    const publicInputs = getPublicInputsFromSignature(sig, msgHash, pubKey);
    const merkleProof = await computeMerkleProof(
      requiredSigPubKeysEdwards,
      index,
      hashFn
    );

    const proof = await proveMembership({
      sig,
      msgHash,
      publicInputs,
      merkleProof,
      sigNullifierRandomness: hexToBigInt(sigNullifierRandomness),
      pubKeyNullifierRandomness: randomNullifierRandomness,
      pathToCircuits: getClientPathToCircuits(),
    });
    proofs.push(proof);

    if (onUpdateProvingState) {
      onUpdateProvingState({
        currentRequirementNumSigsTotal: requirement.numSigsRequired,
        currentRequirementNumSigsProven: i + 1,
      });
    }
  }

  return proofs;
};
