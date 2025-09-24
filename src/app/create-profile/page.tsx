import { Metadata } from "next";
import UserProfileContainer from "../[@handle]/components/container/userProfileContainer";
import HandleNameCreateModal from "../[@handle]/components/handleName/handleNameCreateModal";

export const metadata: Metadata = {
  title: "독백 | 프로필 생성",
  description: "나만의 프로필을 생성하고 등록하세요",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true
  }
};

const HandleNameCreatePage = () => {
  return (
    <>
      <HandleNameCreateModal />
      <UserProfileContainer />
    </>
  );
};

export default HandleNameCreatePage;
