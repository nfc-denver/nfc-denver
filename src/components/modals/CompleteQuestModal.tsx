import { useState } from "react";
import { Icons } from "../Icons";
import { PointCard } from "../cards/PointCard";
import { Modal, ModalProps } from "./Modal";
import { Button } from "../Button";
import useQuests from "@/hooks/useQuests";
import Link from "next/link";
import { QuestCard } from "../cards/QuestCard";

interface QuestDetailProps {
  questName?: string;
  type: "point" | "item";
}

interface CompleteQuestModalProps extends QuestDetailProps, ModalProps {}

const RedeemPoint = ({ questName }: Omit<QuestDetailProps, "type">) => {
  const [redeemPoint, setRedeemPoint] = useState(false);

  return (
    <div className="flex flex-col w-full justify-center text-center gap-5">
      <div className="h-10 w-10 bg-slate-200 rounded-full self-center"></div>
      <div className="flex flex-col gap-1 self-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-10">{questName}</span>
          <span className="text-xl text-gray-12">Quest completed</span>
        </div>
      </div>
      <div className="flex self-center w-full justify-center">
        {!redeemPoint ? (
          <Button
            onClick={() => {
              setRedeemPoint(true);
            }}
            className="w-full"
          >
            Collected X BUILD
          </Button>
        ) : (
          <PointCard label="Your balance" point={99} />
        )}
      </div>
      <div className="flex items-center gap-1 self-center">
        <span className="text-sm text-gray-11">Share on</span>
        <Icons.twitter />
      </div>
    </div>
  );
};

const RedeemItem = ({ questName }: Omit<QuestDetailProps, "type">) => {
  const [redeemItem, setRedeemItem] = useState(false);

  if (redeemItem)
    return (
      <div className="flex-col w-full justify-center self-center items-center text-center">
        <div className="bg-slate-200 animate-pulse h-10 w-10 rounded-full mx-auto"></div>
      </div>
    );

  return (
    <div className="flex flex-col w-full justify-center text-center gap-5">
      <div className="h-10 w-10 bg-slate-200 rounded-full self-center"></div>
      <div className="flex flex-col gap-1 self-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-10">{questName}</span>
          <span className="text-xl text-gray-12">Quest completed</span>
        </div>
      </div>
      <div className="self-center w-full">
        {!redeemItem && (
          <Button
            onClick={() => {
              setRedeemItem(true);
            }}
            className="w-full"
          >
            Redeem item name
          </Button>
        )}
      </div>
      <div className="flex items-center gap-1 self-center">
        <span className="text-sm text-gray-11">Share on</span>
        <Icons.twitter />
      </div>
    </div>
  );
};

const CompleteQuestModal = ({
  isOpen,
  setIsOpen,
  questName,
  type,
}: CompleteQuestModalProps) => {
  const { quests } = useQuests();
  const [isQuestCompleted, setIsQuestCompleted] = useState(true);
  const MORE_QUESTS_TO_SHOW = 4;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} withBackButton>
      <div className="flex h-[50vh]">
        {type === "point" && <RedeemPoint questName={questName} />}
        {type === "item" && <RedeemItem questName={questName} />}
      </div>
      {isQuestCompleted ? (
        <div className="flex flex-col gap-4">
          <span className="text-xs text-gray-10 font-light">More quests</span>
          <div className="flex flex-col gap-2">
            {quests
              ?.slice(0, MORE_QUESTS_TO_SHOW)
              ?.map(
                (
                  {
                    id,
                    name,
                    description,
                    userRequirements,
                    locationRequirements,
                  },
                  index
                ) => (
                  <Link href={`/quests/${id}`} key={id}>
                    <QuestCard
                      title={name}
                      description={description}
                      completedSigs={1}
                      userRequirements={userRequirements}
                      locationRequirements={locationRequirements}
                    />
                  </Link>
                )
              )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <span className="text-xs text-gray-10 font-light">
            Continue quest
          </span>
          <div className="flex flex-col gap-2"></div>
        </div>
      )}
    </Modal>
  );
};

CompleteQuestModal.displayName = "CompleteQuestModal";
export { CompleteQuestModal };
