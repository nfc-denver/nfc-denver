import { object, string, date } from "yup";
import { decrypt, encrypt } from "../encryption";
export * from "./outboundTap";
export * from "./inboundTap";
export * from "./locationTap";
export * from "./questCompleted";

export enum JUB_SIGNAL_MESSAGE_TYPE {
  OUTBOUND_TAP = "OT",
  INBOUND_TAP = "IT",
  LOCATION_TAP = "LT",
  QUEST_COMPLETED = "QC",
}

export type MessageContents = {
  type: string;
  data: object;
};

export const messageContentsSchema = object({
  type: string().required(),
  data: object().required(),
});

export type MessageMetadata = {
  toPublicKey: string;
  fromPublicKey: string;
  fromDisplayName: string;
  timestamp: Date;
};

export const messageMetadataSchema = object({
  toPublicKey: string().required(),
  fromPublicKey: string().required(),
  fromDisplayName: string().required(),
  timestamp: date().required(),
});

export type EncryptedMessage = {
  metadata: MessageMetadata;
  encryptedContents: string;
};

export const encryptedMessageSchema = object({
  metadata: messageMetadataSchema.required(),
  encryptedContents: string().required(),
});

export type PlaintextMessage = {
  metadata: MessageMetadata;
  type: string;
  data: object;
};

export const encryptMessage = async (
  type: string,
  data: object,
  senderPrivateKey: string,
  recipientPublicKey: string
): Promise<string> => {
  const messageContents: MessageContents = { type, data };

  return await encrypt(
    senderPrivateKey,
    recipientPublicKey,
    JSON.stringify(messageContents)
  );
};

export const decryptMessage = async (
  encryptedMessage: EncryptedMessage,
  recipientPrivateKey: string
): Promise<PlaintextMessage> => {
  await encryptedMessageSchema.validate(encryptedMessage);

  const decryptedContents = await decrypt(
    recipientPrivateKey,
    encryptedMessage.metadata.fromPublicKey,
    encryptedMessage.encryptedContents
  );

  if (!decryptedContents) {
    throw new Error("Decryption failed.");
  }

  const messageContents: MessageContents = JSON.parse(decryptedContents);
  await messageContentsSchema.validate(messageContents);

  return {
    metadata: encryptedMessage.metadata,
    type: messageContents.type,
    data: messageContents.data,
  };
};