"use client";

import {
  convertImageToBase64,
  getFilmoCategories,
  getFilmoRoles,
  getProfile
} from "@/lib/api";
import LinkModal from "@/components/organisms/linkModal";
import {
  categoryData,
  defaultId,
  filmoCategory,
  filmoRole,
  stepperInit,
  toastMessage
} from "@/lib/atoms";
import { imageCompressionOptions, profileResponseInit } from "@/lib/data";
import {
  FilmoCategoryType,
  FilmoResponseType,
  PhotoResponseType
} from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ProfileMain from "./components/profileMain";
import ProfileSub from "./components/profileSub";
import ProfilePhotoModal from "./components/profilePhotoModal";
import ProfileFilmoModal from "./components/profileFilmoModal";
import {
  cropDataInit,
  profilePhotoModalInit,
  selectedPhotoInit,
  videoLinkInit
} from "./data";
import { SpecialtyItemType } from "./create/info/types";
import { useRouter } from "next/navigation";
import {
  deleteProfileDraft,
  deleteProfilePhotoMain,
  patchProfilePhotoMain,
  postProfileDraft,
  postProfilePhotoMain
} from "./api";
import ConfirmModal from "@/components/organisms/confirmModal";
import { photoModalInit } from "./create/photo/data";
import { ProfileModalType, ProfilePhotoModalType } from "./types";
import { convertToBase64, getFileMimeTypeFromUrl } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import ProfileMainPhotoModal from "./components/profileMainPhotoModal";

const Profile = () => {
  const router = useRouter();

  const userId = useRecoilValue(defaultId);
  const [categoryList, setCategoryList] = useRecoilState(categoryData);
  const [filmoCategoryList, setFilmoCategoryList] =
    useRecoilState(filmoCategory);
  const setFilmoRoleList = useSetRecoilState(filmoRole);
  const setStepper = useSetRecoilState(stepperInit);
  const [stepperData, setStepperData] = useState(0);

  // main, sub 구분선
  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [linear, setLinear] = useState("sub");

  const [profileData, setProfileData] = useState<any>(profileResponseInit);
  const [profileSpecialties, setProfileSpecialties] = useState<
    SpecialtyItemType[]
  >([]);
  const [photoLabel, setPhotoLabel] = useState("profilePhoto");
  const [selectedPhoto, setSelectedPhoto] = useState(selectedPhotoInit);
  const [selectedPhotoList, setSelectedPhotoList] = useState<
    PhotoResponseType[]
  >(profileData.photos);
  const [profileModal, setProfileModal] = useState<ProfileModalType>({
    state: "",
    active: false
  });
  const [videoLink, setVideoLink] = useState(videoLinkInit);

  // 대표 사진 데이터
  const [mainPhoto, setMainPhoto] = useState("");
  const [mainPhotoOrigin, setMainPhotoOrigin] = useState("");
  const [mainPhotoModal, setMainPhotoModal] = useState<ProfilePhotoModalType>(
    profilePhotoModalInit
  );
  const [mainPhotoMenuActive, setMainPhotoMenuActive] = useState(false);

  // 대표 사진 크롭 데이터
  const [cropImage, setCropImage] = useState("");
  const [selectImage, setSelectImage] = useState("");
  const [cropData, setCropData] = useState(cropDataInit);

  const setToastMessage = useSetRecoilState(toastMessage);

  const onMoveProfileCreate = (stepper: number) => {
    const path = ["info", "photo", "filmo", "video"];

    setStepper(stepper);
    router.prefetch(`/profile/${userId}/create/${path[stepper]}`);
    router.push(`/profile/${userId}/create/${path[stepper]}`);
  };

  // 프로필 편집

  const onProfileEdit = async () => {
    const isDraft = await postProfileDraft(userId);

    if (isDraft.status === 200) {
      setProfileModal({ state: "profileEdit", active: true });
    }
  };

  const onProfileDraftRejected = async () => {
    await deleteProfileDraft(userId);
    await postProfileDraft(userId);

    onMoveProfileCreate(stepperData);
  };

  const onProfileDraftConfiremd = async () => {
    onMoveProfileCreate(stepperData);
  };

  // ProfileSub

  const onSwitchPhotoLabel = (label: string) => {
    setPhotoLabel(label);
    if (label === "profilePhoto") {
      setSelectedPhotoList(profileData.photos);
    } else if (label === "stillcutPhoto") {
      setSelectedPhotoList(profileData.stillCuts);
    } else if (label === "recentPhoto") {
      setSelectedPhotoList(profileData.recentPhotos);
    }
  };

  const onPhotoModalOpen = async (
    photo: string,
    photoId: string,
    index: number
  ) => {
    const blurPhoto = await convertImageToBase64(photo);

    setSelectedPhoto({
      index: index,
      photoId: photoId,
      origin: photo,
      blur: blurPhoto
    });
    setProfileModal({ state: "photo", active: true });
  };

  const onPhotoModalClose = () => {
    setSelectedPhoto(selectedPhotoInit);
    setProfileModal({ state: "", active: false });
  };

  const onFilmoModalActive = () => {
    setProfileModal({ state: "filmo", active: !profileModal.active });
  };

  const onFilmoLinkModalOpen = (link: string) => {
    setVideoLink({ url: link, active: true });
  };

  const onLinkModalClose = () => {
    setVideoLink(videoLinkInit);
  };

  // mainPhoto

  const onMainPhotoMenuActive = () => {
    setMainPhotoMenuActive(!mainPhotoMenuActive);
  };

  const onMainPhotoSelectFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const originImage = await convertToBase64(file);
      const downSizedFile = await imageCompression(
        file,
        imageCompressionOptions
      );
      const downSizedImage = await convertToBase64(downSizedFile);

      setSelectImage(downSizedImage);
      setCropImage(downSizedImage);
      setMainPhotoOrigin(originImage);
    }
    e.target.value = "";
  };

  const onMainPhotoModalOpen = () => {
    setMainPhotoModal({
      state: "add",
      active: true,
      name: "대표 사진 추가",
      buttonText: "추가"
    });
  };

  const onMainPhotoChangeModalOpen = () => {
    setMainPhotoModal({
      state: "change",
      active: true,
      name: "대표 사진 변경",
      buttonText: "변경"
    });
  };

  const onMainPhotoEditModalOpen = async () => {
    const mimeType = await getFileMimeTypeFromUrl(mainPhotoOrigin);
    const response = await fetch(mainPhotoOrigin);
    const blob = await response.blob();
    const file = new File([blob], "image", { type: mimeType });

    const downSizedFile = await imageCompression(file, imageCompressionOptions);
    const downSizedImage = await convertToBase64(downSizedFile);

    setCropImage(downSizedImage);
    setSelectImage(downSizedImage);
    setMainPhotoMenuActive(false);
    setMainPhotoModal({
      state: "edit",
      active: true,
      name: "대표 사진 편집",
      buttonText: "완료"
    });
  };

  const onMainPhotoDeleteModalActive = () => {
    setProfileModal({
      state: "deleteMainPhoto",
      active: !profileModal.active
    });
  };

  const onMainPhotoModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setCropData(cropDataInit);
    setMainPhotoModal(photoModalInit);
  };

  const onAddMainPhoto = async () => {
    const res = await postProfilePhotoMain(userId, mainPhotoOrigin, cropImage);
    const data = res.data;

    setSelectImage("");
    setCropImage("");
    setCropData(cropDataInit);
    setMainPhoto(data.mainPhotoPreviewPath);
    setMainPhotoOrigin(data.mainPhotoPath);
    setMainPhotoModal(photoModalInit);
    setToastMessage("대표 사진을 추가했어요.");
  };

  const onChangeMainPhoto = async () => {
    await deleteProfilePhotoMain(userId);

    const res = await postProfilePhotoMain(userId, mainPhotoOrigin, cropImage);
    const data = res.data;

    setSelectImage("");
    setCropImage("");
    setCropData(cropDataInit);
    setMainPhoto(data.mainPhotoPreviewPath);
    setMainPhotoOrigin(data.mainPhotoPath);
    setMainPhotoModal(photoModalInit);
    setToastMessage("대표 사진을 변경했어요.");
  };

  const onEditMainPhoto = async () => {
    const res = await patchProfilePhotoMain(userId, cropImage);
    const data = res.data;

    setMainPhoto(data.mainPhotoPreviewPath);
    setMainPhotoOrigin(data.mainPhotoPath);
    setMainPhotoModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setCropData(cropDataInit);
    setToastMessage("대표 사진을 수정했어요.");
  };

  const onDeleteMainPhoto = async () => {
    await deleteProfilePhotoMain(userId);

    setMainPhoto("");
    setMainPhotoOrigin("");
    setProfileModal({ state: "", active: false });
    setToastMessage("대표 사진을 삭제했어요.");
  };

  useEffect(() => {
    if (mainRef.current && subRef.current) {
      const mainHeight = mainRef.current.offsetHeight;
      const subHeight = subRef.current.offsetHeight;

      mainHeight >= subHeight ? setLinear("main") : setLinear("sub");
    }

    const getProfileData = async () => {
      const res = await getProfile(userId);
      const data = res.data;
      setProfileData(data);
      setMainPhoto(data.mainPhotoPreviewPath);
      setMainPhotoOrigin(data.mainPhotoPath);
      setProfileSpecialties(data.specialties);
    };

    const getFilmoCategoryList = async () => {
      const res = await getFilmoCategories();
      const data = res.data;
      setFilmoCategoryList(data);
    };

    const getFilmoRoleList = async () => {
      const res = await getFilmoRoles();
      const data = res.data;
      setFilmoRoleList(data);
    };

    const filteredCategoryList = filmoCategoryList.filter(
      (category: FilmoCategoryType) =>
        profileData.filmos.findIndex(
          (filmo: FilmoResponseType) =>
            filmo.production.category.name === category.name
        ) >= 0
    );
    const resultCategoryList = filteredCategoryList.map(
      (category: FilmoCategoryType) => category.name
    );
    setCategoryList(resultCategoryList);

    getFilmoCategoryList();
    getFilmoRoleList();
    getProfileData();
  }, []);

  return (
    <div className="no-scrollbar mt-12 flex h-full w-full flex-row justify-between overflow-hidden">
      <div ref={mainRef} className="flex-[1_1_30%]">
        <ProfileMain
          linear={linear}
          mainPhoto={mainPhoto}
          info={profileData.info}
          profileSpecialties={profileSpecialties}
          mainPhotoMenuActive={mainPhotoMenuActive}
          setStepperData={setStepperData}
          onProfileEdit={onProfileEdit}
          onMainPhotoSelectFile={onMainPhotoSelectFile}
          onMainPhotoModalOpen={onMainPhotoModalOpen}
          onMainPhotoMenuActive={onMainPhotoMenuActive}
          onMainPhotoChangeModalOpen={onMainPhotoChangeModalOpen}
          onMainPhotoEditModalOpen={onMainPhotoEditModalOpen}
          onMainPhotoDeleteModalOpen={onMainPhotoDeleteModalActive}
          education={
            profileData.education.length >= 1 ? profileData.education[0] : []
          }
        />
      </div>
      <div ref={subRef} className="flex-[1_1_70%]">
        <ProfileSub
          linear={linear}
          photoLabel={photoLabel}
          selectedPhotoList={selectedPhotoList}
          filmographyList={profileData.filmos}
          videoList={profileData.videos}
          setStepperData={setStepperData}
          onMoveToCreate={onProfileEdit}
          onSwitchPhotoLabel={onSwitchPhotoLabel}
          onPhotoModalOpen={onPhotoModalOpen}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoLinkModalOpen={onFilmoLinkModalOpen}
        />
      </div>
      {mainPhotoModal.active && (
        <ProfileMainPhotoModal
          cropData={cropData}
          selectImage={selectImage}
          photoModal={mainPhotoModal}
          onModalClose={onMainPhotoModalClose}
          onAddPhoto={onAddMainPhoto}
          onChangeMainPhoto={onChangeMainPhoto}
          onEditPhoto={onEditMainPhoto}
          setCropData={setCropData}
          setCropImage={setCropImage}
        />
      )}
      {profileModal.state === "deleteMainPhoto" && profileModal.active && (
        <ConfirmModal
          dense
          resizing="fixed"
          titleText="대표 사진을 삭제할까요?"
          cancelText="취소"
          confirmText="삭제"
          cancelButtonType="secondaryOutlined"
          confirmButtonType="negative"
          onCancel={onMainPhotoDeleteModalActive}
          onConfirm={onDeleteMainPhoto}
        />
      )}
      {profileModal.state === "profileEdit" && profileModal.active && (
        <ConfirmModal
          dense={false}
          resizing="fixed"
          titleText="작성 중인 프로필이 있습니다. 불러올까요?"
          cancelText="새로 작성"
          confirmText="불러오기"
          cancelButtonType="secondaryOutlined"
          confirmButtonType="primary"
          onCancel={onProfileDraftRejected}
          onConfirm={onProfileDraftConfiremd}
        />
      )}
      {profileModal.state === "photo" && profileModal.active && (
        <ProfilePhotoModal
          photoLabel={photoLabel}
          selectedPhoto={selectedPhoto}
          selectedPhotoList={selectedPhotoList}
          onPhotoModalClose={onPhotoModalClose}
        />
      )}
      {profileModal.state === "filmo" && profileModal.active && (
        <ProfileFilmoModal
          filmoList={profileData?.filmos}
          categoryList={categoryList}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoLinkModalOpen={onFilmoLinkModalOpen}
        />
      )}
      {videoLink.active && (
        <LinkModal link={videoLink.url} onLinkModalClose={onLinkModalClose} />
      )}
    </div>
  );
};

export default Profile;
