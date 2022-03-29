import React from "react";

function PaginationUser(props) {
  const { pagination, onPageChange } = props;
  const { count, current_page, total } = pagination;
  const totalPages = Math.ceil(total / count);

  const handlePageChange = (newPage) => {
    // console.log("page", current_page);
    // console.log("123", newPage);
    if (current_page >= totalPages) {
      newPage = current_page - totalPages;
      onPageChange(newPage);
    } else {
      onPageChange(newPage);
    }
    // onPageChange(newPage);
  };

  return (
    <div className=" mb-5 mr-5">
      <div className="pagination mr-5 mb-5  " style={{ float: "right" }}>
        <div className="parigator d-flex">
          <div
            className="page-link"
            aria-label="Previous"
            disabled={current_page <= 1}
            onClick={() => handlePageChange(current_page - 1)}
          >
            <span aria-hidden="true">Previous</span>
          </div>
          <div
            className="page-link"
            aria-label="Next"
            disabled={current_page >= totalPages}
            onClick={() => handlePageChange(current_page + 1)}
          >
            <span aria-hidden="true">Next</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginationUser;
