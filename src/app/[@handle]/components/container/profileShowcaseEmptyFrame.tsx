import {useRouter} from "next/navigation";

interface ProfileShowcaseEmptyFrameProps {
  text: string;
  type: string;
}
import Plus from "/public/icons/Plus.svg";
import {handleNameState} from "@/lib/recoil/handle/atom";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { routePaths } from "@/constants/routes";
import {toastMessage} from "@/lib/atoms";

// edit/photo, filmo, video

const ProfileShowcaseEmptyFrame = ({
  text, type
}: ProfileShowcaseEmptyFrameProps) => {
  const router = useRouter();
  const handleName = useRecoilValue(handleNameState);
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
  }

  return (
    <div className="flex h-auto w-full min-w-[166px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-150 bg-gray-50 py-12">
      <span className="typography-body2 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
        {text}
      </span>
      <button
        className="flex items-center py-[7px] px-[12px] mt-[16px] w-fit h-[32px] bg-static-white border border-border-default-light rounded-xl typography-body3 font-medium text-content-primary-light dark:text-content-primary-dark"
        onClick={onMoveToCreate}
      >
        <Plus
          width="12"
          height="12"
          className="fill-current text-content-primary-light dark:text-content-primary-dark mr-[4px]"
        />
        추가
      </button>
    </div>
  );
};

export default ProfileShowcaseEmptyFrame;
