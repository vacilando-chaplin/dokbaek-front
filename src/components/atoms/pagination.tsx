import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  onPageChange,
  currentPage
}) => {
  return (
    <ReactPaginate
      pageCount={totalPage}
      onPageChange={onPageChange}
      containerClassName="flex gap-2 justify-center"
      pageClassName="flex items-center justify-center w-8 h-8 text-content-primary-light dark:text-content-primary-dark"
      breakClassName="flex items-center justify-center w-8 h-8 text-content-primary-light dark:text-content-primary-dark"
      activeClassName="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary-light dark:bg-accent-primary-dark hover:bg-hover-primary active:bg-pressed-primary text-static-white typography-body3 font-semibold"
      previousClassName="flex items-center justify-center w-8 h-8 text-content-primary-light dark:text-content-primary-dark"
      nextClassName="flex items-center justify-center w-8 h-8 text-content-primary-light dark:text-content-primary-dark"
      previousLabel="<"
      nextLabel=">"
    />
  );
};

export default Pagination;
