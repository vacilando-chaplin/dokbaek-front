"use client";

import { getSchoolName } from "@/api/api";
import SideMenu from "@/components/molecules/sideMenu";
import FilmographyMain from "@/components/organisms/filmographyMain";
import FilmographyModal from "@/components/organisms/filmographyModal";
import InfoMain from "@/components/organisms/infoMain";
import InfoSub from "@/components/organisms/infoSub";
import PhotoMain from "@/components/organisms/photoMain";
import PhotoModal from "@/components/organisms/photoModal";
import {
  filmographyActiveList,
  filmographyInputList,
  infoActiveList,
  infoInputList
} from "@/data/data";
import { useDebounce } from "@/hooks/hooks";
import { SchoolTypes } from "@/types/types";
import { contactFormat, setCanvasPreview, setOnlyNumber } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { convertToPixelCrop } from "react-image-crop";

const Profile = () => {
  const [stepper, setStepper] = useState(0);
  const [infoInputs, setInfoInputs] = useState(infoInputList);
  const [infoActives, setInfoActives] = useState(infoActiveList);
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

  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [filmoList, setFilmoList] = useState(filmographyInputList);
  const [filmoInputs, setFilmoInputs] = useState(filmographyInputList);
  const [filmoActives, setFilmoActives] = useState(filmographyActiveList);

  const onFilmoModalActive = () => {
    setFilmoModalActive(!filmoModalActive);
  };

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

  return (
    <div className="mb-16 mt-16 flex flex-row gap-4 p-10">
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
            <FilmographyMain onFilmoModalActive={onFilmoModalActive} />
            {filmoModalActive && (
              <FilmographyModal
                filmoInputs={filmoInputs}
                filmoActives={filmoActives}
                onFilmoModalActive={onFilmoModalActive}
                onFilmoInputChange={onFilmoInputChange}
                onFilmoActiveClick={onFilmoActiveClick}
                onFilmoDropdownClick={onFilmoDropdownClick}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
