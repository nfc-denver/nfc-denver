import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { generateEncryptionKeyPair } from "@/lib/client/encryption";
import { generateSignatureKeyPair } from "@/lib/shared/signature";
import { generateSalt, hashPassword } from "@/lib/client/utils";
import {
  createBackup,
  deleteAccountFromLocalStorage,
  saveAuthToken,
  saveKeys,
  saveProfile,
} from "@/lib/client/localStorage";
import { verifySigninCodeResponseSchema } from "../lib/server/auth";
import { encryptBackupString } from "@/lib/shared/backup";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Link from "next/link";
import { FormStepLayout } from "@/layouts/FormStepLayout";
import toast from "react-hot-toast";
import {
  displayNameRegex,
  farcasterUsernameRegex,
  handleNicknameChange,
  telegramUsernameRegex,
  twitterUsernameRegex,
} from "@/lib/shared/utils";
import { Spinner } from "@/components/Spinner";
import { Radio } from "@/components/Radio";
import { Checkbox } from "@/components/Checkbox";
import { Icons } from "@/components/Icons";

enum DisplayState {
  INPUT_EMAIL,
  INPUT_CODE,
  INPUT_SOCIAL,
  CHOOSE_CUSTODY,
  INPUT_PASSWORD,
  CREATING_ACCOUNT,
}

export default function Register() {
  const router = useRouter();

  const [displayState, setDisplayState] = useState<DisplayState>(
    DisplayState.INPUT_EMAIL
  );
  const [cmac, setCmac] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [twitterUsername, setTwitterUsername] = useState<string>("@");
  const [telegramUsername, setTelegramUsername] = useState<string>("@");
  const [farcasterUsername, setFarcasterUsername] = useState<string>("@");
  const [bio, setBio] = useState<string>();
  const [wantsServerCustody, setWantsServerCustody] = useState<boolean>(false);
  const [allowsAnalytics, setAllowAnalytics] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.cmac) {
      setCmac(router.query.cmac as string);
    }
  }, [router.query.cmac]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayName(event.target.value);
  };

  const handleTwitterUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTwitterUsername(handleNicknameChange(event));
  };

  const handleTelegramUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTelegramUsername(handleNicknameChange(event));
  };

  const handleFarcasterUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFarcasterUsername(handleNicknameChange(event));
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleEmailSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    fetch("/api/register/get_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          setDisplayState(DisplayState.INPUT_CODE);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.message);
        setLoading(false);
      });
  };

  const handleCodeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    fetch("/api/register/verify_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const verifyCodeResponse =
          verifySigninCodeResponseSchema.validateSync(data);
        if (verifyCodeResponse.success) {
          setDisplayState(DisplayState.INPUT_SOCIAL);
        } else {
          const errorReason = verifyCodeResponse.reason;
          if (errorReason) {
            throw new Error(errorReason);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.message);
        setLoading(false);
      });
  };

  const handleSocialSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!displayNameRegex.test(displayName)) {
      toast.error(
        "Display name must be alphanumeric and less than 20 characters."
      );
      return;
    }

    if (twitterUsername && !twitterUsernameRegex.test(twitterUsername)) {
      toast.error("Invalid Twitter username.");
      return;
    }

    if (telegramUsername && !telegramUsernameRegex.test(telegramUsername)) {
      toast.error("Invalid Telegram username.");
      return;
    }

    if (farcasterUsername && !farcasterUsernameRegex.test(farcasterUsername)) {
      toast.error("Invalid Farcaster username.");
      return;
    }

    if (bio && bio.length > 200) {
      toast.error("Bio must be less than 200 characters.");
      return;
    }

    setDisplayState(DisplayState.CHOOSE_CUSTODY);
  };

  const handleCustodySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (wantsServerCustody) {
      await handleCreateAccount();
    } else {
      setDisplayState(DisplayState.INPUT_PASSWORD);
    }
  };

  const handleCreateAccount = async () => {
    setDisplayState(DisplayState.CREATING_ACCOUNT);

    const { privateKey, publicKey } = await generateEncryptionKeyPair();
    const { signingKey, verifyingKey } = generateSignatureKeyPair();

    let passwordSalt, passwordHash;
    if (!wantsServerCustody) {
      passwordSalt = generateSalt();
      passwordHash = await hashPassword(password, passwordSalt);
    }

    const response = await fetch("/api/register/create_account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cmac,
        email,
        code,
        displayName,
        twitterUsername,
        telegramUsername,
        farcasterUsername,
        bio,
        wantsServerCustody,
        allowsAnalytics,
        encryptionPublicKey: publicKey,
        signaturePublicKey: verifyingKey,
        passwordSalt,
        passwordHash,
      }),
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      toast.error("Error creating account! Please try again.");
      setDisplayState(DisplayState.INPUT_EMAIL);
      return;
    }

    const data = await response.json();
    if (!data.value || !data.expiresAt) {
      console.error("Account created, but no auth token returned.");
      toast.error("Account created, but error logging in! Please try again.");
      setDisplayState(DisplayState.INPUT_EMAIL);
      return;
    }

    // Ensure the user is logged out of an existing session before creating a new account
    deleteAccountFromLocalStorage();
    saveKeys({
      encryptionPrivateKey: privateKey,
      signaturePrivateKey: signingKey,
    });
    saveProfile({
      displayName,
      email,
      encryptionPublicKey: publicKey,
      signaturePublicKey: verifyingKey,
      wantsServerCustody,
      allowsAnalytics,
      twitterUsername,
      telegramUsername,
      farcasterUsername,
      bio,
    });
    saveAuthToken({
      value: data.value,
      expiresAt: new Date(data.expiresAt),
    });

    let backupData = createBackup();
    if (!backupData) {
      console.error("Error creating backup!");
      toast.error("Error creating backup! Please try again.");
      return;
    }

    // Encrypt backup data if user wants self custody
    const backup = wantsServerCustody
      ? backupData
      : encryptBackupString(backupData, email, password);

    const backupResponse = await fetch("/api/backup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        backup,
        wantsServerCustody,
        authToken: data.value,
      }),
    });

    if (!backupResponse.ok) {
      console.error(`HTTP error! status: ${backupResponse.status}`);
      toast.error("Error storing backup! Please try again.");
      return;
    }

    toast.success("Account created and backed up!");
    router.push("/");
  };

  const handleCreateSelfCustodyAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    await handleCreateAccount();
  };

  return (
    <>
      {displayState === DisplayState.INPUT_EMAIL && (
        <FormStepLayout
          title="Welcome to ETHDenver"
          description={new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
          onSubmit={handleEmailSubmit}
        >
          <Input
            label="Email"
            placeholder="Your email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <Button loading={loading} type="submit">
            Continue
          </Button>
          <Link href="/login" className="link text-center">
            I have already registered
          </Link>
        </FormStepLayout>
      )}
      {displayState === DisplayState.INPUT_CODE && (
        <FormStepLayout
          title={`We've just sent you a six digit code to ${email}`}
          description="February 23rd"
          onSubmit={handleCodeSubmit}
        >
          <Input
            type="text"
            name="code"
            value={code}
            label="6-digit code"
            placeholder="Confirm your 6-digit code"
            onChange={handleCodeChange}
            required
          />
          <Button loading={loading} type="submit">
            Continue
          </Button>
        </FormStepLayout>
      )}
      {displayState === DisplayState.INPUT_SOCIAL && (
        <FormStepLayout
          title="Social settings"
          description="1/2"
          onSubmit={handleSocialSubmit}
          header={
            <div className="flex flex-col gap-4">
              <span className="text-sm text-gray-11 font-light">
                You can choose which social channels to share each time you make
                a new connection
              </span>
              <Input
                type="text"
                name="displayName"
                label="Display name"
                placeholder="Choose a display name"
                value={displayName}
                onChange={handleDisplayNameChange}
                required
              />
              <Input
                type="text"
                name="twitterUsername"
                label="X (Optional)"
                placeholder="twitter.com/username"
                value={twitterUsername}
                onChange={handleTwitterUsernameChange}
              />
              <Input
                type="text"
                name="telegramUsername"
                label="Telegram (Optional)"
                placeholder="Telegram username"
                value={telegramUsername}
                onChange={handleTelegramUsernameChange}
              />
              <Input
                type="text"
                name="farcasterUsername"
                label="Farcaster (Optional)"
                placeholder="Farcaster username"
                value={farcasterUsername}
                onChange={handleFarcasterUsernameChange}
              />
              <Input
                type="text"
                name="bio"
                label="Bio (Optional)"
                placeholder="Notes about yourself"
                value={bio}
                onChange={handleBioChange}
              />
            </div>
          }
        >
          <Button type="submit">Create account</Button>
        </FormStepLayout>
      )}
      {displayState === DisplayState.CHOOSE_CUSTODY && (
        <FormStepLayout
          onSubmit={handleCustodySubmit}
          description="2/2"
          title="Ownership & analytics consent"
          header={
            <fieldset className="flex flex-col gap-6">
              <span className="text-gray-11 text-sm">
                Cursive has integrated ZK tech into this experience to enable
                full data ownership and portability. Choose if you want to
                enable it.
              </span>
              <Radio
                id="selfCustody"
                name="custody"
                value="self"
                label="Self custody"
                description="Your ETHDenver interaction data is private to you, encrypted by a master password set on the next page. ZK proofs are used to prove quest completion."
                checked={!wantsServerCustody}
                onChange={() => setWantsServerCustody(false)}
              />
              <Radio
                id="serverCustody"
                type="radio"
                name="custody"
                value="server"
                label="Server custody"
                description="Your ETHDenver interaction data is stored in plaintext, and may be shared with third parties."
                checked={wantsServerCustody}
                onChange={() => setWantsServerCustody(true)}
              />
              <span className="text-gray-11 text-sm">
                If we have your consent, Cursive will use client-side
                performance analytics to determine how to improve the app. This
                will never include any identifying information.
              </span>
              <Checkbox
                id="allowAnalytics"
                label="I consent to sharing analytics data"
                checked={allowsAnalytics}
                onChange={setAllowAnalytics}
                disabled={false}
              />
            </fieldset>
          }
        >
          <Button type="submit">Continue</Button>
        </FormStepLayout>
      )}
      {displayState === DisplayState.INPUT_PASSWORD && (
        <FormStepLayout
          title={
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setDisplayState(DisplayState.CHOOSE_CUSTODY);
                }}
                type="button"
                className="flex gap-2 items-center"
              >
                <Icons.arrowLeft />
                <span className="text-xs text-gray-11">Choose custody</span>
              </button>
              <span>Master password</span>
            </div>
          }
          onSubmit={handleCreateSelfCustodyAccount}
        >
          <Input
            type="password"
            name="password"
            label="Master password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm master password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <span className="text-gray-11 text-sm">
            This master password is used to encrypt a backup of your interaction
            data on our server. You are responsible for saving this password, or
            manually backing up your data in the app.
          </span>
          <Button type="submit">Create account</Button>
        </FormStepLayout>
      )}
      {displayState === DisplayState.CREATING_ACCOUNT && (
        <div className="my-auto mx-auto">
          <Spinner />
        </div>
      )}
    </>
  );
}

Register.getInitialProps = () => {
  return { fullPage: true };
};
