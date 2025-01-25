import React, { useState } from "react";
import AddableSearchDropdown from "../molecules/addableSearchDropdown";
import { specialityList } from "@/lib/data";
import { SpecialityType } from "@/app/profile/[id]/create/info/types";

const ProfileSpecialtyEditor: React.FC = () => {
  const [specialties, setSpecialties] = useState<SpecialityType[]>([]);

  const [specialty, setSpecialty] = useState<SpecialityType>({
    id: 0,
    name: "",
    imageUrl: "",
    mediaUrl: ""
  });

  const handleAddSpecialty = (newSpecialty: string) => {};
  const onSpecialtyDropdownClick = (name: string, item: string) => {
    console.log(name, item, specialityList);
    const selectedSpecialty = specialityList.find(
      (specialty) => specialty.name === item
    );
    if (
      selectedSpecialty &&
      !specialties.some((specialty) => specialty.name === item)
    ) {
      setSpecialties((prev) => [...prev, selectedSpecialty]);
    }
  };
  return (
    <div className="w-full">
      <AddableSearchDropdown
        name="specialty"
        list={specialityList}
        value={specialty.name}
        selected={specialty.name}
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
                className="mb-1 items-center justify-center rounded-lg bg-gray-100 p-3 text-sm"
              >
                {specialty.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileSpecialtyEditor;
