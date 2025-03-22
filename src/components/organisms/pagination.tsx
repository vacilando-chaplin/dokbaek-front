"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ArrowChevronRight from "../../../public/icons/ArrowChevronRight.svg";
import ArrowChevronLeft from "../../../public/icons/ArrowChevronLeft.svg";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`/profiles?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-[4px]">
      <button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-1 disabled:opacity-50"
      >
        <ArrowChevronLeft width="16" height="16" fill="#868E96" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`typography-body3 h-[36px] w-[36px] rounded-[8px] ${i === currentPage ? "bg-blue-600 text-static-white" : "text-content-primary-light"}`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 disabled:opacity-50"
      >
        <ArrowChevronRight width="16" height="16" fill="#868E96" />
      </button>
    </div>
  );
};

export default Pagination;
