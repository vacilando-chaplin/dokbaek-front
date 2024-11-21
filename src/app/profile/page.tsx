"use client";

import {
  deleteFilmography,
  deletePhoto,
  deleteVideo,
  getSchoolName,
  patchPhotoDefault,
  postFilmography,
  postPhoto,
  postPhotoEdit,
  postVideo,
  putFilmography,
  putInfo,
  putVideo
} from "@/api/api";
import Toast from "@/components/atoms/toast";
import SideMenu from "@/components/molecules/sideMenu";
import BottomBar from "@/components/organisms/bottomBar";
import FilmographyDeleteModal from "@/components/organisms/filmographyDeleteModal";
import FilmographyEditModal from "@/components/organisms/filmographyEditModal";
import FilmographyMain from "@/components/organisms/filmographyMain";
import FilmographyModal from "@/components/organisms/filmographyModal";
import InfoMain from "@/components/organisms/infoMain";
import InfoSub from "@/components/organisms/infoSub";
import InfoThird from "@/components/organisms/infoThird";
import PhotoEditModal from "@/components/organisms/photoEditModal";
import PhotoMain from "@/components/organisms/photoMain";
import PhotoModal from "@/components/organisms/photoModal";
import ProfileLinkModal from "@/components/organisms/profilelinkModal";
import VideoEditModal from "@/components/organisms/videoEditModal";
import VideoMain from "@/components/organisms/videoMain";
import VideoModal from "@/components/organisms/videoModal";
import { defaultId, info, jwt, stepperInit } from "@/data/atom";
import {
  castList,
  classificationList,
  educationEngList,
  educationList,
  filmographyActiveInit,
  filmographyInputInit,
  infoActiveInit
} from "@/data/data";
import { useDebounce } from "@/hooks/hooks";
import { SchoolTypes } from "@/types/types";
import { contactFormat, setOnlyNumber } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const Profile = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const router = useRouter();

  const [stepper, setStepper] = useRecoilState(stepperInit);
  const [toastMessage, setToastMessage] = useState("");

  // 토스트 메세지 보이기 딜레이(3초)
  useEffect(() => {
    const timeout = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Info ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const [infoInputs, setInfoInputs] = useRecoilState(info);
  const [infoActives, setInfoActives] = useState(infoActiveInit);
  const [schoolList, setSchoolList] = useState([]);

  // 내 정보 입력(숫자만 입력 가능한 인풋 제외)
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoInputs({
      ...infoInputs,
      [name]: value
    });
  };

  // 키, 몸무게 입력(숫자만 입력 가능하게)
  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setInfoInputs({ ...infoInputs, [name]: changeNumber });
  };

  // 출생연도 입력(숫자만 입력 가능하게)
  const onBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setInfoInputs({ ...infoInputs, [name]: changeNumber });
    if (value && !infoActives.birth) {
      setInfoActives({ ...infoActives, [name]: true });
    }
  };

  // 전화번호 입력(전화번호 포맷으로 변경)
  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputContact = contactFormat(value);
    setInfoInputs({ ...infoInputs, [name]: inputContact });
  };

  // 학교 검색
  const onSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoInputs({
      ...infoInputs,
      [name]: value
    });
    if (value && !infoActives.school) {
      setInfoActives({ ...infoActives, [name]: true });
    }
  };

  // 드랍다운 수동 액티브
  const onActiveClick = (name: string, state: boolean) => {
    setInfoActives({ ...infoActives, [name]: !state });
  };

  // 드랍다운 아이템 클릭
  const onItemClick = (name: string, item: string) => {
    setInfoInputs({ ...infoInputs, [name]: item });
  };

  // 학교검색 딜레이 적용(0.5초)
  const debounceSearch = useDebounce(infoInputs.school, 500);

  useEffect(() => {
    const getSearchSchool = async (name: string) => {
      const data = await getSchoolName(name);
      const filteredSchoolName = data.map(
        (school: SchoolTypes) => school.schoolName
      );
      setSchoolList(filteredSchoolName);
    };
    getSearchSchool(debounceSearch);
  }, [debounceSearch]);

  // 내 정보 탭에서 다른 탭으로 이동 시 내 정보 업데이트
  const onStepper = async (index: number) => {
    if (!token) {
      return;
    }
    if (stepper === 0 && index !== 0) {
      const educationIndex = educationList.indexOf(infoInputs.education);
      const educationStatus = educationEngList[educationIndex];

      const infoData = {
        status: "PUBLIC",
        info: {
          name: infoInputs.name,
          bornYear: Number(infoInputs.birth),
          height: Number(infoInputs.height),
          weight: Number(infoInputs.weight),
          email: infoInputs.email,
          contact: infoInputs.contact,
          speciality: infoInputs.specialty,
          instagramLink: infoInputs.instagram,
          youtubeLink: infoInputs.youtube,
          introduction: infoInputs.introduction
        },
        education: [
          {
            school: {
              name: infoInputs.school,
              schoolType: "",
              schoolGubun: ""
            },
            major: infoInputs.major,
            status: educationStatus
          }
        ]
      };
      try {
        await putInfo(userId, infoData, token);
      } catch (error) {
        throw error;
      }
    }
    setStepper(index);
  };

  //
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Photo ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //

  const [photoList, setPhotoList] = useState<any>([]);
  const [originPhotoList, setOriginPhotoList] = useState<any>([]);
  const [selectImage, setSelectImage] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [photoModalActive, setPhotoModalActive] = useState(false);
  const [photoEditModalActive, setPhotoEditModalActive] = useState(false);
  const [photoDeleteActive, setPhotoDeleteActive] = useState(false);
  const [photoRepresentativeActive, setPhotoRepresentativeActive] =
    useState(false);
  const [editPhoto, setEditPhoto] = useState<any>();
  const [repPhoto, setRepPhoto] = useState<any>();
  const [editRepPhoto, setEditRepPhoto] = useState<any>();

  // 사진 추가 모달 저장
  const onAddPhoto = async () => {
    try {
      if (cropImage) {
        const res = await postPhoto(userId, selectImage, cropImage, token);
        const data = res.data;

        const originPhoto = [selectImage, data.id];
        setOriginPhotoList([...originPhotoList, originPhoto]);

        if (photoList.length === 0) {
          data.isDefault = true;
          setRepPhoto(data);
        }
        setPhotoList([...photoList, data]);
      } else {
        const res = await postPhoto(userId, selectImage, selectImage, token);
        const data = res.data;

        const originPhoto = [selectImage, data.id];
        setOriginPhotoList([...originPhotoList, originPhoto]);

        if (photoList.length === 0) {
          data.isDefault = true;
          setRepPhoto(data);
        }
        setPhotoList([...photoList, data]);
      }
    } catch (error) {
      throw error;
    }
    setPhotoModalActive(!photoModalActive);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 추가했어요.");
  };

  // 사진 편집 모달 완료
  const onEditPhoto = async () => {
    try {
      const res = await postPhotoEdit(
        userId,
        selectImage,
        cropImage,
        token,
        editPhoto.id
      );
      const data = res.data;
      setPhotoList([...photoList, data]);
    } catch (error) {
      throw error;
    }
    setPhotoEditModalActive(!photoEditModalActive);
    setSelectImage("");
    setCropImage("");
    setEditPhoto("");
    setToastMessage("사진을 수정했어요.");
  };

  // 사진 삭제 모달 삭제 버튼 클릭
  const onDeletePhoto = async (id: string) => {
    try {
      await deletePhoto(userId, id, token);
      setPhotoList((prev: any) => prev.filter((photo: any) => photo.id !== id));
    } catch (error) {
      throw error;
    }
    setPhotoDeleteActive(!photoDeleteActive);
    setToastMessage("사진을 삭제했어요.");
  };

  // 사진 추가 모달 액티브
  const onPhotoModalActive = () => {
    setCropImage("");
    setSelectImage("");
    setPhotoModalActive(!photoModalActive);
  };

  // 사진 삭제 모달 액티브
  const onDeletePhotoActive = () => {
    setPhotoDeleteActive(!photoDeleteActive);
  };

  // 사진 편집 모달 오픈
  const onPhotoEditModalOpen = (photo: any) => {
    const index = originPhotoList.findIndex(
      (origin: any) => origin[1] === photo.id
    );

    setEditPhoto(photo);
    setCropImage(originPhotoList[index][0]);
    setSelectImage(originPhotoList[index][0]);
    setPhotoEditModalActive(!photoEditModalActive);
  };

  // 사진 편집 모달 닫기(취소)
  const onPhotoEditModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setEditPhoto("");
    setPhotoEditModalActive(!photoEditModalActive);
  };

  // 사진 대표작 선택 액티브
  const onPhotoRepresentativeActive = () => {
    setEditRepPhoto(repPhoto);
    setPhotoRepresentativeActive(!photoRepresentativeActive);
  };

  // 사진 대표작 선택 취소
  const onPhotoRepresentativeClose = () => {
    setRepPhoto(editRepPhoto);
    setEditRepPhoto({});
    setPhotoRepresentativeActive(!photoRepresentativeActive);
  };

  // 사진 대표작 체크
  const onPhotoRepCheck = (photo: any) => {
    setRepPhoto((prev: any) => (prev.id === photo.id ? prev : photo));
  };

  // 사진 대표작 설정 완료
  const onPhotoRepSave = async () => {
    try {
      await patchPhotoDefault(userId, repPhoto.id, token);
    } catch (error) {
      throw error;
    }
    setRepPhoto("");
  };

  // 사진 모달에 크롭 할 이미지 선택
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCropImage(reader.result?.toString() || "");
        setSelectImage(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    e.currentTarget.value = "";
  };

  //
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Filmography ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //

  const [filmoList, setFilmoList] = useState<any>([]);

  const [filmoRepresentActive, setFilmoRepresentActive] = useState(false);
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [filmoInputs, setFilmoInputs] = useState(filmographyInputInit);
  const [filmoActives, setFilmoActives] = useState(filmographyActiveInit);
  const [filmoDeleteModal, setFilmoDeleteModal] = useState(false);
  const [filmoEditModal, setFilmoEditModal] = useState(false);
  const [representativeCount, setRepresentativeCount] = useState(0);
  const [filmoLink, setFilmoLink] = useState("");
  const [linkModalActive, setLinkModalActive] = useState(false);
  const [filmoDelete, setFilmoDelete] = useState<any>(0);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [filmoRepEditList, setFilmoRepEditList] = useState([]);

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

      const index = filmoList.findIndex((filmo: any) => filmo.id === data.id);
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
    setFilmoRepEditList((prev: any) =>
      prev.map((item: any) =>
        item.id === id
          ? { ...item, representative: !item.representative }
          : item
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
  const onFilmoEditModalOpen = (filmo: any) => {
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
      setFilmoList((prev: any) =>
        prev.filter((filmo: any) => filmo.id !== filmoDelete)
      );
    } catch (error) {
      throw error;
    }
    setFilmoDelete(0);
    setFilmoDeleteModal(!filmoDeleteModal);
    setToastMessage("작품 활동을 삭제했어요.");
  };

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Video ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const [videoList, setVideoList] = useState<any>([]);
  const [videoEdit, setVideoEdit] = useState<any>({});
  const [videoInputs, setVideoInputs] = useState("");
  const [videoModalActive, setVideoModalActive] = useState(false);
  const [videoEditModalActive, setVideoEditModalActive] = useState(false);
  const [videoDeleteModalActive, setVideoDeleteModalActive] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [videoLinkModalActive, setVideoLinkModalActive] = useState(false);

  // 비디오 링크 입력
  const onVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInputs(e.target.value);
  };

  // 비디오 모달 액티브
  const onVideoModalActive = () => {
    setVideoInputs("");
    setVideoModalActive(!videoModalActive);
  };

  // 비디오 모달 저장 버튼 클릭
  const onVideoModalSave = async () => {
    try {
      const res = await postVideo(userId, videoInputs, token);
      const data = res.data;
      setVideoList([...videoList, data]);
    } catch (error) {
      throw error;
    }

    setVideoModalActive(!videoModalActive);
    setVideoInputs("");
    setToastMessage("영상을 추가했어요.");
  };

  // 비디오 편집 모달 오픈
  const onVideoEditModalOpen = (video: any) => {
    setVideoInputs(video.url);
    setVideoEditModalActive(!videoEditModalActive);
    setVideoEdit(video);
  };

  // 비디오 편집 모달 닫기
  const onVideoEditModalClose = () => {
    setVideoInputs("");
    setVideoEditModalActive(!videoEditModalActive);
    setVideoEdit({});
  };

  // 비디오 편집 모달 편집 완료
  const onVideoEditModalSave = async () => {
    try {
      const data = await putVideo(userId, videoEdit.id, videoInputs, token);

      const index = videoList.findIndex(
        (video: any) => video.id === data.data.id
      );
      const updateList = [...videoList];

      updateList[index].url = data.data.url;
      setVideoList(updateList);
    } catch (error) {
      throw error;
    }
    setVideoInputs("");
    setVideoEditModalActive(!videoEditModalActive);
    setToastMessage("영상을 수정했어요.");
  };

  // 비디오 삭제 모달 오픈
  const onVideoDeleteModalOpen = (video: any) => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setVideoEdit(video);
  };

  // 비디오 삭제 모달 닫기
  const onVideoDeleteModalClose = () => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
  };

  // 비디오 삭제 버튼 클릭
  const onVideoDeleteClick = async () => {
    try {
      await deleteVideo(userId, videoEdit.id, token);
      setVideoList((prev: any) =>
        prev.filter((video: any) => video.id !== videoEdit.id)
      );
    } catch (error) {
      throw error;
    }
    setVideoEdit({});
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setToastMessage("영상을 삭제했어요.");
  };

  // 비디오 링크 모달 닫기
  const onVideoLinkModalActive = () => {
    setVideoLinkModalActive(!videoLinkModalActive);
  };

  // 비디오 링크 모달 오픈
  const onVideoLinkModalOpen = (video: any) => {
    setVideoLink(video.url);
    setVideoLinkModalActive(!videoLinkModalActive);
  };

  // recoil

  const onSaveProfileClick = () => {
    router.push("myProfile");
  };

  const onBackProfileClick = () => {
    router.push("myProfile");
  };

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      {toastMessage && <Toast text={toastMessage} />}
      <SideMenu stepper={stepper} onStepper={onStepper} />
      <div className="flex w-[65vw] flex-col gap-3">
        {stepper === 0 && (
          <>
            <InfoMain
              infoInputs={infoInputs}
              infoActives={infoActives}
              onInputChange={onInputChange}
              onNumberChange={onNumberChange}
              onBirthChange={onBirthChange}
              onContactChange={onContactChange}
              onActiveClick={onActiveClick}
              onItemClick={onItemClick}
            />
            <InfoSub
              infoInputs={infoInputs}
              infoActives={infoActives}
              schoolList={schoolList}
              onInputChange={onInputChange}
              onSchoolChange={onSchoolChange}
              onActiveClick={onActiveClick}
              onItemClick={onItemClick}
            />
            <InfoThird infoInputs={infoInputs} onInputChange={onInputChange} />
          </>
        )}
        {stepper === 1 && (
          <>
            <PhotoMain
              photoList={photoList}
              photoDeleteActive={photoDeleteActive}
              photoRepresentativeActive={photoRepresentativeActive}
              repPhoto={repPhoto}
              onSelectFile={onSelectFile}
              onPhotoModalActive={onPhotoModalActive}
              onPhotoEditModalOpen={onPhotoEditModalOpen}
              onDeletePhoto={onDeletePhoto}
              onDeletePhotoActive={onDeletePhotoActive}
              onPhotoRepresentativeActive={onPhotoRepresentativeActive}
              onPhotoRepSave={onPhotoRepSave}
              onPhotoRepCheck={onPhotoRepCheck}
              onPhotoRepresentativeClose={onPhotoRepresentativeClose}
            />
            {photoModalActive && (
              <PhotoModal
                selectImage={selectImage}
                onModalActive={onPhotoModalActive}
                onAddPhoto={onAddPhoto}
                setCropImage={setCropImage}
              />
            )}
            {photoEditModalActive && (
              <PhotoEditModal
                selectImage={editPhoto.path}
                onModalActive={onPhotoEditModalClose}
                onEditPhoto={onEditPhoto}
                setCropImage={setCropImage}
              />
            )}
          </>
        )}
        {stepper === 2 && (
          <>
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
                onLinkModalActive={onLinkModalActive}
              />
            )}
          </>
        )}
        {stepper === 3 && (
          <>
            <VideoMain
              videoList={videoList}
              videoDeleteModalActive={videoDeleteModalActive}
              onVideoModalActive={onVideoModalActive}
              onVideoEditModalOpen={onVideoEditModalOpen}
              onVideoDeleteModalOpen={onVideoDeleteModalOpen}
              onVideoDeleteModalClose={onVideoDeleteModalClose}
              onVideoDeleteClick={onVideoDeleteClick}
              onVideoLinkModalOpen={onVideoLinkModalOpen}
            />
            {videoModalActive && (
              <VideoModal
                videoInputs={videoInputs}
                onVideoInputChange={onVideoInputChange}
                onVideoModalActive={onVideoModalActive}
                onVideoModalSave={onVideoModalSave}
              />
            )}
            {videoEditModalActive && (
              <VideoEditModal
                videoInputs={videoInputs}
                onVideoInputChange={onVideoInputChange}
                onVideoEditModalClose={onVideoEditModalClose}
                onVideoEditModalSave={onVideoEditModalSave}
              />
            )}
            {videoLinkModalActive && (
              <ProfileLinkModal
                filmoLink={videoLink}
                onLinkModalActive={onVideoLinkModalActive}
              />
            )}
          </>
        )}
      </div>
      <BottomBar
        disabled={
          infoInputs.name.length === 0 ||
          infoInputs.birth.length === 0 ||
          infoInputs.contact.length === 0
        }
        onBack={onBackProfileClick}
        onSave={onSaveProfileClick}
      />
    </div>
  );
};

export default Profile;
