import React from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import "./pagination.css";

interface Props {
  pageCount: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<Props> = ({ pageCount, handlePageChange }) => {
  return (
    <ReactPaginate
      breakLabel={<FontAwesomeIcon icon={faEllipsisH} />}
      previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
      nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
      onPageChange={handlePageChange}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={() => null}
      pageClassName="pagination-page-item"
      pageLinkClassName="pagination-page-link"
      previousClassName="pagination-page-item"
      previousLinkClassName="pagination-page-link"
      nextClassName="pagination-page-item"
      nextLinkClassName="pagination-page-link"
      breakClassName="pagination-page-item"
      breakLinkClassName="pagination-page-link"
      containerClassName="pagination"
      activeClassName="pagination-active"
    />
  );
};

export default Pagination;
