"use client";

import { ProfileSpecialtyType } from "@/app/profile/[id]/create/types";
import YoutubeVideo from "@/components/atoms/youtubeVideo";
import { useActive } from "@/lib/hooks";
import Image from "next/image";

interface SpecialtyModalItemProps {
  specialty: ProfileSpecialtyType;
}

const SpecialtyModalItem = ({ specialty }: SpecialtyModalItemProps) => {
  const { active, onActive } = useActive(false);
  const { imageUrl, mediaUrl } = specialty;

  return (
    <button
      type="button"
      className="flex h-auto w-full flex-row gap-3 rounded-xl bg-gray-100 p-3 transition-all duration-300 ease-linear"
      disabled={!imageUrl && !mediaUrl}
      onClick={onActive}
    >
      <span className="typography-body3 font-medium text-content-primary-light dark:text-content-primary-dark">
        {specialty.specialty.specialtyName}
      </span>
      {active && (
        <div className="flex h-auto w-auto flex-row gap-2">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="특기 이미지"
              width={80}
              height={80}
              className="rounded-lg bg-background-surface-light shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:bg-background-surface-dark"
            />
          )}
          {mediaUrl && (
            <div className="h-20 w-auto rounded-lg">
              <YoutubeVideo link={mediaUrl} />
            </div>
          )}
        </div>
      )}
    </button>
  );
};

export default SpecialtyModalItem;
