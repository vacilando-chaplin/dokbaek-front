"use client";

import { getSchoolName } from "@/api/api";
import SideMenu from "@/components/molecules/sideMenu";
import InfoMain from "@/components/organisms/infoMain";
import InfoSub from "@/components/organisms/infoSub";
import PhotoMain from "@/components/organisms/photoMain";
import { infoActiveList, infoInputList } from "@/data/data";
import { useDebounce } from "@/hooks/hooks";
import { SchoolTypes } from "@/types/types";
import { contactFormat, setOnlyNumber } from "@/utils/utils";
import { useEffect, useState } from "react";

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
      console.log(filteredSchoolName);
    };
    getSearchSchool(debounceSearch);
  }, [debounceSearch]);

  // photo

  const [photoList, setPhotoList] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const onAddPhoto = (photo: string) => {
    setPhotoList([...photoList, photo]);
  };

  const onModalOpen = () => {
    setModalOpen(!modalOpen);
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
              modalOpen={modalOpen}
              onAddPhoto={onAddPhoto}
              onModalOpen={onModalOpen}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
