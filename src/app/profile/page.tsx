"use client";

import { getSchoolName, patchPhotoDefault, postPhoto, putInfo } from "@/api/api";
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
  mainPhoto,
  photo,
  profile,
  stepperAtom,
  video
} from "@/data/atom";
import {
  filmographyActiveInit,
  filmographyInputInit,
  infoActiveInit,
  infoInitData
} from "@/data/data";
import { useDebounce } from "@/hooks/hooks";
import {
  filmoInputsTypes,
  PhotoTypes,
  SchoolTypes,
  VideoTypes
} from "@/types/types";
import { contactFormat, setOnlyNumber } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Profile = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const [stepper, setStepper] = useRecoilState(stepperAtom);
  const [toastMessage, setToastMessage] = useState("");
  const [infoData, setInfoData] = useState(infoInitData);

  const [education, setEducation] = useState("");

  // const getData = async () => {
  //   try {
  //     const data = await getProfile(userId);
  //     setInfoData(data);
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, [stepper])

  useEffect(() => {
    const timeout = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

  const [infoInputs, setInfoInputs] = useRecoilState(info);
  const [infoActives, setInfoActives] = useState(infoActiveInit);
  const [schoolList, setSchoolList] = useState([]);

  useEffect(() => {
    if (infoInputs.education === "졸업") {
      setEducation("GRADUATED")
      return;
    }
    if (infoInputs.education === "졸업 예정") {
      setEducation("PENDING")
      return;
        }
    if (infoInputs.education === "재학 중") {
      setEducation("ENROLLED")
      return;
        }
    if (infoInputs.education === "휴학") {
      setEducation("LEAVE_OF_ABSENCE")
      return;
        }
    if (infoInputs.education === "수료") {
      setEducation("COMPLETION")
      return;
        }
    if (infoInputs.education === "중퇴") {
      setEducation("DROPPED_OUT")
      return;
    }
  }, [infoInputs.education])

  const onStepper = async (index: number) => {
    if (!token) {
      return;
    }
    if (index === 1) {
      const info = {
        status: "PUBLIC",
        name: infoInputs.name,
        bornYear: Number(infoInputs.birth),
        height: Number(infoInputs.height),
        weight: Number(infoInputs.weight),
        email: infoInputs.email,
        contact: infoInputs.contact,
        speciality: infoInputs.specialty,
        instagramLink: infoInputs.instagram,
        youtubeLink: infoInputs.youtube,
        introduction: infoInputs.introduction,
        education: [{
          school: {
            name: infoInputs.school,
            schoolType: "",
            schoolGubun: "",
          },
          major: infoInputs.major,
          status: education
        }]
      }
      try {
        const updateInfo = await putInfo(userId, token, info);
        setInfoData(updateInfo);
      } catch (error) {
        throw error;
      }
    }
    setStepper(index);
  }

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

  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputContact = contactFormat(value);
    setInfoInputs({ ...infoInputs, [name]: inputContact });
  };

  const onInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInfoInputs({ ...infoInputs, [name]: value });
  }

  const onYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInfoInputs({ ...infoInputs, [name]: value });
  }

  const onActiveClick = (name: string, state: boolean) => {
    setInfoActives({ ...infoActives, [name]: !state });
  };

  const onItemClick = (name: string, item: string) => {
    setInfoInputs({ ...infoInputs, [name]: item });
  };

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

  useEffect(() => {
    if (schoolList.length === 1 && schoolList[0] === infoInputs.school) {
      setInfoActives({ ...infoActives, school: false})
    } else {
      setInfoActives({ ...infoActives, school: true});
    }
  }, [infoInputs.school])

  //
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Photo ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  //

  const [photoList, setPhotoList] = useRecoilState<any>(photo);
  const [photoRepresentative, setPhotoRepresentative] =
    useRecoilState(mainPhoto);
  const [photoModalActive, setPhotoModalActive] = useState(false);
  const [selectImage, setSelectImage] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [photoId, setPhotoId] = useState(1);
  const [photoEdit, setPhotoEdit] = useState({
    photo: "",
    id: 0
  });
  const [photoEditModalActive, setPhotoEditModalActive] = useState(false);
  const [photoDeleteActive, setPhotoDeleteActive] = useState(false);
  const [photoRepresentativeActive, setPhotoRepresentativeActive] = useState({
    state: false,
    id: 0
  });

  const [resultPhotoList, setResultPhotoList] = useState();
  const [origin, setOrigin] = useState<any>();
  const [defaultPhotoId, setDefaultPhotoId] = useState<string>("");

  // photoModal 저장
  const onAddPhoto = async () => {
    try {
      if (cropImage) {
        const res = await postPhoto(userId, origin, cropImage, token);
        setPhotoList([...photoList, { photo: cropImage, id: photoId }])
        setResultPhotoList(res);
      } else {
        const res = await postPhoto(userId, origin, origin, token);
        setPhotoList([...photoList, { photo: selectImage, id: photoId }]);
        setResultPhotoList(res);
      }
    } catch (error) {
      throw error
    }
    setPhotoModalActive(!photoModalActive);
    setSelectImage("");
    setCropImage("");
    setPhotoId(photoId + 1);
    setToastMessage("사진을 추가했어요.");
  };

  // photoModal 편집
  const onEditPhoto = () => {
    const index = photoList.findIndex((v: PhotoTypes) => v.id === photoEdit.id);
    const list = [...photoList];
    if (cropImage) {
      list.splice(index, 1, {
        photo: cropImage,
        id: photoEdit.id
      });
    } else {
      list.splice(index, 1, {
        photo: selectImage,
        id: photoEdit.id
      });
    }
    setPhotoList(list);
    setPhotoEdit({ photo: "", id: 0 });
    setPhotoEditModalActive(!photoEditModalActive);
    setSelectImage("");
  };

  const onDeletePhoto = (id: number) => {
    const index = photoList.findIndex((v: PhotoTypes) => v.id === id);
    const list = [...photoList];
    list.splice(index, 1);
    setPhotoList(list);
    setPhotoDeleteActive(!photoDeleteActive);
    setToastMessage("사진을 삭제했어요.");
  };

  // photoDelete
  const onDeletePhotoActive = () => {
    setPhotoDeleteActive(!photoDeleteActive);
  };

  // photoModal 액티브
  const onPhotoModalActive = () => {
    setPhotoModalActive(!photoModalActive);
    setPhotoEdit({ photo: "", id: 0 });
    setSelectImage("");
  };

  const onPhotoEditModalClose = () => {
    setPhotoEditModalActive(!photoEditModalActive);
  };

  // photoEditModal 액티브
  const onEditPhotoModalActive = (photo: string, id: number) => {
    setPhotoEditModalActive(!photoEditModalActive);
    setPhotoEdit({ photo: photo, id: id });
    setSelectImage("");
  };

  // photoRepresentative 액티브
  const onPhotoRepresentativeActive = () => {
    if (photoRepresentative.id) {
      setPhotoRepresentativeActive({
        ...photoRepresentativeActive,
        state: !photoRepresentativeActive.state,
        id: photoRepresentative.id
      });
    } else {
      setPhotoRepresentativeActive({
        ...photoRepresentativeActive,
        state: !photoRepresentativeActive.state,
        id: 0
      });
    }
  };

  // photoRepresentative 완료
  const onPhotoRepresentativeSave = () => {
    const index = photoList.findIndex(
      (v: PhotoTypes) => v.id === photoRepresentativeActive.id
    );
    setDefaultPhotoId(photoRepresentativeActive.id.toString());
    const list = [...photoList];
    if (photoRepresentativeActive.id) {
      list.splice(index, 1, {
        photo: photoList[index].photo,
        id: photoList[index].id
      });
      setPhotoRepresentative(list[index]);
    } else {
      setPhotoRepresentative({ photo: "", id: 0 });
    }
    setPhotoList(list);
    setPhotoRepresentativeActive({
      ...photoRepresentativeActive,
      state: !photoRepresentativeActive.state
    });
    patchPhotoDefault(userId, defaultPhotoId, token);
    setToastMessage("대표 사진을 설정했어요.");
  };

  // photoRepresentative 대표작 선택
  const onPhotoRepresentativeSelect = (id: number) => {
    if (photoRepresentativeActive.id === id) {
      setPhotoRepresentativeActive({
        ...photoRepresentativeActive,
        id: 0
      });
    } else {
      setPhotoRepresentativeActive({
        ...photoRepresentativeActive,
        id: id
      });
    }
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
      setOrigin(e.target.files[0])
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

  useEffect(() => {
    setEditRepresentative([...filmoList]);
  }, [filmoList]);

  // count 수정 필요 (불필요한 리렌더링)
  useEffect(() => {
    const count = editRepresentative.filter(
      (v) => v.representative === true
    ).length;
    setRepresentativeCount(count);
  }, [editRepresentative]);

  // filmographyMain

  const onRepresentativeActive = () => {
    setFilmoRepresentActive(!filmoRepresentActive);
  };

  const onCancelRepActive = () => {
    setFilmoRepresentActive(!filmoRepresentActive);
    setEditRepresentative([...filmoList]);
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

  const onFilmoSaveClick = () => {
    const filmo = {
      ...filmoInputs,
      id: filmoInputs.title + filmoInputs.production
    };
    const updateFilmoList = [...filmoList, filmo];
    const sortedFilmoList = updateFilmoList.sort(
      (a, b) =>
        Number(b.production) - Number(a.production) ||
        a.title.localeCompare(b.title)
    );
    setFilmoList(sortedFilmoList);
    setFilmoInputs(filmographyInputInit);
    setFilmoModalActive(!filmoModalActive);
    setToastMessage("작품 활동을 추가했어요.");
  };

  // filmographyEditModal

  const onFilmoEditSaveClick = () => {
    const filmo = {
      ...filmoInputs,
      id: filmoInputs.title + filmoInputs.production
    };
    const updateFilmoList = [...filmoList];
    const index = updateFilmoList.findIndex((v) => v.id === selectFilmo.id);
    updateFilmoList[index] = filmo;
    const sortedFilmoList = updateFilmoList.sort(
      (a, b) =>
        Number(b.production) - Number(a.production) ||
        a.title.localeCompare(b.title)
    );
    setFilmoList(sortedFilmoList);
    setFilmoEditModal(!filmoEditModal);
    setToastMessage("작품 활동을 수정했어요.");
  };

  // filmographyDeleteModal

  const onFilmoDeleteModalActive = () => {
    setFilmoDeleteModal(!filmoDeleteModal);
  };

  const onFilmoDeleteClick = () => {
    const filteredFilmo = filmoList.filter(
      (filmo: filmoInputsTypes) => filmo.id !== selectFilmo.id
    );
    setFilmoList(filteredFilmo);
    setFilmoDeleteModal(!filmoDeleteModal);
    setSelectFilmo(filmographyInputInit);
    setToastMessage("작품 활동을 삭제했어요.");
  };

  const onFilmoLink = (link: string) => {
    setFilmoLink(link);
    setLinkModalActive(!linkModalActive);
  };

  const onLinkModalActive = () => {
    setLinkModalActive(!linkModalActive);
  };

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Video ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const [videoList, setVideoList] = useRecoilState<any>(video);

  const [videoId, setVideoId] = useState(0);
  const [videoInputs, setVideoInputs] = useState("");
  const [videoModalActive, setVideoModalActive] = useState(false);
  const [videoEditModalActive, setVideoEditModalActive] = useState(false);
  const [videoEdit, setVideoEdit] = useState({ link: "", id: 0 });
  const [videoDeleteModalActive, setVideoDeleteModalActive] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [videoLinkModalActive, setVideoLinkModalActive] = useState(false);

  const onVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInputs(e.target.value);
  };

  const onVideoModalActive = () => {
    setVideoInputs("");
    setVideoModalActive(!videoModalActive);
  };

  const onVideoEditModalClose = () => {
    setVideoEditModalActive(!videoEditModalActive);
  };

  const onVideoModalSave = () => {
    const updateVideoList = [...videoList, { link: videoInputs, id: videoId }];

    setVideoModalActive(!videoModalActive);
    setVideoList(updateVideoList);
    setVideoId(videoId + 1);
    setVideoInputs("");
    setToastMessage("영상을 추가했어요.");
  };

  const onVideoEditModalActive = (link: string, id: number) => {
    setVideoEditModalActive(!videoEditModalActive);
    setVideoInputs(link);
    setVideoEdit({ ...videoEdit, link: link, id: id });
  };

  const onVideoEditModalSave = () => {
    const index = videoList.findIndex((v: VideoTypes) => v.id === videoEdit.id);
    const list = [...videoList];
    list.splice(index, 1, {
      link: videoInputs,
      id: videoEdit.id
    });
    setVideoList(list);
    setVideoEdit({ link: "", id: 0 });
    setVideoInputs("");
    setVideoEditModalActive(!videoEditModalActive);
    setToastMessage("영상을 수정했어요.");
  };

  const onVideoDeleteModalActive = () => {
    setVideoDeleteModalActive(!videoDeleteModalActive);
  };

  const onVideoDelete = (id: number) => {
    const index = videoList.findIndex((v: VideoTypes) => v.id === id);
    const list = [...videoList];
    list.splice(index, 1);
    setVideoList(list);
    setVideoDeleteModalActive(!videoDeleteModalActive);
    setToastMessage("영상을 삭제했어요.");
  };

  const onVideoLinkModalActive = () => {
    setVideoLinkModalActive(!videoLinkModalActive);
  };

  const onVideoLinkModalOpen = (link: string) => {
    setVideoLink(link);
    setVideoLinkModalActive(!videoLinkModalActive);
  };

  // recoil

  const router = useRouter();

  const setProfileData = useSetRecoilState(profile);

  const profileData: any = {
    mainPhoto: photoRepresentative.photo,
    info: infoInputs,
    photo: photoList,
    filmography: filmoList,
    video: videoList
  };

  const onSaveProfileClick = () => {
    setProfileData(profileData);
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
              onContactChange={onContactChange}
              onActiveClick={onActiveClick}
              onItemClick={onItemClick}
              onInstagramChange={onInstagramChange}
              onYoutubeChange={onYoutubeChange}
            />
            <InfoSub
              infoInputs={infoInputs}
              infoActives={infoActives}
              schoolList={schoolList}
              onInputChange={onInputChange}
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
              photoRepresentative={photoRepresentative}
              photoRepresentativeActive={photoRepresentativeActive}
              onSelectFile={onSelectFile}
              onPhotoModalActive={onPhotoModalActive}
              onEditPhotoModalActive={onEditPhotoModalActive}
              onDeletePhoto={onDeletePhoto}
              onDeletePhotoActive={onDeletePhotoActive}
              onPhotoRepresentativeActive={onPhotoRepresentativeActive}
              onPhotoRepresentativeSave={onPhotoRepresentativeSave}
              onPhotoRepresentativeSelect={onPhotoRepresentativeSelect}
            />
            {photoModalActive && (
              <PhotoModal
                selectImage={selectImage}
                photoEdit={photoEdit}
                onModalActive={onPhotoModalActive}
                onAddPhoto={onAddPhoto}
                onEditPhoto={onEditPhoto}
                setCropImage={setCropImage}
              />
            )}
            {photoEditModalActive && (
              <PhotoEditModal
                selectImage={selectImage}
                photoEdit={photoEdit}
                onModalActive={onPhotoEditModalClose}
                onAddPhoto={onAddPhoto}
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
              filmoRepresentActive={filmoRepresentActive}
              editRepresentative={editRepresentative}
              representativeCount={representativeCount}
              onRepresentativeActive={onRepresentativeActive}
              onCancelRepActive={onCancelRepActive}
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
                onFilmoSaveClick={onFilmoSaveClick}
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
                onFilmoEditSaveClick={onFilmoEditSaveClick}
              />
            )}
            {filmoDeleteModal && (
              <FilmographyDeleteModal
                onCancel={onFilmoDeleteModalActive}
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
              onVideoEditModalActive={onVideoEditModalActive}
              onVideoDeleteModalActive={onVideoDeleteModalActive}
              onVideoDelete={onVideoDelete}
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
        onSave={onSaveProfileClick}
      />
    </div>
  );
};

export default Profile;
