"use client";

import LinkModal from "@/components/organisms/linkModal";
import { filmoYoutubeModalState } from "@/lib/recoil/handle/atom";
import { useRecoilState } from "recoil";
import { youtubeModalInit } from "../../data";

const FilmoYoutubeModal = () => {
  const [youtubeModal, setYoutubeModal] = useRecoilState(
    filmoYoutubeModalState
  );

  // 필모그래피 유튜브 모달 닫기
  const onYoutubeModalClose = () => {
    setYoutubeModal(youtubeModalInit);
  };

  return (
    youtubeModal.active && (
      <LinkModal
        link={youtubeModal.url}
        onLinkModalClose={onYoutubeModalClose}
      />
    )
  );
};

export default FilmoYoutubeModal;
