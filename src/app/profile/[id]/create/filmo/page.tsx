"use client";

import { deleteFilmography, postFilmography, putFilmography } from "@/api/api";
import FilmographyDeleteModal from "@/components/organisms/filmographyDeleteModal";
import FilmographyEditModal from "@/components/organisms/filmographyEditModal";
import FilmographyMain from "@/components/organisms/filmographyMain";
import FilmographyModal from "@/components/organisms/filmographyModal";
import ProfileLinkModal from "@/components/organisms/profilelinkModal";
import { categoryData, defaultId, jwt, toastMessage } from "@/data/atom";
import {
  castList,
  classificationList,
  filmographyActiveInit,
  filmographyInputInit
} from "@/data/data";
import { FilmoResponseType } from "@/types/types";
import { setOnlyNumber } from "@/utils/utils";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Filmography = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const setToastMessage = useSetRecoilState(toastMessage);

  const [filmoList, setFilmoList] = useState<FilmoResponseType[]>([]);
  const [categoryList, setCategoryList] = useRecoilState(categoryData);

  const [filmoRepresentActive, setFilmoRepresentActive] = useState(false);
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [filmoInputs, setFilmoInputs] = useState(filmographyInputInit);
  const [filmoActives, setFilmoActives] = useState(filmographyActiveInit);
  const [filmoDeleteModal, setFilmoDeleteModal] = useState(false);
  const [filmoEditModal, setFilmoEditModal] = useState(false);
  const [representativeCount, setRepresentativeCount] = useState(0);
  const [filmoLink, setFilmoLink] = useState("");
  const [linkModalActive, setLinkModalActive] = useState(false);
  const [filmoDelete, setFilmoDelete] = useState(0);
  const [filmoRepEditList, setFilmoRepEditList] = useState<FilmoResponseType[]>(
    []
  );

  // 카테고리 리스트 카테고리 추가
  const onCategoryListUpdate = (category: string) => {
    const findCategory = categoryList.findIndex(
      (item: string) => item === category
    );
    if (findCategory === -1) {
      setCategoryList([...categoryList, category]);
    }
  };

  // 필모그래피 모달 필모그래피 추가
  const onFilmographySave = async () => {
    try {
      const roleId = castList.findIndex(
        (cast: string) => cast === filmoInputs.cast
      );
      const categoryId = classificationList.findIndex(
        (category: string) => category === filmoInputs.classification
      );

      const filmo = {
        roleId: filmoInputs.cast ? roleId + 1 : 0,
        customRole: filmoInputs.castInput,
        character: filmoInputs.casting,
        is_featured: false,
        production: {
          categoryId: categoryId + 1,
          productionYear: Number(filmoInputs.production),
          title: filmoInputs.title,
          description: filmoInputs.description,
          videoUrl: filmoInputs.link,
          thumbnailUrl: filmoInputs.thumbnail
        },
        displayOrder: 0
      };
      const res = await postFilmography(userId, filmo, token);
      const data = res.data;
      onCategoryListUpdate(data.production.category.name);
      setFilmoList([data, ...filmoList]);
    } catch (error) {
      throw error;
    }
    setFilmoInputs(filmographyInputInit);
    setFilmoModalActive(!filmoModalActive);
    setToastMessage("작품 활동을 추가했어요.");
  };

  // 필모그래피 편집 모달 필모그래피 저장
  const onFilmographyEditSave = async () => {
    const roleId = castList.findIndex(
      (cast: string) => cast === filmoInputs.cast
    );
    const categoryId = classificationList.findIndex(
      (category: string) => category === filmoInputs.classification
    );

    const editFilmo = {
      roleId: filmoInputs.cast ? roleId + 1 : 0,
      customRole: filmoInputs.castInput,
      character: filmoInputs.casting,
      is_featured: filmoInputs.representative,
      production: {
        categoryId: categoryId + 1,
        productionYear: Number(filmoInputs.production),
        title: filmoInputs.title,
        description: filmoInputs.description,
        videoUrl: filmoInputs.link,
        thumbnailUrl: filmoInputs.thumbnail
      },
      displayOrder: filmoInputs.displayOrder
    };

    try {
      const res = await putFilmography(
        userId,
        filmoInputs.id,
        editFilmo,
        token
      );
      const data = res.data;

      const index = filmoList.findIndex(
        (filmo: FilmoResponseType) => filmo.id === data.id
      );
      const updateList = [...filmoList];

      updateList[index] = data;
      setFilmoList(updateList);
      onCategoryListUpdate(data.production.category.name);
    } catch (error) {
      throw error;
    }
    setFilmoInputs(filmographyInputInit);
    setFilmoEditModal(!filmoEditModal);
    setToastMessage("작품 활동을 수정했어요.");
  };

  // filmographyMain

  // 필모그래피 대표작 설정 액티브
  const onFilmoRepActive = () => {
    setFilmoRepEditList(filmoList);
    setFilmoRepresentActive(!filmoRepresentActive);
  };

  // 필모그래피 대표작 설정 취소
  const onFilmoRepCancel = () => {
    setFilmoRepEditList([]);
    setFilmoRepresentActive(!filmoRepresentActive);
  };

  // 필모그래피 대표작 설정 완료
  const onFilmoRepSave = () => {
    setFilmoList(filmoRepEditList);
    setFilmoRepresentActive(!filmoRepresentActive);
  };

  // 필모그래피 대표작 설정 체크
  const onFilmoRepCheck = (id: number) => {
    setFilmoRepEditList((prev: FilmoResponseType[]) =>
      prev.map((item: FilmoResponseType) =>
        item.id === id ? { ...item, is_featured: !item.is_featured } : item
      )
    );
  };

  // 필모그래피 모달 액티브
  const onFilmoModalActive = () => {
    setFilmoModalActive(!filmoModalActive);
    setFilmoInputs(filmographyInputInit);
    setFilmoActives(filmographyActiveInit);
  };

  // filmographyModal

  // 필모그래피 모달 입력
  const onFilmoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilmoInputs({
      ...filmoInputs,
      [name]: value
    });
  };

  // 필모그래피 모달 제작연도 입력
  const onFilmoProductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setFilmoInputs({ ...filmoInputs, [name]: changeNumber });
    if (value && !filmoActives.production) {
      setFilmoActives({ ...filmoActives, [name]: true });
    }
  };

  // 필모그래피 드랍다운 액티브
  const onFilmoDropdownActive = (name: string, state: boolean) => {
    setFilmoActives({ ...filmoActives, [name]: !state });
  };

  // 필모그래피 드랍다운 클릭
  const onFilmoDropdownClick = (name: string, item: string) => {
    setFilmoInputs({ ...filmoInputs, [name]: item });
  };

  // 필모그래피 링크 모달 오픈
  const onFilmoLink = (link: string) => {
    setFilmoLink(link);
    setLinkModalActive(!linkModalActive);
  };

  // 필모그래피 링크 모달 닫기
  const onLinkModalActive = () => {
    setLinkModalActive(!linkModalActive);
  };

  // 썸네일 이미지 업로드
  const onSelectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        setFilmoInputs({ ...filmoInputs, thumbnail: imageUrl });
      });

      reader.readAsDataURL(e.target.files[0]);
      e.currentTarget.value = "";
    }
  };

  // filmographyEditModal

  // 필모그래피 편집 모달 오픈
  const onFilmoEditModalOpen = (filmo: FilmoResponseType) => {
    const filmoProduction =
      filmo.production.productionYear === 0
        ? ""
        : filmo.production.productionYear.toString();

    setFilmoInputs({
      ...filmoInputs,
      classification: filmo.production.category.name,
      production: filmoProduction,
      title: filmo.production.title,
      cast: filmo.role.name,
      castInput: filmo.customRole,
      casting: filmo.character,
      description: filmo.production.description,
      link: filmo.production.videoUrl,
      thumbnail: filmo.production.thumbnailUrl,
      representative: filmo.is_featured,
      id: filmo.id,
      displayOrder: filmo.displayOrder
    });
    setFilmoEditModal(!filmoEditModal);
  };

  // 필모그래피 편집 모달 닫기
  const onFilmoEditModalActive = () => {
    setFilmoEditModal(!filmoEditModal);
    setFilmoInputs(filmographyInputInit);
    setFilmoActives(filmographyActiveInit);
  };

  // filmographyDeleteModal

  // 필모그래피 삭제 모달 오픈
  const onFilmoDeleteModalOpen = (id: number) => {
    setFilmoDelete(id);
    setFilmoDeleteModal(!filmoDeleteModal);
  };

  // 필모그래피 삭제 모달 닫기
  const onFilmoDeleteModalClose = () => {
    setFilmoDeleteModal(!filmoDeleteModal);
  };

  // 필모그래피 삭제 모달 삭제 버튼 클릭
  const onFilmoDeleteClick = async () => {
    try {
      await deleteFilmography(userId, filmoDelete, token);
      setFilmoList((prev: FilmoResponseType[]) =>
        prev.filter((filmo: FilmoResponseType) => filmo.id !== filmoDelete)
      );
    } catch (error) {
      throw error;
    }
    setFilmoDelete(0);
    setFilmoDeleteModal(!filmoDeleteModal);
    setToastMessage("작품 활동을 삭제했어요.");
  };

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <FilmographyMain
        filmoList={filmoList}
        categoryList={categoryList}
        filmoRepresentActive={filmoRepresentActive}
        representativeCount={representativeCount}
        onFilmoRepActive={onFilmoRepActive}
        onFilmoRepCancel={onFilmoRepCancel}
        onFilmoRepSave={onFilmoRepSave}
        onFilmoModalActive={onFilmoModalActive}
        onFilmoEditModalOpen={onFilmoEditModalOpen}
        onFilmoDeleteModalOpen={onFilmoDeleteModalOpen}
        onFilmoRepCheck={onFilmoRepCheck}
        onFilmoLink={onFilmoLink}
      />
      {filmoModalActive && (
        <FilmographyModal
          filmoInputs={filmoInputs}
          filmoActives={filmoActives}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoInputChange={onFilmoInputChange}
          onFilmoProductionChange={onFilmoProductionChange}
          onFilmoDropdownActive={onFilmoDropdownActive}
          onFilmoDropdownClick={onFilmoDropdownClick}
          onSelectThumbnail={onSelectThumbnail}
          onFilmographySave={onFilmographySave}
        />
      )}
      {filmoEditModal && (
        <FilmographyEditModal
          filmoInputs={filmoInputs}
          filmoActives={filmoActives}
          onFilmoEditModalActive={onFilmoEditModalActive}
          onFilmoInputChange={onFilmoInputChange}
          onFilmoProductionChange={onFilmoProductionChange}
          onFilmoDropdownActive={onFilmoDropdownActive}
          onFilmoDropdownClick={onFilmoDropdownClick}
          onSelectThumbnail={onSelectThumbnail}
          onFilmographyEditSave={onFilmographyEditSave}
        />
      )}
      {filmoDeleteModal && (
        <FilmographyDeleteModal
          onCancel={onFilmoDeleteModalClose}
          onDelete={onFilmoDeleteClick}
        />
      )}
      {linkModalActive && (
        <ProfileLinkModal
          filmoLink={filmoLink}
          onFilmoLinkModalClose={onLinkModalActive}
        />
      )}
    </div>
  );
};

export default Filmography;
