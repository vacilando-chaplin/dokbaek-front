import { handleNameState, isMyProfileState } from "@/lib/recoil/handle/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { routePaths } from "@/constants/routes";
import { toastMessage } from "@/lib/atoms";
import { useRouter } from "next/navigation";
import Plus from "../../../../../public/icons/Plus.svg";

interface ProfileShowcaseEmptyFrameProps {
  text: string;
  type: string;
}

const ProfileShowcaseEmptyFrame = ({
  text,
  type
}: ProfileShowcaseEmptyFrameProps) => {
  const router = useRouter();
  const handleName = useRecoilValue(handleNameState);
  const isMyProfile = useRecoilValue(isMyProfileState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const onMoveToCreate = () => {
    switch (type) {
      case "photo":
        router.prefetch(routePaths.profileEditPhoto(handleName));
        router.push(routePaths.profileEditPhoto(handleName));
        break;
      case "filmo":
        router.prefetch(routePaths.profileEditFilmo(handleName));
        router.push(routePaths.profileEditFilmo(handleName));
        break;
      case "video":
        router.prefetch(routePaths.profileEditVideo(handleName));
        router.push(routePaths.profileEditVideo(handleName));
        break;
      default:
        setToastMessage("다시 로그인 해주세요.");
    }
  };

  return (
    <div className="flex h-auto w-full min-w-[166px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-150 bg-gray-50 py-12">
      <span className="typography-body2 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
        {text}
      </span>
      <button
        className={`${isMyProfile ? "" : "hidden"} typography-body3 mt-[16px] flex h-[32px] w-fit items-center rounded-xl border border-border-default-light bg-static-white px-[12px] py-[7px] font-medium text-content-primary-light dark:text-content-primary-dark`}
        onClick={onMoveToCreate}
      >
        <Plus
          width="12"
          height="12"
          className="fill-current mr-[4px] text-content-primary-light dark:text-content-primary-dark"
        />
        추가
      </button>
    </div>
  );
};

export default ProfileShowcaseEmptyFrame;
