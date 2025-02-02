import React, { useEffect } from "react";
import AddableSearchDropdown from "../molecules/addableSearchDropdown";
import { SpecialtyType } from "@/app/profile/[id]/create/info/types";
import PlusCircle from "../../../public/icons/PlusCircle.svg";
import XCircleFill from "../../../public/icons/XCircleFill.svg";
import { getSpecialty } from '../../app/profile/[id]/create/info/api';
import { useDebounce } from "@/lib/hooks";

interface ProfileSpecialtyEditorProps {
  specialties: SpecialtyType[];
  setSpecialties: (specialty: SpecialtyType[]) => void;
  specialty: SpecialtyType;
  setSearchSpecialty: (specialty: SpecialtyType[]) => void;
  searchSpecialty: SpecialtyType[];
  onAddSpecialty: (newSpecialty: string) => void;
  onSpecialtyDropdownClick: (name: string, item: string) => void;
  onSpecialtyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteSpecialty: (specialtyId: number) => () => void;
}
const ProfileSpecialtyEditor = ({
  specialties, 
  setSpecialties,
  specialty,
  setSearchSpecialty,
  searchSpecialty,
  onAddSpecialty,
  onSpecialtyDropdownClick, 
  onSpecialtyChange,
  onDeleteSpecialty
}: ProfileSpecialtyEditorProps) => {
  const onAddImage = () => {};
  const onAddMedia = () => {};

  const debounceSearch: any = useDebounce(specialty?.specialtyName, 500);

  const fetchSpecialty = async (keyword: string) => {
    const page = 0;
    const size = 10;
    try {
      const res = await getSpecialty(keyword, page, size);
      setSearchSpecialty([...res]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(specialty.specialtyName) {
      fetchSpecialty(debounceSearch)
    }
  }, [debounceSearch])
  return (
    <div className="w-full">
      {
        specialty && (
          <AddableSearchDropdown
            name="specialty"
            list={searchSpecialty}
            value={specialty.specialtyName}
            selected={specialty.specialtyName}
            onAdd={onAddSpecialty}
            onClick={onSpecialtyDropdownClick}
            onChange={onSpecialtyChange}
            placeholder="특기를 검색해보세요."
          />
        )
      }
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
