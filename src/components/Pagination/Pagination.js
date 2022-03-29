import React, { useEffect } from "react";
import PropTypes from "prop-types";

Pagination.prototype = {
  Pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};
Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  let { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  function handlePageChange(newPage) {
    console.log("page", _page);
    console.log("123", newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  }
  // useEffect(() => {
  //   // onPageChange(newPage);
  //   console.log("pageeee", _page);
  // });
  return (
    <div className="parigator d-flex">
      <div
        className="page-link"
        aria-label="Previous"
        disabled={_page <= 1}
        onClick={() => handlePageChange((_page = _page - 1))}
      >
        <span aria-hidden="true">«</span>
      </div>
      <div
        className="page-link"
        aria-label="Next"
        disabled={_page >= totalPages}
        onClick={() => handlePageChange((_page = _page + 1))}
      >
        <span aria-hidden="true">»</span>
      </div>
    </div>
  );
}

export default Pagination;
