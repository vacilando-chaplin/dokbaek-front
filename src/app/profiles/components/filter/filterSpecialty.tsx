"use client";

import { useActive } from "@/lib/hooks";
import FilterHeader from "./filterHeader";
import SearchDropdown from "@/components/molecules/searchDropdown";
import { useEffect, useState } from "react";
import { getSpecialty } from "@/app/[@handle]/edit/info/api";
import { motion, AnimatePresence } from "framer-motion";
import Chips from "@/components/atoms/chips";
import { SpecialtyItemType } from "@/app/[@handle]/edit/info/types";

interface FilterSpecialtyProps {}

const FilterSpecialty = ({}: FilterSpecialtyProps) => {
  const boxActive = useActive(false);
  const searchActive = useActive(false);

  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [specialtyList, setSpecialtyList] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  const onSearchSpecialty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSpecialty(e.target.value);
  };

  useEffect(() => {
    // 딜레이 적용 해야함
    const fetchSpecialtyList = async () => {
      const getSpecialtyList = await getSpecialty(searchSpecialty, 1, 5);
      setSpecialtyList(getSpecialtyList);
    };
    fetchSpecialtyList();
  }, [searchSpecialty]);

  return (
    <div className="flex w-full flex-col gap-2 px-5">
      <div className="flex w-full flex-col gap-4">
        <FilterHeader
          name="specialty"
          title="특기"
          isActive={boxActive.active}
          specialties={[]}
          onReset={() => {}}
          onActive={boxActive.onActive}
        />
        <AnimatePresence initial={false}>
          {boxActive.active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="flex h-auto w-full flex-col gap-2 overflow-hidden"
            >
              <SearchDropdown
                size="medium"
                name="specialty"
                list={specialtyList}
                value={searchSpecialty}
                active={searchActive.active}
                selected={""}
                onClick={() => {}}
                onActive={searchActive.onActive}
                onChange={onSearchSpecialty}
              />
              <div className="flex w-full flex-row gap-1">
                {selectedSpecialties.map(
                  (specialty: SpecialtyItemType, index) => {
                    return (
                      <Chips
                        key={specialty.id}
                        text={specialty.specialty?.specialtyName}
                        icon
                        onClick={() => {}}
                      />
                    );
                  }
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterSpecialty;
