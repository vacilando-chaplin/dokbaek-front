"use client";

import {
  deleteFilmography,
  getFilmoCategories,
  getFilmoRoles,
  getProfile,
  postFilmography,
  postFilmographyThumbnail,
  putFilmography
} from "@/api/api";
import FilmographyDeleteModal from "@/components/organisms/filmographyDeleteModal";
import FilmographyEditModal from "@/components/organisms/filmographyEditModal";
import FilmographyMain from "@/components/organisms/filmographyMain";
import FilmographyModal from "@/components/organisms/filmographyModal";
import ProfileLinkModal from "@/components/organisms/profilelinkModal";
import {
  categoryData,
  defaultId,
  filmoCategory,
  filmoRole,
  jwt,
  toastMessage
} from "@/data/atom";
import { filmographyActiveInit, filmographyInputInit } from "@/data/data";
import {
  FilmoCategoryType,
  FilmoResponseType,
  FilmoRoleType
} from "@/types/types";
import { setOnlyNumber } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Filmography = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const setToastMessage = useSetRecoilState(toastMessage);

  const [filmoRoleList, setFilmoRoleList] =
    useRecoilState<FilmoRoleType[]>(filmoRole);
  const [filmoCategoryList, setFilmoCategoryList] =
    useRecoilState<FilmoCategoryType[]>(filmoCategory);
  const [categoryList, setCategoryList] = useRecoilState(categoryData);

  const [filmoList, setFilmoList] = useState<FilmoResponseType[]>([]);
  const [filmoInputs, setFilmoInputs] = useState(filmographyInputInit);
  const [filmoActives, setFilmoActives] = useState(filmographyActiveInit);
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [filmoEditModalActive, setFilmoEditModalActive] = useState(false);

  // 영상 링크
  const [filmoLink, setFilmoLink] = useState("");
  const [filmoLinkModalActive, setFilmoLinkModalActive] = useState(false);

  // 대표작
  const [filmoRepEditList, setFilmoRepEditList] = useState<FilmoResponseType[]>(
    []
  );
  const [filmoRepresentActive, setFilmoRepresentActive] = useState(false);
  const [representativeCount, setRepresentativeCount] = useState(0);

  // 삭제
  const [filmoDelete, setFilmoDelete] = useState(0);
  const [filmoDeleteModalActive, setFilmoDeleteModalActive] = useState(false);

  // 필모그래피 분류, 출연 형태 GET
  useEffect(() => {
    const getFilmoCategoryList = async () => {
      const res = await getFilmoCategories(token);
      const data = await res.data;
      setFilmoCategoryList(data);
    };
    const getFilmoRoleList = async () => {
      const res = await getFilmoRoles(token);
      const data = await res.data;
      setFilmoRoleList(data);
    };
    getFilmoCategoryList();
    getFilmoRoleList();
  }, []);

  // 필모그래피 모달 필모그래피 추가
  const onFilmographySave = async () => {
    const roleId = filmoRoleList.findIndex(
      (cast: FilmoRoleType) => cast.name === filmoInputs.cast
    );
    const categoryId = filmoCategoryList.findIndex(
      (category: FilmoCategoryType) =>
        category.name === filmoInputs.classification
    );
    const filmo = {
      roleId: filmoInputs.cast ? roleId : 0,
      customRole: filmoInputs.castInput,
      character: filmoInputs.casting,
      is_featured: false,
      production: {
        categoryId: filmoCategoryList[categoryId].id,
        productionYear: Number(filmoInputs.production),
        title: filmoInputs.title,
        description: filmoInputs.description,
        videoUrl: filmoInputs.link,
        thumbnailUrl: filmoInputs.thumbnail
      },
      displayOrder: 0
    };

    await postFilmography(userId, filmo, token);

    const res = await getProfile(userId, token);
    const data = await res.data;

    setFilmoList(data.filmos);
    setFilmoInputs(filmographyInputInit);
    setFilmoModalActive(!filmoModalActive);
    setToastMessage("작품 활동을 추가했어요.");
  };

  // 필모그래피 편집 모달 필모그래피 저장
  const onFilmographyEditSave = async () => {
    const roleId = filmoRoleList.findIndex(
      (cast: FilmoRoleType) => cast.name === filmoInputs.cast
    );
    const categoryId = filmoCategoryList.findIndex(
      (category: FilmoCategoryType) =>
        category.name === filmoInputs.classification
    );

    const editFilmo = {
      roleId: filmoInputs.cast ? roleId : 0,
      customRole: filmoInputs.castInput,
      character: filmoInputs.casting,
      is_featured: filmoInputs.representative,
      production: {
        categoryId: filmoCategoryList[categoryId].id,
        productionYear: Number(filmoInputs.production),
        title: filmoInputs.title,
        description: filmoInputs.description,
        videoUrl: filmoInputs.link,
        thumbnailUrl: filmoInputs.thumbnail
      },
      displayOrder: filmoInputs.displayOrder
    };

    await putFilmography(userId, filmoInputs.id, editFilmo, token);

    const res = await getProfile(userId, token);
    const data = await res.data;

    setFilmoList(data.filmos);
    setFilmoInputs(filmographyInputInit);
    setFilmoEditModalActive(!filmoEditModalActive);
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
    setFilmoList(filmoRepEditList);
    setFilmoRepEditList([]);
    setFilmoRepresentActive(!filmoRepresentActive);
  };

  // 필모그래피 대표작 설정 완료
  const onFilmoRepSave = async () => {
    filmoRepEditList.map(
      async (filmo: FilmoResponseType) =>
        filmo.is_featured === true &&
        (await putFilmography(
          userId,
          filmo.id,
          {
            roleId: filmo.role.id,
            customRole: filmo.customRole,
            character: filmo.character,
            is_featured: true,
            production: {
              categoryId: filmo.production.category.id,
              productionYear: filmo.production.productionYear,
              title: filmo.production.title,
              description: filmo.production.description,
              videoUrl: filmo.production.videoUrl,
              thumbnailUrl: filmo.production.thumbnailUrl
            },
            displayOrder: filmo.displayOrder
          },
          token
        ))
    );
    const res = await getProfile(userId, token);
    const data = await res.data;

    setFilmoList(data.filmos);
    setFilmoRepEditList([]);
    setFilmoRepresentActive(!filmoRepresentActive);
  };

  // 필모그래피 대표작 설정 체크
  const onFilmoRepCheck = (id: number) => {
    const checkFilmoRep = filmoRepEditList.map((item: FilmoResponseType) =>
      item.id === id ? { ...item, is_featured: !item.is_featured } : item
    );
    setFilmoRepEditList(checkFilmoRep);
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
    } else if (value.length === 4) {
      setFilmoActives({ ...filmoActives, [name]: false });
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
    setFilmoLinkModalActive(!filmoLinkModalActive);
  };

  // 필모그래피 링크 모달 닫기
  const onLinkModalActive = () => {
    setFilmoLinkModalActive(!filmoLinkModalActive);
  };

  // 썸네일 이미지 업로드
  const onSelectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        const res = await postFilmographyThumbnail(imageUrl, token);
        const data = await res.data;
        setFilmoInputs({ ...filmoInputs, thumbnail: data });
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
    setFilmoEditModalActive(!filmoEditModalActive);
  };

  // 필모그래피 편집 모달 닫기
  const onFilmoEditModalClose = () => {
    setFilmoEditModalActive(!filmoEditModalActive);
    setFilmoInputs(filmographyInputInit);
    setFilmoActives(filmographyActiveInit);
  };

  // filmographyDeleteModal

  // 필모그래피 삭제 모달 오픈
  const onFilmoDeleteModalOpen = (id: number) => {
    setFilmoDelete(id);
    setFilmoDeleteModalActive(!filmoDeleteModalActive);
  };

  // 필모그래피 삭제 모달 닫기
  const onFilmoDeleteModalClose = () => {
    setFilmoDeleteModalActive(!filmoDeleteModalActive);
  };

  // 필모그래피 삭제 모달 삭제 버튼 클릭
  const onFilmoDeleteClick = async () => {
    await deleteFilmography(userId, filmoDelete, token);

    const res = await getProfile(userId, token);
    const data = await res.data;

    setFilmoList(data.filmos);

    setFilmoDelete(0);
    setFilmoDeleteModalActive(!filmoDeleteModalActive);
    setToastMessage("작품 활동을 삭제했어요.");
  };

  useEffect(() => {
    const filmoCount = filmoList.filter(
      (filmo: FilmoResponseType) => filmo.is_featured === true
    );
    const filmoRepEditCount = filmoRepEditList.filter(
      (filmo: FilmoResponseType) => filmo.is_featured === true
    );
    const combineCount = filmoCount.length + filmoRepEditCount.length;
    setRepresentativeCount(combineCount);
  }, [filmoRepEditList]);

  // 필모그래피 카테고리 리스트 업데이트
  useEffect(() => {
    const filteredCategoryList = filmoCategoryList.filter(
      (category: FilmoCategoryType) =>
        filmoList.findIndex(
          (filmo: FilmoResponseType) =>
            filmo.production.category.name === category.name
        ) >= 0
    );
    const resultCategoryList = filteredCategoryList.map(
      (category: FilmoCategoryType) => category.name
    );
    setCategoryList(resultCategoryList);
  }, [filmoList]);

  // 필모그래피 리스트 업데이트
  useEffect(() => {
    const getProfileData = async () => {
      const res = await getProfile(userId, token);
      const data = await res.data;
      setFilmoList(data.filmos);
    };
    getProfileData();
  }, []);

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <FilmographyMain
        filmoList={filmoList}
        filmoRepEditList={filmoRepEditList}
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
      {filmoEditModalActive && (
        <FilmographyEditModal
          filmoInputs={filmoInputs}
          filmoActives={filmoActives}
          onFilmoEditModalClose={onFilmoEditModalClose}
          onFilmoInputChange={onFilmoInputChange}
          onFilmoProductionChange={onFilmoProductionChange}
          onFilmoDropdownActive={onFilmoDropdownActive}
          onFilmoDropdownClick={onFilmoDropdownClick}
          onSelectThumbnail={onSelectThumbnail}
          onFilmographyEditSave={onFilmographyEditSave}
        />
      )}
      {filmoDeleteModalActive && (
        <FilmographyDeleteModal
          onCancel={onFilmoDeleteModalClose}
          onDelete={onFilmoDeleteClick}
        />
      )}
      {filmoLinkModalActive && (
        <ProfileLinkModal
          filmoLink={filmoLink}
          onFilmoLinkModalClose={onLinkModalActive}
        />
      )}
    </div>
  );
};

export default Filmography;
