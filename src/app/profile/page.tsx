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
import {
  defaultId,
  filmography,
  info,
  jwt,
  profile,
  stepperInit
} from "@/data/atom";
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
import { filmoInputsTypes, SchoolTypes } from "@/types/types";
import { contactFormat, setOnlyNumber } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Profile = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const [stepper, setStepper] = useRecoilState(stepperInit);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Info ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const [infoInputs, setInfoInputs] = useRecoilState(info);
  const [infoActives, setInfoActives] = useState(infoActiveInit);
  const [schoolList, setSchoolList] = useState([]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfoInputs({
      ...infoInputs,
      [name]: value
    });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setInfoInputs({ ...infoInputs, [name]: changeNumber });
  };

  const onBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setInfoInputs({ ...infoInputs, [name]: changeNumber });
    if (value && !infoActives.birth) {
      setInfoActives({ ...infoActives, [name]: true });
    }
  };

  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputContact = contactFormat(value);
    setInfoInputs({ ...infoInputs, [name]: inputContact });
  };

  // 학교검색 Input (onChange)
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

  const onActiveClick = (name: string, state: boolean) => {
    setInfoActives({ ...infoActives, [name]: !state });
  };

  // dropdownClick
  const onItemClick = (name: string, item: string) => {
    setInfoInputs({ ...infoInputs, [name]: item });
  };

  // 학교검색 debounce(delay) 적용
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

  // 내 정보 탭에서 다른 탭으로 이동 시 infoData PUT 요청
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

  // photoModal 저장
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

  // photoModal 편집
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

  // photoModal 액티브
  const onPhotoModalActive = () => {
    setCropImage("");
    setSelectImage("");
    setPhotoModalActive(!photoModalActive);
  };

  // photoDelete
  const onDeletePhotoActive = () => {
    setPhotoDeleteActive(!photoDeleteActive);
  };

  // photoEditModalOpen
  const onPhotoEditModalOpen = (photo: any) => {
    const index = originPhotoList.findIndex(
      (origin: any) => origin[1] === photo.id
    );

    setEditPhoto(photo);
    setCropImage(originPhotoList[index][0]);
    setSelectImage(originPhotoList[index][0]);
    setPhotoEditModalActive(!photoEditModalActive);
  };

  // photoEditModalClose
  const onPhotoEditModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setEditPhoto("");
    setPhotoEditModalActive(!photoEditModalActive);
  };

  const onPhotoRepresentativeActive = () => {
    setEditRepPhoto(repPhoto);
    setPhotoRepresentativeActive(!photoRepresentativeActive);
  };

  const onPhotoRepresentativeClose = () => {
    setRepPhoto(editRepPhoto);
    setEditRepPhoto({});
    setPhotoRepresentativeActive(!photoRepresentativeActive);
  };

  const onPhotoRepCheck = (photo: any) => {
    setRepPhoto((prev: any) => (prev.id === photo.id ? prev : photo));
  };

  const onPhotoRepSave = async () => {
    try {
      await patchPhotoDefault(userId, repPhoto.id, token);
    } catch (error) {
      throw error;
    }
    setRepPhoto("");
  };

  // 모달에 크롭 할 이미지 선택
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

  const [filmoList, setFilmoList] = useRecoilState<any>(filmography);

  const [filmoRepresentActive, setFilmoRepresentActive] = useState(false);
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [filmoInputs, setFilmoInputs] = useState(filmographyInputInit);
  const [filmoActives, setFilmoActives] = useState(filmographyActiveInit);
  const [filmoDeleteModal, setFilmoDeleteModal] = useState(false);
  const [filmoEditModal, setFilmoEditModal] = useState(false);
  const [selectFilmo, setSelectFilmo] = useState(filmographyInputInit);
  const [editRepresentative, setEditRepresentative] = useState([...filmoList]);
  const [representativeCount, setRepresentativeCount] = useState(0);
  const [filmoLink, setFilmoLink] = useState("");
  const [linkModalActive, setLinkModalActive] = useState(false);

  const [resultFilmoList, setResultFilmoList] = useState<any>([]);
  const [resultFilmoEdit, setResultFilmoEdit] = useState<any>({});

  const onResultFilmographySave = async () => {
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
      setResultFilmoList([data, ...resultFilmoList]);
    } catch (error) {
      throw error;
    }
    setFilmoInputs(filmographyInputInit);
    setFilmoModalActive(!filmoModalActive);
    setToastMessage("작품 활동을 추가했어요.");
  };

  const onResultFilmographyEditSave = async () => {
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
      is_featured: resultFilmoEdit.is_featured,
      production: {
        categoryId: categoryId + 1,
        productionYear: Number(filmoInputs.production),
        title: filmoInputs.title,
        description: filmoInputs.description,
        videoUrl: filmoInputs.link,
        thumbnailUrl: filmoInputs.thumbnail
      },
      displayOrder: resultFilmoEdit.displayOrder
    };

    try {
      const res = await putFilmography(
        userId,
        resultFilmoEdit.id,
        editFilmo,
        token
      );
      const data = res.data;

      const index = resultFilmoList.findIndex(
        (filmo: any) => filmo.id === data.id
      );
      const updateList = [...resultFilmoList];

      updateList[index] = data;
      setResultVideoList(updateList);
    } catch (error) {
      throw error;
    }
    setResultFilmoEdit({});
    setFilmoEditModal(!filmoEditModal);
    setToastMessage("작품 활동을 수정했어요.");
  };

  const onResultFilmographyDeleteClick = async () => {
    try {
      await deleteFilmography(userId, resultFilmoEdit.id, token);
      setResultFilmoList((prev: any) =>
        prev.filter((filmo: any) => filmo.id !== resultFilmoEdit.id)
      );
    } catch (error) {
      throw error;
    }
    setResultFilmoEdit({});
    setFilmoDeleteModal(!filmoDeleteModal);
    setToastMessage("작품 활동을 삭제했어요.");
  };

  // filmographyMain

  const onRepresentativeActive = () => {
    setFilmoRepresentActive(!filmoRepresentActive);
  };

  const onSaveRepActive = () => {
    setFilmoRepresentActive(!filmoRepresentActive);
    setFilmoList(editRepresentative);
  };

  const onRepresentativeCheck = (id: string) => {
    const updateFilmoList = editRepresentative.map((filmo) =>
      filmo.id === id
        ? { ...filmo, representative: !filmo.representative }
        : filmo
    );
    setEditRepresentative(updateFilmoList);
  };

  const onFilmoModalActive = () => {
    setFilmoModalActive(!filmoModalActive);
    setFilmoInputs(filmographyInputInit);
  };

  const onFilmoSelectClick = (filmo: filmoInputsTypes) => {
    setSelectFilmo(filmo);
  };

  const onFilmoEditClick = (filmo: filmoInputsTypes) => {
    setFilmoInputs(filmo);
    setFilmoEditModal(!filmoEditModal);
  };

  const onFilmoEditActive = () => {
    setFilmoEditModal(!filmoEditModal);
  };

  // filmographyModal

  const onFilmoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilmoInputs({
      ...filmoInputs,
      [name]: value
    });
  };

  const onFilmoActiveClick = (name: string, state: boolean) => {
    setFilmoActives({ ...filmoActives, [name]: !state });
  };

  const onFilmoDropdownClick = (name: string, item: string) => {
    setFilmoInputs({ ...filmoInputs, [name]: item });
  };

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

  // filmographyDeleteModal

  const onFilmoDeleteModalActive = () => {
    setFilmoDeleteModal(!filmoDeleteModal);
  };

  const onFilmoLink = (link: string) => {
    setFilmoLink(link);
    setLinkModalActive(!linkModalActive);
  };

  const onLinkModalActive = () => {
    setLinkModalActive(!linkModalActive);
  };

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Video ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const [videoInputs, setVideoInputs] = useState("");
  const [videoModalActive, setVideoModalActive] = useState(false);
  const [videoEditModalActive, setVideoEditModalActive] = useState(false);
  const [videoDeleteModalActive, setVideoDeleteModalActive] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [videoLinkModalActive, setVideoLinkModalActive] = useState(false);

  const [resultVideoList, setResultVideoList] = useState<any>([]);
  const [resultVideoEdit, setResultVideoEdit] = useState<any>({});

  const onVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInputs(e.target.value);
  };

  const onVideoModalActive = () => {
    setVideoInputs("");
    setVideoModalActive(!videoModalActive);
  };

  const onResultVideoModalSave = async () => {
    try {
      const res = await postVideo(userId, videoInputs, token);
      const data = res.data;
      setResultVideoList([...resultVideoList, data]);
    } catch (error) {
      throw error;
    }

    setVideoModalActive(!videoModalActive);
    setVideoInputs("");
    setToastMessage("영상을 추가했어요.");
  };

  const onResultVideoEditModalOpen = (video: any) => {
    setVideoInputs(video.url);
    setVideoEditModalActive(!videoEditModalActive);
    setResultVideoEdit(video);
  };

  const onResultVideoEditModalClose = () => {
    setVideoInputs("");
    setVideoEditModalActive(!videoEditModalActive);
    setResultVideoEdit({});
  };

  const onResultVideoEditModalSave = async () => {
    try {
      const data = await putVideo(
        userId,
        resultVideoEdit.id,
        videoInputs,
        token
      );

      const index = resultVideoList.findIndex(
        (video: any) => video.id === data.data.id
      );
      const updateList = [...resultVideoList];

      updateList[index].url = data.data.url;
      setResultVideoList(updateList);
    } catch (error) {
      throw error;
    }
    setVideoInputs("");
    setVideoEditModalActive(!videoEditModalActive);
    setToastMessage("영상을 수정했어요.");
  };

  const onResultVideoDeleteModalOpen = (video: any) => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setResultVideoEdit(video);
  };

  const onResultVideoDeleteModalClose = () => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
  };

  const onResultVideoDeleteClick = async () => {
    try {
      await deleteVideo(userId, resultVideoEdit.id, token);
      setResultVideoList((prev: any) =>
        prev.filter((video: any) => video.id !== resultVideoEdit.id)
      );
    } catch (error) {
      throw error;
    }
    setResultVideoEdit({});
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setToastMessage("영상을 삭제했어요.");
  };

  const onVideoLinkModalActive = () => {
    setVideoLinkModalActive(!videoLinkModalActive);
  };

  const onVideoLinkModalOpen = (video: any) => {
    setVideoLink(video.url);
    setVideoLinkModalActive(!videoLinkModalActive);
  };

  // recoil

  const router = useRouter();

  const setProfileData = useSetRecoilState(profile);

  // const profileData: any = {
  //   mainPhoto: photoRepresentative.photo,
  //   info: infoInputs,
  //   photo: photoList,
  //   filmography: filmoList,
  //   video: resultVideoList
  // };

  const onSaveProfileClick = () => {
    // setProfileData(profileData);
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
              resultFilmoList={resultFilmoList}
              filmoRepresentActive={filmoRepresentActive}
              editRepresentative={editRepresentative}
              representativeCount={representativeCount}
              onRepresentativeActive={onRepresentativeActive}
              onSaveRepActive={onSaveRepActive}
              onFilmoModalActive={onFilmoModalActive}
              onFilmoEditClick={onFilmoEditClick}
              onFilmoDeleteModalActive={onFilmoDeleteModalActive}
              onFilmoSelectClick={onFilmoSelectClick}
              onRepresentativeCheck={onRepresentativeCheck}
              onFilmoLink={onFilmoLink}
            />
            {filmoModalActive && (
              <FilmographyModal
                filmoInputs={filmoInputs}
                filmoActives={filmoActives}
                onFilmoModalActive={onFilmoModalActive}
                onFilmoInputChange={onFilmoInputChange}
                onFilmoActiveClick={onFilmoActiveClick}
                onFilmoDropdownClick={onFilmoDropdownClick}
                onSelectThumbnail={onSelectThumbnail}
                onResultFilmographySave={onResultFilmographySave}
              />
            )}
            {filmoEditModal && (
              <FilmographyEditModal
                filmoInputs={filmoInputs}
                filmoActives={filmoActives}
                onFilmoEditActive={onFilmoEditActive}
                onFilmoInputChange={onFilmoInputChange}
                onFilmoActiveClick={onFilmoActiveClick}
                onFilmoDropdownClick={onFilmoDropdownClick}
                onSelectThumbnail={onSelectThumbnail}
                onResultFilmographyEditSave={onResultFilmographyEditSave}
              />
            )}
            {filmoDeleteModal && (
              <FilmographyDeleteModal
                onCancel={onFilmoDeleteModalActive}
                onDelete={onResultFilmographyDeleteClick}
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
              resultVideoList={resultVideoList}
              videoDeleteModalActive={videoDeleteModalActive}
              onVideoModalActive={onVideoModalActive}
              onResultVideoEditModalOpen={onResultVideoEditModalOpen}
              onResultVideoDeleteModalOpen={onResultVideoDeleteModalOpen}
              onResultVideoDeleteModalClose={onResultVideoDeleteModalClose}
              onResultVideoDeleteClick={onResultVideoDeleteClick}
              onVideoLinkModalOpen={onVideoLinkModalOpen}
            />
            {videoModalActive && (
              <VideoModal
                videoInputs={videoInputs}
                onVideoInputChange={onVideoInputChange}
                onVideoModalActive={onVideoModalActive}
                onResultVideoModalSave={onResultVideoModalSave}
              />
            )}
            {videoEditModalActive && (
              <VideoEditModal
                videoInputs={videoInputs}
                onVideoInputChange={onVideoInputChange}
                onResultVideoEditModalClose={onResultVideoEditModalClose}
                onResultVideoEditModalSave={onResultVideoEditModalSave}
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
