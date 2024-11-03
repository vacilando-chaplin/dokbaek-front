"use client";

import { getSchoolName } from "@/api/api";
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
import PhotoMain from "@/components/organisms/photoMain";
import PhotoModal from "@/components/organisms/photoModal";
import VideoMain from "@/components/organisms/videoMain";
import VideoModal from "@/components/organisms/videoModal";
import {
  filmography,
  info,
  mainPhoto,
  photo,
  profile,
  stepperAtom,
  video
} from "@/data/atom";
import {
  filmographyActiveInit,
  filmographyInputInit,
  infoActiveInit
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
import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const Profile = () => {
  const [stepper, setStepper] = useRecoilState(stepperAtom);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

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

  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputContact = contactFormat(value);
    setInfoInputs({ ...infoInputs, [name]: inputContact });
  };

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
  const [photoDeleteActive, setPhotoDeleteActive] = useState(false);
  const [photoRepresentativeActive, setPhotoRepresentativeActive] = useState({
    state: false,
    id: 0
  });

  // photoModal 저장
  const onAddPhoto = () => {
    cropImage
      ? setPhotoList([...photoList, { photo: cropImage, id: photoId }])
      : setPhotoList([...photoList, { photo: selectImage, id: photoId }]);
    setPhotoModalActive(!photoModalActive);
    setSelectImage("");
    setPhotoId(photoId + 1);
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
    setPhotoModalActive(!photoModalActive);
    setSelectImage("");
    console.log(index);
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

  // photoEditModal 액티브
  const onEditPhotoModalActive = (photo: string, id: number) => {
    setPhotoEdit({ photo: photo, id: id });
    setPhotoModalActive(!photoModalActive);
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

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Video ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  const [videoList, setVideoList] = useRecoilState<any>(video);

  const [videoId, setVideoId] = useState(0);
  const [videoInputs, setVideoInputs] = useState("");
  const [videoModalActive, setVideoModalActive] = useState(false);
  const [videoEdit, setVideoEdit] = useState({ link: "", id: 0 });
  const [videoDeleteModal, setVideoDeleteModal] = useState(false);

  const onVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoInputs(e.target.value);
  };

  const onVideoModalActive = () => {
    setVideoModalActive(!videoModalActive);
  };

  const onVideoModalSave = () => {
    const updateVideoList = [...videoList, { link: videoInputs, id: videoId }];

    setVideoModalActive(!videoModalActive);
    setVideoList(updateVideoList);
    setVideoId(videoId + 1);
    setVideoInputs("");
  };

  const onVideoEditModalActive = (link: string, id: number) => {
    setVideoModalActive(!videoModalActive);
    setVideoEdit({ ...videoEdit, link: link, id: id });
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
      <SideMenu stepper={stepper} setStepper={setStepper} />
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
          </>
        )}
        {stepper === 3 && (
          <>
            <VideoMain
              videoList={videoList}
              onVideoModalActive={onVideoModalActive}
            />
            {videoModalActive && (
              <VideoModal
                videoInputs={videoInputs}
                onVideoInputChange={onVideoInputChange}
                onVideoModalActive={onVideoModalActive}
                onVideoModalSave={onVideoModalSave}
              />
            )}
          </>
        )}
      </div>
      <BottomBar
        // disabled={
        //   infoInputs.name.length === 0 ||
        //   infoInputs.birth.length === 0 ||
        //   infoInputs.contact.length === 0
        // }
        disabled={false}
        onSave={onSaveProfileClick}
      />
    </div>
  );
};

export default Profile;
