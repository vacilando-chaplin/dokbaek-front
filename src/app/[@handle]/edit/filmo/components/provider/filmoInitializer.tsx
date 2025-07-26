"use client";

import { useLayoutEffect } from "react";
import {
  getFilmoCategories,
  getFilmoRoles
} from "../../../../../[@handle]/api";
import { useSetRecoilState } from "recoil";
import {
  filmoCategoryListState,
  filmoDeleteModalState,
  filmoInputState,
  filmoModalState,
  filmoRepActiveState,
  filmoRepEditListState,
  filmoRoleListState,
  filmoYoutubeLinkModalState
} from "@/lib/recoil/handle/edit/filmo/atom";
import {
  filmoDeleteModalInit,
  filmoInputInit,
  filmoLinkModalInit,
  filmoModalInit
} from "../../data";

interface FilmoInitializerProps {
  children: React.ReactNode;
}

const FilmoInintializer = ({ children }: FilmoInitializerProps) => {
  const setFilmoCategoryList = useSetRecoilState(filmoCategoryListState);
  const setFilmoRoleList = useSetRecoilState(filmoRoleListState);
  const setFilmoInput = useSetRecoilState(filmoInputState);
  const setFilmoRepActive = useSetRecoilState(filmoRepActiveState);
  const setFilmoRepEditList = useSetRecoilState(filmoRepEditListState);
  const setFilmoModal = useSetRecoilState(filmoModalState);
  const setFilmoYoutubeLinkModal = useSetRecoilState(
    filmoYoutubeLinkModalState
  );
  const setFilmoDeleteModal = useSetRecoilState(filmoDeleteModalState);

  useLayoutEffect(() => {
    const getFilmoCategoryList = async () => {
      const res = await getFilmoCategories();
      const data = await res.data;
      setFilmoCategoryList(data);
    };
    const getFilmoRoleList = async () => {
      const res = await getFilmoRoles();
      const data = await res.data;
      setFilmoRoleList(data);
    };
    getFilmoCategoryList();
    getFilmoRoleList();

    // recoil state 초기화
    setFilmoInput(filmoInputInit);
    setFilmoRepActive(false);
    setFilmoRepEditList([]);
    setFilmoModal(filmoModalInit);
    setFilmoYoutubeLinkModal(filmoLinkModalInit);
    setFilmoDeleteModal(filmoDeleteModalInit);
  }, []);
  return <>{children}</>;
};

export default FilmoInintializer;
