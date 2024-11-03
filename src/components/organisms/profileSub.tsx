"use client";

import { useRouter } from "next/navigation";
import ProfileBox from "../molecules/profileBox";
import Title from "../atoms/title";
import { filmoInputsTypes, PhotoTypes, VideoTypes } from "@/types/types";
import Image from "next/image";
import FilmoItem from "../molecules/filmoItem";
import YoutubeVideo from "../atoms/youtubeVideo";
import { useState } from "react";

interface PropfileSubProps {
  linear: string;
  subRef: any;
  photo: any;
  filmography: filmoInputsTypes[];
  video: VideoTypes[];
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  onPhotoModalActive: (photo: string) => void;
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onFilmoLink: (link: string) => void;
}

const ProfileSub = ({
  linear,
  subRef,
  photo,
  filmography,
  video,
  setStepper,
  onPhotoModalActive,
  onFilmoModalActive,
  onFilmoLink
}: PropfileSubProps) => {
  const router = useRouter();

  const [photoSlider, setPhotoSlider] = useState(0);

  const onSliderPrev = () => {
    setPhotoSlider((prev) => (prev !== 0 ? prev - 1 : 0));
  };

  const onSliderNext = (slides: number) => {
    setPhotoSlider((prev) =>
      prev === Math.floor(slides / 5) - 1 ? prev + 1 : prev
    );
  };

  const repFilmoList = filmography.filter(
    (filmo: filmoInputsTypes) => filmo.representative === true
  );

  return (
    <section
      ref={subRef}
      className={`flex h-full w-full flex-col gap-10 p-8 ${linear === "sub" && "border-l-[1px] border-border-default-light"}`}
    >
      {/* photo */}
      <div className="flex h-auto w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title name="사진" />
          {photo.length > 4 && (
            <div className="flex gap-1">
              {/* PrevButton */}
              <div
                className={`rounded-full bg-gray-150 p-1.5 ${photoSlider === 0 && "opacity-40"}`}
                onClick={onSliderPrev}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.7071 3.29289C17.0976 3.68342 17.0976 4.31658 16.7071 4.70711L9.41421 12L16.7071 19.2929C17.0976 19.6834 17.0976 20.3166 16.7071 20.7071C16.3166 21.0976 15.6834 21.0976 15.2929 20.7071L6.58578 12L15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289Z"
                    fill="#5E656C"
                  />
                </svg>
              </div>
              {/* NextButton */}
              <div
                className={`rounded-full bg-gray-150 p-1.5 ${photoSlider === Math.floor(photo.length / 5) && "opacity-40"}`}
                onClick={() => onSliderNext(photo.length)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.29289 3.29289C7.68342 2.90237 8.31658 2.90237 8.70711 3.29289L17.4142 12L8.70711 20.7071C8.31658 21.0976 7.68342 21.0976 7.29289 20.7071C6.90237 20.3166 6.90237 19.6834 7.29289 19.2929L14.5858 12L7.29289 4.70711C6.90237 4.31658 6.90237 3.68342 7.29289 3.29289Z"
                    fill="#5E656C"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        {photo.length >= 1 ? (
          <div className="relative overflow-hidden">
            <div
              className="relative flex h-auto w-full gap-2 transition-all duration-500 ease-out"
              style={{ transform: `translateX(-${photoSlider * 100}%)` }}
            >
              {photo.map((item: PhotoTypes) => {
                return (
                  <figure
                    key={`photo${item.id}`}
                    className="relative flex w-[20%] min-w-[20%] cursor-pointer items-center justify-center rounded-[18px]"
                    onClick={() => onPhotoModalActive(item.photo)}
                  >
                    <Image
                      src={item.photo}
                      alt={`photo${item.id}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-[40vh] w-full rounded-2xl opacity-100 transition-all ease-in hover:opacity-30"
                    />
                    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl bg-static-black text-static-white opacity-0 hover:bg-[rgba(0,0,0,0.8)] hover:opacity-100">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V11H8C7.44772 11 7 11.4477 7 12C7 12.5522 7.44772 13 8 13H11V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V13H16C16.5523 13 17 12.5522 17 12C17 11.4477 16.5523 11 16 11H13V8Z"
                          fill="#ffffff"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          fill="#ffffff"
                        />
                      </svg>
                      <span className="text-body2 font-semibold leading-body2 tracking-body2">
                        크게 보기
                      </span>
                    </div>
                  </figure>
                );
              })}
            </div>
          </div>
        ) : (
          <ProfileBox
            text="사진이 없어요."
            buttonText="사진 추가"
            onClick={() => {
              router.push("/profile");
              setStepper(1);
            }}
          />
        )}
      </div>
      {/* filmography */}
      <div className="flex h-auto w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title name="작품 활동" />
          {filmography.length >= 1 &&
            repFilmoList.length !== filmography.length && (
              <button
                type="button"
                className="flex gap-1 rounded"
                onClick={onFilmoModalActive}
              >
                <span className="text-body2 font-medium leading-body2 tracking-body2 text-content-tertiary-light">
                  모두 보기
                </span>
              </button>
            )}
        </div>
        {filmography.length >= 1 ? (
          <div className="grid h-auto w-auto grid-cols-3 gap-2">
            {repFilmoList.map((filmo: filmoInputsTypes, index: number) => {
              return (
                <div
                  key={filmo.id}
                  className={`grid gap-2 ${index > 5 && "hidden"}`}
                >
                  <FilmoItem
                    filmo={filmo}
                    canEdit={false}
                    canLink={true}
                    onLink={onFilmoLink}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <ProfileBox
            text="작품 활동이 없어요."
            buttonText="작품 활동 추가"
            onClick={() => {
              router.push("/profile");
              setStepper(2);
            }}
          />
        )}
      </div>
      {/* Youtube Video */}
      <div className="flex h-auto w-full flex-col gap-3">
        <Title name="영상" />
        {video.length >= 1 ? (
          <div className="grid h-auto w-full grid-cols-3 flex-row gap-2">
            {video.map((item: VideoTypes) => {
              return <YoutubeVideo key={item.id} link={item.link} />;
            })}
          </div>
        ) : (
          <ProfileBox
            text="영상이 없어요."
            buttonText="영상 추가"
            onClick={() => router.push("/profile")}
          />
        )}
      </div>
    </section>
  );
};

export default ProfileSub;
