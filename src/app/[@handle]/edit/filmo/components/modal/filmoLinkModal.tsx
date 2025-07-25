"use client";

import LinkModal from "@/components/organisms/linkModal";
import { filmoYoutubeLinkModalState } from "@/lib/recoil/handle/edit/filmo/atom";
import { useRecoilState } from "recoil";

const FilmoLinkModal = () => {
  const [linkModal, setLinkModal] = useRecoilState(filmoYoutubeLinkModalState);

  // 필모그래피 링크 모달 닫기
  const onLinkModalClose = () => {
    setLinkModal({ ...linkModal, active: false });
  };

  return (
    <>
      {linkModal.active && (
        <LinkModal link={linkModal.url} onLinkModalClose={onLinkModalClose} />
      )}
    </>
  );
};

export default FilmoLinkModal;
