import React, { useState } from "react";
import AddableSearchDropdown from "../molecules/addableSearchDropdown";
import { specialityList } from "@/lib/data";
import { SpecialityType } from "@/app/profile/[id]/create/info/types";
import PlusCircle from "../../../public/icons/PlusCircle.svg";
import XCircleFill from "../../../public/icons/XCircleFill.svg";
const ProfileSpecialtyEditor: React.FC = () => {
  const [specialties, setSpecialties] = useState<SpecialityType[]>([]);

  const [specialty, setSpecialty] = useState<SpecialityType>({
    id: 0,
    specialtyName: "",
    imageUrl: "",
    mediaUrl: ""
  });

  const handleAddSpecialty = (newSpecialty: string) => {};
  const onSpecialtyDropdownClick = (name: string, item: string) => {
    console.log(name, item, specialityList);
    const selectedSpecialty = specialityList.find(
      (specialty) => specialty.specialtyName === item
    );
    if (
      selectedSpecialty &&
      !specialties.some((specialty) => specialty.specialtyName === item)
    ) {
      setSpecialties((prev) => [...prev, selectedSpecialty]);
    }
  };
  const onAddImage = () => {};
  const onAddMedia = () => {};
  const onDeleteSpecialty = (specialtyId: number) => {
    return () => {
      setSpecialties((prev) =>
        prev.filter((specialty) => specialty.id !== specialtyId)
      );
    };
  };
  return (
    <div className="w-full">
      <AddableSearchDropdown
        name="specialty"
        list={specialityList}
        value={specialty.specialtyName}
        selected={specialty.specialtyName}
        onAdd={handleAddSpecialty}
        onClick={onSpecialtyDropdownClick}
        placeholder="특기를 검색해보세요."
      />
      {specialties && (
        <div className="scrollbar mt-4 max-h-80">
          <ul>
            {specialties.map((specialty) => (
              <li
                key={specialty.id}
                className="mb-1 flex items-center justify-between rounded-lg bg-gray-100 p-3 text-sm"
              >
                <div>{specialty.specialtyName}</div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex items-center font-medium text-content-tertiary-light"
                    onClick={onAddImage}
                  >
                    <PlusCircle width="12" height="12" fill="#ADB5BD" />
                    <span style={{ marginLeft: "2px" }}>사진</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center font-medium text-content-tertiary-light"
                    onClick={onAddMedia}
                  >
                    <PlusCircle width="12" height="12" fill="#ADB5BD" />
                    <span style={{ marginLeft: "2px" }}>영상</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center font-medium text-content-tertiary-light"
                    onClick={onDeleteSpecialty(specialty.id)}
                  >
                    <XCircleFill width="15" height="15" fill="#ADB5BD" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileSpecialtyEditor;
