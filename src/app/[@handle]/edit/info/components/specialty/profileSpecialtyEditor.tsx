import React, { useEffect, useState } from "react";
import PlusCircle from "../../../../../../../public/icons/PlusCircle.svg";
import XCircleFill from "../../../../../../../public/icons/XCircleFill.svg";
import { useDebounce } from "@/lib/hooks";
import ProfileSpecialtyMediaModal from "./profileSpecialtyMediaModal";
import { SpecialtyType } from "../../types";
import { getSpecialty } from "../../api";
import AddableSearchDropdown from "@/components/molecules/addableSearchDropdown";

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
  const [profileSpecialtyMediaModal, setProfileSpecialtyMediaModal] =
    useState(false);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<number | null>(
    null
  );

  const onChangeProfileSpecialtyPhoto = (
    e: React.ChangeEvent<HTMLInputElement>,
    specialtyId: number
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", async () => {
        const imageUrl = reader.result?.toString() || "";

        const updatedSpecialties = specialties.map(
          (specialty: SpecialtyType) =>
            specialty.id === specialtyId
              ? { ...specialty, imageUrl: imageUrl }
              : specialty
        );
        setSpecialties(updatedSpecialties);

        e.currentTarget.value = "";
      });

      reader.readAsDataURL(file);
    }
  };

  const onDeleteSpecialtyPhoto = (specialtyId: number) => {
    const updatedSpecialties = specialties.map((specialty: SpecialtyType) =>
      specialty.id === specialtyId ? { ...specialty, imageUrl: "" } : specialty
    );
    setSpecialties(updatedSpecialties);
  };

  const onProfileSpecialtyMediaModalOpen = (specialtyId: number) => {
    setSelectedSpecialtyId(specialtyId);
    setProfileSpecialtyMediaModal(true);
  };
  const onProfileSpecialtyMediaModalClose = () => {
    setSelectedSpecialtyId(null);
    setProfileSpecialtyMediaModal(false);
  };
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
  };
  const onSaveSpecialtyMedia = (media: string) => {
    if (selectedSpecialtyId === null) return;

    const updatedSpecialties = specialties.map((specialty: SpecialtyType) =>
      specialty.id === selectedSpecialtyId
        ? { ...specialty, mediaUrl: media }
        : specialty
    );
    setSpecialties(updatedSpecialties);
    onProfileSpecialtyMediaModalClose();
  };
  const onDeleteSpecialtyMedia = (specialtyId: number) => {
    const updatedSpecialties = specialties.map((specialty: SpecialtyType) =>
      specialty.id === specialtyId ? { ...specialty, mediaUrl: "" } : specialty
    );
    setSpecialties(updatedSpecialties);
  };

  useEffect(() => {
    if (specialty.specialtyName) {
      fetchSpecialty(debounceSearch);
    }
  }, [debounceSearch]);
  return (
    <div className="w-full">
      {specialty && (
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
      )}
      {specialties && (
        <div className="scrollbar dark:dark-scrollbar-dropdown mt-4 max-h-80">
          <ul>
            {specialties.map((specialty) => (
              <li
                key={specialty.id}
                className="mb-1 rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="text-content-primary-light dark:text-content-primary-dark">
                    {specialty.specialtyName}
                  </div>
                  <div className="flex gap-2">
                    <label
                      htmlFor={`upload-${specialty.id}`}
                      className="flex cursor-pointer items-center font-medium text-content-tertiary-light dark:text-content-tertiary-dark"
                    >
                      <input
                        id={`upload-${specialty.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          onChangeProfileSpecialtyPhoto(e, specialty.id)
                        }
                      />
                      <PlusCircle
                        width="12"
                        height="12"
                        className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
                      />
                      <span style={{ marginLeft: "2px" }}>사진</span>
                    </label>
                    <button
                      type="button"
                      className="flex items-center font-medium text-content-tertiary-light dark:text-content-tertiary-dark"
                      onClick={() =>
                        onProfileSpecialtyMediaModalOpen(specialty.id)
                      }
                    >
                      <PlusCircle
                        width="12"
                        height="12"
                        className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
                      />
                      <span style={{ marginLeft: "2px" }}>영상</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center font-medium text-content-tertiary-light dark:text-content-tertiary-dark"
                      onClick={onDeleteSpecialty(specialty.id)}
                    >
                      <XCircleFill
                        width="16"
                        height="16"
                        className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
                      />
                    </button>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 ${(specialty.imageUrl || specialty.mediaUrl) && "mt-2"}`}
                >
                  {specialty.imageUrl && (
                    <div className="relative">
                      <img
                        src={specialty.imageUrl}
                        alt="Image Preview"
                        className="h-[80px] w-[fit] rounded-lg border border-gray-400"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1"
                        aria-label="사진 삭제"
                        onClick={() => onDeleteSpecialtyPhoto(specialty.id)}
                      >
                        <XCircleFill
                          width="16"
                          height="16"
                          className="fill-current text-content-primary-light"
                        />
                      </button>
                    </div>
                  )}
                  {specialty.mediaUrl && (
                    <div className="relative">
                      <img
                        src={`https://img.youtube.com/vi/${
                          specialty.mediaUrl.includes(
                            "https://www.youtube.com/watch?v="
                          )
                            ? specialty.mediaUrl.slice(32, 43)
                            : specialty.mediaUrl.slice(17, 48)
                        }/maxresdefault.jpg`}
                        alt="YouTube Thumbnail"
                        className="h-[80px] w-[142px] rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1"
                        aria-label="영상 삭제"
                        onClick={() => onDeleteSpecialtyMedia(specialty.id)}
                      >
                        <XCircleFill
                          width="16"
                          height="16"
                          className="fill-current text-content-primary-light"
                        />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {profileSpecialtyMediaModal && selectedSpecialtyId !== null && (
        <ProfileSpecialtyMediaModal
          specialtyId={selectedSpecialtyId}
          onSpecialtyMediaModalClose={() =>
            setProfileSpecialtyMediaModal(false)
          }
          onSaveSpecialtyMedia={onSaveSpecialtyMedia}
        />
      )}
    </div>
  );
};

export default ProfileSpecialtyEditor;
