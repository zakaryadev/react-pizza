import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch} from "react-redux";
import { setCurrentPage} from "../../redux/slices/filterSlice";

const Pagination = ({ onClick }) => {
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      nextLabel=">"
      previousLabel="<"
      breakLabel="..."
      onPageChange={(event) => dispatch(setCurrentPage(event.selected+1))}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
