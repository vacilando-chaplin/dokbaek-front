"use client";

import { getProfile, getProfileOtherUser } from "@/lib/api";
import LinkModal from "@/components/organisms/linkModal";
import {
  categoryData,
  filmoCategory,
  stepperInit,
  toastMessage
} from "@/lib/atoms";
import { imageCompressionOptions } from "@/lib/data";
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
  deleteProfilePhotoMain,
  patchProfilePhotoMain,
  postProfilePhotoMain
} from "./api";
import ConfirmModal from "@/components/organisms/confirmModal";
import { photoModalInit } from "./create/photo/data";
import {
  PhotoLabelType,
  ProfileModalType,
  ProfilePhotoModalType
} from "./types";
import { convertToBase64, getFileMimeTypeFromUrl } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import ProfileMainPhotoModal from "./components/profileMainPhotoModal";
import { useGetBlurPhoto } from "@/lib/hooks";
import Cookies from "js-cookie";
import {
  profileDraftData,
  viewedProfileId
} from "@/lib/recoil/profile/common/atom";

const Profile = () => {
  const router = useRouter();

  const loginProfileId = Number(Cookies.get("loginProfileId"));
  const viewProfileId = useRecoilValue(viewedProfileId);

  const [categoryList, setCategoryList] = useRecoilState(categoryData);
  const filmoCategoryList = useRecoilValue(filmoCategory);
  const setStepper = useSetRecoilState(stepperInit);

  // main, sub 구분선
  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [linear, setLinear] = useState("sub");

  const [profileData, setProfileData] = useState<any>(profileDraftData);
  const [otherUser, setOtherUser] = useState(false);

  const [profileSpecialties, setProfileSpecialties] = useState<
    SpecialtyItemType[]
  >([]);

  // profileSub 사진
  const [photoLabel, setPhotoLabel] = useState<PhotoLabelType>("profilePhoto");
  const [selectedPhoto, setSelectedPhoto] = useState(selectedPhotoInit);
  const [selectedPhotoList, setSelectedPhotoList] = useState<
    PhotoResponseType[]
  >([]);
  const [blurPhotoList, setBlurPhotoList] = useState<string[]>([]);

  // profileSub 모달
  const [profileModal, setProfileModal] = useState<ProfileModalType>({
    state: "",
    active: false
  });

  // video 모달
  const [videoLink, setVideoLink] = useState(videoLinkInit);

  // 대표 사진 데이터
  const [mainPhoto, setMainPhoto] = useState("");
  const [mainPhotoOrigin, setMainPhotoOrigin] = useState("");
  const [mainPhotoTemp, setMainPhotoTemp] = useState("");
  const [mainPhotoModal, setMainPhotoModal] = useState<ProfilePhotoModalType>(
    profilePhotoModalInit
  );
  const [mainPhotoMenuActive, setMainPhotoMenuActive] = useState(false);

  // 대표 사진 크롭 데이터
  const [cropImage, setCropImage] = useState("");
  const [selectImage, setSelectImage] = useState("");
  const [cropData, setCropData] = useState(cropDataInit);

  const setToastMessage = useSetRecoilState(toastMessage);

  // 프로필 편집으로 이동

  const onMoveToCreate = async (stepper: number) => {
    const path = ["info", "photo", "filmo", "video"];

    setStepper(stepper);
    router.prefetch(`/profile/${loginProfileId}/create/${path[stepper]}`);
    router.push(`/profile/${loginProfileId}/create/${path[stepper]}`);
  };

  // ProfileSub

  const onSwitchPhotoLabel = async (label: PhotoLabelType) => {
    setPhotoLabel(label);

    if (label === "profilePhoto") {
      if (profileData.photos.length >= 1) {
        const photoList = await useGetBlurPhoto(profileData.photos);
        setBlurPhotoList(photoList);
      }
      setSelectedPhotoList(profileData.photos);
    } else if (label === "stillcutPhoto") {
      if (profileData.stillCuts.length >= 1) {
        const stillCutList = await useGetBlurPhoto(profileData.stillCuts);
        setBlurPhotoList(stillCutList);
      }
      setSelectedPhotoList(profileData.stillCuts);
    } else if (label === "recentPhoto") {
      if (profileData.recentPhotos.length >= 1) {
        const recentList = await useGetBlurPhoto(profileData.recentPhotos);
        setBlurPhotoList(recentList);
      }
      setSelectedPhotoList(profileData.recentPhotos);
    }
  };

  const onPhotoModalOpen = async (
    photo: string,
    photoId: string,
    index: number
  ) => {
    setSelectedPhoto({
      index: index,
      photoId: photoId,
      origin: photo
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
      setMainPhotoTemp(originImage);
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
    const res = await postProfilePhotoMain(
      loginProfileId,
      mainPhotoTemp,
      cropImage
    );
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
    await deleteProfilePhotoMain(loginProfileId);

    const res = await postProfilePhotoMain(
      loginProfileId,
      mainPhotoTemp,
      cropImage
    );
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
    const res = await patchProfilePhotoMain(loginProfileId, cropImage);
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
    await deleteProfilePhotoMain(loginProfileId);

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
  }, []);

  useEffect(() => {
    const getProfileData = async () => {
      if (loginProfileId !== viewProfileId) {
        setOtherUser(true);
        const res = await getProfileOtherUser(Number(viewProfileId));
        const data = res.data;

        if (data.photos.length >= 1) {
          const photoList = await useGetBlurPhoto(data.photos);
          setBlurPhotoList(photoList);
        }

        setProfileData(data);
        setMainPhoto(data.mainPhotoPreviewPath);
        setMainPhotoOrigin(data.mainPhotoPath);
        setSelectedPhotoList(data.photos);
        setProfileSpecialties(data.specialties);
      } else {
        setOtherUser(false);
        const res = await getProfile(loginProfileId);
        const data = res.data;

        if (data.photos.length >= 1) {
          const photoList = await useGetBlurPhoto(data.photos);
          setBlurPhotoList(photoList);
        }

        setProfileData(data);
        setMainPhoto(data.mainPhotoPreviewPath);
        setMainPhotoOrigin(data.mainPhotoPath);
        setSelectedPhotoList(data.photos);
        setProfileSpecialties(data.specialties);
      }
    };
    getProfileData();
  }, [viewProfileId]);

  useEffect(() => {
    const filteredCategoryList = filmoCategoryList.filter(
      (category: FilmoCategoryType) =>
        profileData.filmos &&
        profileData.filmos.findIndex(
          (filmo: FilmoResponseType) =>
            filmo.production.category.name === category.name
        ) >= 0
    );
    const resultCategoryList = filteredCategoryList.map(
      (category: FilmoCategoryType) => category.name
    );
    setCategoryList(resultCategoryList);
  }, [profileData]);

  return (
    <div className="no-scrollbar mt-12 flex h-full w-full flex-row justify-between overflow-hidden bg-background-surface-light dark:bg-background-surface-dark">
      <div ref={mainRef} className="min-w-[500px] flex-[1_1_30%]">
        <ProfileMain
          linear={linear}
          profileId={viewProfileId}
          otherUser={otherUser}
          mainPhoto={mainPhoto}
          updated={profileData.updatedAt}
          profileSpecialties={profileSpecialties}
          mainPhotoMenuActive={mainPhotoMenuActive}
          onMoveToCreate={onMoveToCreate}
          onMainPhotoSelectFile={onMainPhotoSelectFile}
          onMainPhotoModalOpen={onMainPhotoModalOpen}
          onMainPhotoMenuActive={onMainPhotoMenuActive}
          onMainPhotoChangeModalOpen={onMainPhotoChangeModalOpen}
          onMainPhotoEditModalOpen={onMainPhotoEditModalOpen}
          onMainPhotoDeleteModalOpen={onMainPhotoDeleteModalActive}
          education={profileData.education}
        />
      </div>
      <div ref={subRef} className="flex-[1_1_70%]">
        <ProfileSub
          linear={linear}
          otherUser={otherUser}
          photoLabel={photoLabel}
          selectedPhotoList={selectedPhotoList}
          filmographyList={profileData.filmos}
          videoList={profileData.videos}
          onMoveToCreate={onMoveToCreate}
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
      {profileModal.state === "photo" && profileModal.active && (
        <ProfilePhotoModal
          photoLabel={photoLabel}
          blurPhotoList={blurPhotoList}
          selectedPhoto={selectedPhoto}
          selectedPhotoList={selectedPhotoList}
          onPhotoModalClose={onPhotoModalClose}
        />
      )}
      {profileModal.state === "filmo" && profileModal.active && (
        <ProfileFilmoModal
          filmoList={profileData.filmos}
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
