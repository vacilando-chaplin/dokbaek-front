"use client";

import {
  deleteFilmography,
  getFilmoCategories,
  getFilmoRoles,
  getProfile,
  postFilmography,
  postFilmographyThumbnail,
  putFilmography
} from "@/app/api/route";
import FilmographyDeleteModal from "@/components/organisms/filmographyDeleteModal";
import FilmographyMain from "@/components/organisms/filmographyMain";
import FilmographyModal from "@/components/organisms/filmographyModal";
import LinkModal from "@/components/organisms/linkModal";
import {
  categoryData,
  defaultId,
  filmoCategory,
  filmoRole,
  toastMessage
} from "@/data/atom";
import {
  filmoDeleteInit,
  filmographyActiveInit,
  filmographyInputInit,
  filmoModalInit,
  videoLinkInit
} from "@/data/data";
import {
  FilmoCategoryType,
  FilmoDeleteType,
  FilmoResponseType,
  FilmoRoleType,
  VideoLinkType
} from "@/types/types";
import { setOnlyNumber } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Filmography = () => {
  const userId = useRecoilValue(defaultId);
  const setToastMessage = useSetRecoilState(toastMessage);

  const [filmoRoleList, setFilmoRoleList] =
    useRecoilState<FilmoRoleType[]>(filmoRole);
  const [filmoCategoryList, setFilmoCategoryList] =
    useRecoilState<FilmoCategoryType[]>(filmoCategory);
  const [categoryList, setCategoryList] = useRecoilState(categoryData);

  const [filmoList, setFilmoList] = useState<FilmoResponseType[]>([]);
  const [filmoInputs, setFilmoInputs] = useState(filmographyInputInit);
  const [filmoActives, setFilmoActives] = useState(filmographyActiveInit);

  // 모달
  const [filmoModal, setFilmoModal] = useState(filmoModalInit);

  // 삭제
  const [filmoDelete, setFilmoDelete] =
    useState<FilmoDeleteType>(filmoDeleteInit);

  // 영상 링크
  const [linkModal, setLinkModal] = useState<VideoLinkType>(videoLinkInit);

  // 대표작
  const [filmoRepEditList, setFilmoRepEditList] = useState<FilmoResponseType[]>(
    []
  );
  const [filmoRepresentActive, setFilmoRepresentActive] = useState(false);
  const [representativeCount, setRepresentativeCount] = useState(0);

  // 필모그래피 분류, 출연 형태 GET
  useEffect(() => {
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

    await postFilmography(userId, filmo);

    const res = await getProfile(userId);
    const data = await res.data;

    setFilmoList(data.filmos);
    setFilmoInputs(filmographyInputInit);
    setFilmoModal({ ...filmoModal, active: false });
    setToastMessage("작품 활동을 추가했어요.");
  };

  // 필모그래피 편집 모달 필모그래피 저장
  const onFilmographyEdit = async () => {
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

    await putFilmography(userId, filmoInputs.id, editFilmo);

    const res = await getProfile(userId);
    const data = await res.data;

    setFilmoList(data.filmos);
    setFilmoInputs(filmographyInputInit);
    setFilmoModal({ ...filmoModal, active: false });
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
        (await putFilmography(userId, filmo.id, {
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
        }))
    );
    const res = await getProfile(userId);
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
  const onFilmoModalOpen = () => {
    setFilmoModal({
      state: "add",
      active: true,
      name: "작품 활동 추가",
      buttonText: "추가"
    });
    setFilmoInputs(filmographyInputInit);
    setFilmoActives(filmographyActiveInit);
  };

  const onFilmoModalClose = () => {
    setFilmoModal(filmoModalInit);
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
  const onLinkModalOpen = (link: string) => {
    setLinkModal({ url: link, active: true });
  };

  // 필모그래피 링크 모달 닫기
  const onLinkModalClose = () => {
    setLinkModal({ ...linkModal, active: false });
  };

  // 썸네일 이미지 업로드
  const onSelectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        const res = await postFilmographyThumbnail(imageUrl);
        const data = await res.data;
        setFilmoInputs({ ...filmoInputs, thumbnail: data });
      });

      reader.readAsDataURL(e.target.files[0]);
      e.currentTarget.value = "";
    }
  };

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
    setFilmoModal({
      state: "edit",
      active: true,
      name: "작품 활동 수정",
      buttonText: "저장"
    });
  };

  // filmographyDeleteModal

  // 필모그래피 삭제 모달 오픈
  const onFilmoDeleteModalOpen = (id: number) => {
    setFilmoDelete({ id: id, active: true });
  };

  // 필모그래피 삭제 모달 닫기
  const onFilmoDeleteModalClose = () => {
    setFilmoDelete({ ...filmoDelete, active: false });
  };

  // 필모그래피 삭제 모달 삭제 버튼 클릭
  const onFilmoDeleteClick = async () => {
    await deleteFilmography(userId, filmoDelete.id);

    const res = await getProfile(userId);
    const data = await res.data;

    setFilmoList(data.filmos);

    setFilmoDelete(filmoDeleteInit);
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
      const res = await getProfile(userId);
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
        onFilmoModalOpen={onFilmoModalOpen}
        onFilmoEditModalOpen={onFilmoEditModalOpen}
        onFilmoDeleteModalOpen={onFilmoDeleteModalOpen}
        onFilmoRepCheck={onFilmoRepCheck}
        onLinkModalOpen={onLinkModalOpen}
      />
      {filmoModal.active && (
        <FilmographyModal
          filmoInputs={filmoInputs}
          filmoActives={filmoActives}
          filmoModal={filmoModal}
          onFilmoModalClose={onFilmoModalClose}
          onFilmoInputChange={onFilmoInputChange}
          onFilmoProductionChange={onFilmoProductionChange}
          onFilmoDropdownActive={onFilmoDropdownActive}
          onFilmoDropdownClick={onFilmoDropdownClick}
          onSelectThumbnail={onSelectThumbnail}
          onFilmographySave={onFilmographySave}
          onFilmographyEdit={onFilmographyEdit}
        />
      )}
      {filmoDelete.active && (
        <FilmographyDeleteModal
          onCancel={onFilmoDeleteModalClose}
          onDelete={onFilmoDeleteClick}
        />
      )}
      {linkModal.active && (
        <LinkModal link={linkModal.url} onLinkModalClose={onLinkModalClose} />
      )}
    </div>
  );
};

export default Filmography;
