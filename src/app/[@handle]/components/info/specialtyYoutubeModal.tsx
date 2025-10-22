"use client";

import LinkModal from "@/components/organisms/linkModal";
import { specialtyYoutubeModalState } from "@/lib/recoil/handle/atom";
import { useRecoilState } from "recoil";
import { youtubeModalInit } from "../../data";

const SpecialtyYoutubeModal = () => {
  const [youtubeModal, setYoutubeModal] = useRecoilState(
    specialtyYoutubeModalState
  );

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

export default SpecialtyYoutubeModal;
