"use client";

import { useActive, useDebounce } from "@/lib/hooks";
import FilterHeader from "./filterHeader";
import { useEffect, useState } from "react";
import { getSpecialty } from "@/app/[@handle]/edit/info/api";
import { AnimatePresence } from "framer-motion";
import Chips from "@/components/atoms/chips";
import { SpecialtyType } from "@/components/molecules/addableSearchDropdown";
import SpecialtySearchDropdown from "./specialtySearchDropdown";
import CollapseMotion from "@/components/atoms/collapseMotion";

interface FilterSpecialtyProps {
  specialties: SpecialtyType[];
  onReset: () => void;
  onSelect: (specialty: SpecialtyType) => void;
  onRemove: (id: number) => void;
}

const FilterSpecialty = ({
  specialties,
  onReset,
  onSelect,
  onRemove
}: FilterSpecialtyProps) => {
  const boxActive = useActive(false);
  const searchActive = useActive(false);

  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [specialtyList, setSpecialtyList] = useState<SpecialtyType[]>([]);

  const SpecialtyNameList: string[] = specialties.map(
    (item) => item.specialtyName
  );

  const debouncedSearch = useDebounce(searchSpecialty, 300);

  const onSearchSpecialty = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchSpecialty) {
      searchActive.onOpen();
    }

    setSearchSpecialty(e.target.value);
  };

  useEffect(() => {
    const fetchSpecialtyList = async () => {
      const getSpecialtyList = await getSpecialty(debouncedSearch, 0, 5);
      setSpecialtyList(getSpecialtyList);
    };

    if (debouncedSearch === "") {
      searchActive.onClose();
      setSpecialtyList([]);
      return;
    }

    fetchSpecialtyList();
  }, [debouncedSearch]);

  return (
    <div className="flex w-full flex-col gap-2 px-5">
      <div className="flex w-full flex-col gap-4">
        <FilterHeader
          name="specialty"
          title="특기"
          isActive={boxActive.active}
          specialties={SpecialtyNameList}
          onReset={() => {
            onReset();
            searchActive.onClose();
            setSpecialtyList([]);
          }}
          onActive={boxActive.onActive}
        />
        <AnimatePresence initial={false}>
          {boxActive.active && (
            <CollapseMotion className="flex h-auto w-full flex-col gap-2">
              <SpecialtySearchDropdown
                size="medium"
                name="specialty"
                list={specialtyList}
                value={searchSpecialty}
                active={searchActive.active}
                selected={""}
                isEmpty={specialtyList.length === 0}
                placeholder="특기를 검색해보세요."
                onClick={(item: SpecialtyType) => {
                  onSelect({ id: item.id, specialtyName: item.specialtyName });
                  setSearchSpecialty("");
                  searchActive.onClose();
                }}
                onActive={searchActive.onActive}
                onChange={onSearchSpecialty}
              />
              <div className="flex w-full flex-row flex-wrap gap-1">
                {specialties.map((specialty: SpecialtyType) => {
                  return (
                    <Chips
                      key={specialty.id}
                      text={specialty.specialtyName}
                      icon
                      onClick={() => onRemove(specialty.id)}
                    />
                  );
                })}
              </div>
            </CollapseMotion>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterSpecialty;
