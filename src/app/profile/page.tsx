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
import PhotoMain from "@/components/organisms/photoMain";
import PhotoModal from "@/components/organisms/photoModal";
import { profile } from "@/data/atom";
import {
  filmographyActiveInit,
  filmographyInputInit,
  infoActiveInit,
  infoInputInit
} from "@/data/data";
import { useDebounce } from "@/hooks/hooks";
import { filmoInputsTypes, SchoolTypes } from "@/types/types";
import { contactFormat, setCanvasPreview, setOnlyNumber } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { convertToPixelCrop } from "react-image-crop";
import { useSetRecoilState } from "recoil";

const Profile = () => {
  const [stepper, setStepper] = useState(0);
  const [infoInputs, setInfoInputs] = useState(infoInputInit);
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

  // photo

  const [photoList, setPhotoList] = useState<string[]>([]);
  const [photoModalActive, setPhotoModalActive] = useState(false);
  const [selectImage, setSelectImage] = useState("");

  // 크롭 할 이미지
  const imgRef = useRef<any>(null);

  // 크롭 할 이미지 미리보기
  const previewCanvasRef = useRef<any>(null);

  // 크롭 동작 수행
  const [crop, setCrop] = useState<any>();

  const onAddPhoto = () => {
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current?.width, imgRef.current?.height)
    );
    const dataUrl = previewCanvasRef.current?.toDataURL();

    if (dataUrl) {
      setPhotoList([...photoList, dataUrl]);
    }
    setPhotoModalActive(!photoModalActive);
    setSelectImage("");
  };

  const onPhotoModalActive = () => {
    setPhotoModalActive(!photoModalActive);
    setSelectImage("");
  };

  // 모달에 크롭 할 이미지 선택
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        setSelectImage(imageUrl);
      });

      reader.readAsDataURL(e.target.files[0]);
      e.currentTarget.value = "";
    }
  };

  // filmography

  const [filmoRepresentActive, setFilmoRepresentActive] = useState(false);
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [filmoList, setFilmoList] = useState<filmoInputsTypes[]>([]);
  const [filmoInputs, setFilmoInputs] = useState(filmographyInputInit);
  const [filmoActives, setFilmoActives] = useState(filmographyActiveInit);
  const [filmoDeleteModal, setFilmoDeleteModal] = useState(false);
  const [filmoEditModal, setFilmoEditModal] = useState(false);
  const [selectFilmo, setSelectFilmo] = useState(filmographyInputInit);
  const [editRepresentative, setEditRepresentative] = useState([...filmoList]);
  const [representativeCount, setRepresentativeCount] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

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

  useEffect(() => {
    const timeout = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [toastMessage]);

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

  // recoil

  const router = useRouter();

  const setProfileData = useSetRecoilState(profile);

  const profileData = {
    info: infoInputs,
    photo: photoList,
    filmography: filmoList
  };

  const onSaveProfileClick = () => {
    setProfileData(profileData);
    router.push("myProfile");
  };

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      {toastMessage && <Toast text={toastMessage} />}
      <SideMenu stepper={stepper} setStepper={setStepper} />
      <div className="flex w-[728px] flex-col gap-3">
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
          </>
        )}
        {stepper === 1 && (
          <>
            <PhotoMain
              photoList={photoList}
              onSelectFile={onSelectFile}
              onPhotoModalActive={onPhotoModalActive}
            />
            {photoModalActive && (
              <PhotoModal
                selectImage={selectImage}
                imgRef={imgRef}
                previewCanvasRef={previewCanvasRef}
                crop={crop}
                setCrop={setCrop}
                onModalActive={onPhotoModalActive}
                onAddPhoto={onAddPhoto}
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
