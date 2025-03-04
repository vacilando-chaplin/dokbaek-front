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
      pageClassName="flex items-center justify-center w-8 h-8 text-content-primary-light"
      breakClassName="flex items-center justify-center w-8 h-8 text-content-primary-light"
      activeClassName="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary-light hover:bg-hover-primary active:bg-pressed-primary text-static-white"
      previousClassName="flex items-center justify-center w-8 h-8 text-content-primary-light"
      nextClassName="flex items-center justify-center w-8 h-8 text-content-primary-light"
      previousLabel="<"
      nextLabel=">"
    />
  );
};

export default Pagination;
