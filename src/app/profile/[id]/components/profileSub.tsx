"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import {
  FilmoResponseType,
  PhotoResponseType,
  VideoResponseType
} from "@/lib/types";
import Title from "@/components/atoms/title";
import EmptyState from "@/components/molecules/emptyState";
import FilmoItem from "@/components/molecules/filmoItem";
import YoutubeVideo from "@/components/atoms/youtubeVideo";
import ArrowChevronLeft from "../../../../../public/icons/ArrowChevronLeft.svg";
import ArrowChevronRight from "../../../../../public/icons/ArrowChevronRight.svg";
import PlusCircle from "../../../../../public/icons/PlusCircle.svg";
import { PhotoLabelType } from "../types";

interface PropfileSubProps {
  linear: string;
  photoLabel: PhotoLabelType;
  profilePhotoList: PhotoResponseType[];
  stillcutPhotoList: PhotoResponseType[];
  recentPhotoList: PhotoResponseType[];
  filmographyList: FilmoResponseType[];
  videoList: VideoResponseType[];
  setStepperData: React.Dispatch<React.SetStateAction<number>>;
  onMoveToCreate: () => void;
  onSwitchPhotoLabel: () => void;
  onPhotoModalOpen: (photo: string) => void;
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoLinkModalOpen: (link: string) => void;
}

const ProfileSub = ({
  linear,
  photoLabel,
  profilePhotoList,
  stillcutPhotoList,
  recentPhotoList,
  filmographyList,
  videoList,
  setStepperData,
  onMoveToCreate,
  onSwitchPhotoLabel,
  onPhotoModalOpen,
  onFilmoModalActive,
  onFilmoLinkModalOpen
}: PropfileSubProps) => {
  const repFilmoList = filmographyList.filter(
    (filmo: FilmoResponseType) => filmo.is_featured === true
  );

  const [photoSlider, setPhotoSlider] = useState(0);

  const onSliderPrev = () => {
    setPhotoSlider((prev) => (prev !== 0 ? prev - 1 : 0));
  };

  const onSliderNext = (slides: number) => {
    setPhotoSlider((prev) =>
      prev <= Math.floor(slides / 5) - 1 ? prev + 1 : prev
    );
  };

  return (
    <section
      className={`flex h-full w-full flex-col gap-10 p-8 ${linear === "sub" && "border-l-[1px] border-border-default-light"}`}
    >
      {/* photo */}
      <div className="flex h-auto w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title name="사진" />
          {profilePhotoList.length > 4 && (
            <div className="flex gap-1">
              {/* PrevButton */}
              <button
                className={`rounded-full bg-gray-150 p-1.5 ${photoSlider === 0 && "opacity-40"}`}
                type="button"
                disabled={photoSlider === 0}
                onClick={onSliderPrev}
              >
                <ArrowChevronLeft width="16" height="16" fill="#5E656C" />
              </button>
              {/* NextButton */}
              <button
                className={`rounded-full bg-gray-150 p-1.5 ${photoSlider === Math.floor(profilePhotoList.length / 5) && "opacity-40"}`}
                type="button"
                disabled={
                  photoSlider === Math.floor(profilePhotoList.length / 5)
                }
                onClick={() => onSliderNext(profilePhotoList.length)}
              >
                <ArrowChevronRight width="16" height="16" fill="#5E656C" />
              </button>
            </div>
          )}
        </div>
        {profilePhotoList.length >= 1 ? (
          <div className="relative overflow-hidden">
            <div
              className="relative flex h-auto w-full gap-2 transition-all duration-500 ease-out"
              style={{
                transform: `translateX(-${photoSlider * 100}%)`
              }}
            >
              {profilePhotoList.map((photo: PhotoResponseType) => {
                return (
                  <Fragment key={photo.id}>
                    <figure
                      className="relative flex w-[20%] min-w-[20%] cursor-pointer items-center justify-center rounded-[18px]"
                      onClick={() => onPhotoModalOpen(photo.path)}
                    >
                      <Image
                        src={photo.previewPath}
                        alt={photo.id}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-[40vh] w-full rounded-2xl opacity-100 transition-all ease-in hover:opacity-30"
                      />
                      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl bg-static-black text-static-white opacity-0 hover:bg-[rgba(0,0,0,0.8)] hover:opacity-100">
                        <PlusCircle width="20" height="20" fill="#ffffff" />
                        <span className="typography-body2 font-semibold">
                          크게 보기
                        </span>
                      </div>
                    </figure>
                  </Fragment>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState
            text="사진이 없어요."
            button
            buttonSize="small"
            buttonText="추가"
            buttonType="secondaryOutlined"
            onClick={() => {
              setStepperData(1);
              onMoveToCreate();
            }}
          />
        )}
      </div>
      {/* filmography */}
      <div className="flex h-auto w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title name="작품 활동" />
          {filmographyList.length > 6 && (
            <button
              type="button"
              className="flex gap-1 rounded"
              onClick={onFilmoModalActive}
            >
              <span className="typography-body2 font-medium text-content-tertiary-light">
                모두 보기
              </span>
            </button>
          )}
        </div>
        {filmographyList.length >= 1 && repFilmoList.length < 6 && (
          <div className="grid h-auto w-auto grid-cols-3 gap-2">
            {filmographyList.map((filmo: FilmoResponseType, index: number) => {
              return (
                <div
                  key={filmo.id}
                  className={`grid gap-2 ${index > 5 && "hidden"}`}
                >
                  <FilmoItem
                    filmo={filmo}
                    canEdit={false}
                    onLink={() =>
                      onFilmoLinkModalOpen(filmo.production.videoUrl)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
        {filmographyList.length >= 1 && repFilmoList.length === 6 && (
          <div className="grid h-auto w-auto grid-cols-3 gap-2">
            {repFilmoList.map((filmo: FilmoResponseType, index: number) => {
              return (
                <div
                  key={filmo.id}
                  className={`grid gap-2 ${index > 5 && "hidden"}`}
                >
                  <FilmoItem
                    filmo={filmo}
                    canEdit={false}
                    onLink={() =>
                      onFilmoLinkModalOpen(filmo.production.videoUrl)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
        {filmographyList.length === 0 && (
          <EmptyState
            text="작품 활동이 없어요."
            button
            buttonSize="small"
            buttonText="추가"
            buttonType="secondaryOutlined"
            onClick={() => {
              setStepperData(2);
              onMoveToCreate();
            }}
          />
        )}
      </div>
      {/* Youtube Video */}
      <div className="flex h-auto w-full flex-col gap-3">
        <Title name="영상" />
        {videoList.length >= 1 ? (
          <div className="grid h-auto w-full grid-cols-3 flex-row gap-2">
            {videoList.map((video: VideoResponseType) => {
              return <YoutubeVideo key={video.id} link={video.url} />;
            })}
          </div>
        ) : (
          <EmptyState
            text="영상이 없어요."
            button
            buttonSize="small"
            buttonText="추가"
            buttonType="secondaryOutlined"
            onClick={() => {
              setStepperData(3);
              onMoveToCreate();
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProfileSub;
