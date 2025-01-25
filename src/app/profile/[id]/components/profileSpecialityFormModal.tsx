import BoxButton from "@/components/atoms/boxButton";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import SearchDropdown from "@/components/molecules/searchDropdown";
import ProfileSpecialtyEditor from "@/components/organisms/profileSpecialtyEditor";

interface ProfileSpecialityFormModalProps {
  type: "add" | "edit";
  onCloseClick: React.MouseEventHandler<HTMLButtonElement>;
  onConfirmClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfileSpecialityFormModal = ({
  type,
  onCloseClick,
  onConfirmClick
}: ProfileSpecialityFormModalProps) => {
  const modalTitle = type === "add" ? "특기 추가" : "특기 추가/수정";
  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="interaction-default relative flex h-auto w-full max-w-[480px] animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-medium">
        <ModalHeader name={modalTitle} onClick={onCloseClick} />
        <div className="w-full p-6">
          <ProfileSpecialtyEditor />
        </div>
        <ModalFooter
          text="완료"
          onCloseClick={onCloseClick}
          onSaveClick={onConfirmClick}
        />
      </div>
    </section>
  );
};

export default ProfileSpecialityFormModal;
