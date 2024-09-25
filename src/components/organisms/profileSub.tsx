import { useRouter } from "next/navigation";
import ProfileBox from "../molecules/profileBox";
import Title from "../atoms/title";
import { filmoInputsTypes } from "@/types/types";
import Image from "next/image";
import FilmoItem from "../molecules/filmoItem";

interface PropfileSubProps {
  photo: string[];
  filmography: filmoInputsTypes[];
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfileSub = ({
  photo,
  filmography,
  setStepper,
  onFilmoModalActive
}: PropfileSubProps) => {
  const router = useRouter();
  return (
    <section className="flex h-full w-full flex-col gap-10 p-8">
      {/* photo */}
      <div className="flex h-auto w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title name="사진" />
          {photo.length > 4 && (
            <div className="flex gap-1">
              <div className={`rounded-full bg-gray-150 p-1.5 opacity-40`}>
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
              <div className={`rounded-full bg-gray-150 p-1.5`}>
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
          <div className="flex flex-row gap-2">
            {photo.map((item: string, index: number) => {
              return (
                <Image
                  key={item + index}
                  src={item}
                  alt={"photo" + (index + 1)}
                  width={258}
                  height={330}
                  className="rounded-2xl bg-gray-100"
                />
              );
            })}
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
      <div className="flex h-auto w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <Title name="작품 활동" />
          {filmography.length > 6 && (
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
          <div className="flex h-auto w-full flex-row flex-wrap gap-2">
            {filmography.map((filmo: filmoInputsTypes, index: number) => {
              return (
                <div
                  className={`flex h-auto w-[447px] gap-2 ${index > 5 && "hidden"}`}
                >
                  <FilmoItem key={filmo.id} filmo={filmo} canEdit={false} />
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
      <div className="flex h-auto w-full flex-col gap-3">
        <Title name="영상" />
        <ProfileBox
          text="영상이 없어요."
          buttonText="영상 추가"
          onClick={() => router.push("/profile")}
        />
      </div>
    </section>
  );
};

export default ProfileSub;
