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
import { profileInit } from "@/lib/data";
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
import { profileModalInit, selectedPhotoInit, videoLinkInit } from "./data";
import { PhotoModalType } from "./create/photo/types";
import { photoModalInit } from "./create/photo/data";
import PhotoModal from "./create/photo/components/photoModal";
import { postProfilePhotoMain } from "./create/info/api";
import { SpecialtyItemType } from "./create/info/types";
import { useRouter } from "next/navigation";
import { deleteProfileDraft, getProfileDraft, postProfileDraft } from "./api";
import ConfirmModal from "@/components/organisms/confirmModal";

const Profile = () => {
  const router = useRouter();

  const userId = useRecoilValue(defaultId);
  const [categoryList, setCategoryList] = useRecoilState(categoryData);
  const [filmoCategoryList, setFilmoCategoryList] =
    useRecoilState(filmoCategory);
  const setFilmoRoleList = useSetRecoilState(filmoRole);
  const setStepper = useSetRecoilState(stepperInit);

  // main, sub 구분선
  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [linear, setLinear] = useState("sub");

  const [draftData, setDraftData] = useState({});

  const [profileData, setProfileData] = useState<any>(profileInit);
  const [profileSpecialties, setProfileSpecialties] = useState<
    SpecialtyItemType[]
  >([]);
  const [mainPhoto, setMainPhoto] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(selectedPhotoInit);
  const [profileModal, setProfileModal] = useState(profileModalInit);
  const [videoLink, setVideoLink] = useState(videoLinkInit);

  const [cropImage, setCropImage] = useState("");
  const [photoModal, setPhotoModal] = useState<PhotoModalType>(photoModalInit);
  const [selectImage, setSelectImage] = useState("");
  const setToastMessage = useSetRecoilState(toastMessage);

  const onMoveProfileCreate = () => {
    setStepper(0);
    router.prefetch(`/profile/${userId}/create/info`);
    router.push(`/profile/${userId}/create/info`);
  };

  // 프로필 편집
  const onProfileEdit = async () => {
    const isDraft = await postProfileDraft(userId);

    if (isDraft.status === 200) {
      setDraftData(isDraft.data);
      setProfileModal({ state: "profileEdit", active: true });
    } else if (isDraft.status === 201) {
      const res = await postProfileDraft(userId);
      const data = res.data;
      setDraftData(data);
      onMoveProfileCreate();
    }
  };

  const onProfileDraftModalClose = () => {
    setProfileModal({ state: "profileEdit", active: false });
  };

  const onProfileDraftRejected = async () => {
    await deleteProfileDraft(userId);

    const res = await postProfileDraft(userId);
    const data = res.data;

    setDraftData(data);
    onMoveProfileCreate();
  };

  const onProfileDraftConfiremd = async () => {
    onMoveProfileCreate();
  };

  const onPhotoModalOpen = async (photo: string) => {
    const blurPhoto = await convertImageToBase64(photo);

    setSelectedPhoto({ origin: photo, blur: blurPhoto });
    setProfileModal({ state: "photo", active: true });
  };

  const onPhotoModalClose = () => {
    setProfileModal(profileModalInit);
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

  const onMainPhotoSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropImage(reader.result?.toString() || "");
        setSelectImage(reader.result?.toString() || "");
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    e.currentTarget.value = "";
  };

  const onMainPhotoModalOpen = () => {
    setPhotoModal({
      ...photoModal,
      state: "add",
      active: true,
      name: "대표 사진 추가",
      buttonText: "추가"
    });
  };

  const onAddMainPhoto = async () => {
    try {
      const res = await postProfilePhotoMain(userId, selectImage, selectImage);
      const data = res.data;

      setMainPhoto(data.mainPhotoPreviewPath);
      setPhotoModal(photoModalInit);
      setToastMessage("사진을 추가했어요.");
    } catch (error) {
      console.log("error", error);
    }
  };
  const onEditMainPhoto = async () => {};
  const onDeleteMainPhoto = async () => {};

  useEffect(() => {
    if (mainRef.current && subRef.current) {
      const mainHeight = mainRef.current.offsetHeight;
      const subHeight = subRef.current.offsetHeight;

      mainHeight >= subHeight ? setLinear("main") : setLinear("sub");
    }

    const getProfileData = async () => {
      const res = await getProfile(userId);
      const data = await res.data;
      setProfileData(data);
      setProfileSpecialties(data.specialties);
    };

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
    getProfileData();
  }, []);

  useEffect(() => {
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
    setMainPhoto(profileData.mainPhotoPath);
    setCategoryList(resultCategoryList);
  }, [profileData]);

  return (
    <div className="no-scrollbar mt-12 flex h-full w-full flex-row justify-between overflow-hidden">
      <div ref={mainRef} className="flex-[1_1_30%]">
        <ProfileMain
          linear={linear}
          userId={userId}
          mainPhoto={mainPhoto}
          info={profileData.info}
          profileSpecialties={profileSpecialties}
          onProfileEdit={onProfileEdit}
          onMainPhotoSelectFile={onMainPhotoSelectFile}
          onMainPhotoModalOpen={onMainPhotoModalOpen}
          onDeleteMainPhoto={onDeleteMainPhoto}
          education={
            profileData.education.length >= 1 ? profileData.education[0] : []
          }
          setStepper={setStepper}
        />
      </div>
      <div ref={subRef} className="flex-[1_1_70%]">
        <ProfileSub
          linear={linear}
          userId={userId}
          photoList={profileData.photos}
          filmographyList={profileData.filmos}
          videoList={profileData.videos}
          setStepper={setStepper}
          onPhotoModalOpen={onPhotoModalOpen}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoLinkModalOpen={onFilmoLinkModalOpen}
        />
      </div>
      {/* {photoModal.active && (
        <PhotoModal
          selectImage={selectImage}
          photoModal={photoModal}
          onModalActive={onPhotoModalClose}
          onAddPhoto={onAddMainPhoto}
          onEditPhoto={onEditMainPhoto}
          setCropImage={setCropImage}
        />
      )} */}
      {profileModal.state === "profileEdit" && profileModal.active && (
        <ConfirmModal
          dense
          resizing="fixed"
          titleText="작성하던 프로필이 있습니다."
          bodyText="프로필 작성을 계속하시겠어요?(취소 시 임시저장된 데이터는 사라집니다.)"
          cancelText="취소"
          confirmText="확인"
          cancelButtonType="negative"
          confirmButtonType="primary"
          onCancel={onProfileDraftRejected}
          onConfirm={onProfileDraftConfiremd}
        />
      )}
      {profileModal.state === "photo" && profileModal.active && (
        <ProfilePhotoModal
          selectedPhoto={selectedPhoto}
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
