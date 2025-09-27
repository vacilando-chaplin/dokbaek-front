"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ArrowChevronRight from "../../../public/icons/ArrowChevronRight.svg";
import ArrowChevronLeft from "../../../public/icons/ArrowChevronLeft.svg";

interface PaginationProps {
  pageName: "likes" | "profiles";
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ pageName, currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`/${pageName}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(0, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const buttonStyles = {
    base: "typography-body3 h-9 w-9 rounded-lg",
    active: "bg-blue-600 text-static-white",
    inactive: "text-content-primary-light hover:bg-gray-100"
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 disabled:opacity-50"
        aria-label="이전 페이지"
      >
        <ArrowChevronLeft
          width="16"
          height="16"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      </button>
      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`${buttonStyles.base} ${
            pageNum === currentPage
              ? buttonStyles.active
              : buttonStyles.inactive
          }`}
          aria-label={`${pageNum + 1} 페이지로 이동`}
        >
          {pageNum + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 disabled:opacity-50"
        aria-label="다음 페이지"
      >
        <ArrowChevronRight
          width="16"
          height="16"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      </button>
    </div>
  );
};

export default Pagination;
