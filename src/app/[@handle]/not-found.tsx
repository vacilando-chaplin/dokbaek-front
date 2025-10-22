import { routePaths } from "@/constants/routes";
import Link from "next/link";

const ProfileNotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          사용자를 찾을 수 없습니다
        </h2>
        <p className="mb-8 text-gray-500">
          요청하신 사용자가 존재하지 않거나 계정이 삭제되었습니다.
        </p>
        <div className="space-y-4">
          <Link
            href={routePaths.home()}
            className="text-white block rounded-lg bg-blue-600 px-6 py-3 transition-colors hover:bg-blue-700"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href={routePaths.profiles()}
            className="block rounded-lg bg-gray-200 px-6 py-3 text-gray-800 transition-colors hover:bg-gray-300"
          >
            배우 목록 보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileNotFound;
