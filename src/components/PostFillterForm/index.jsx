import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

PostFillterForm.propTypes = {};

function PostFillterForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);

    //SET --100 --CLEAR, SET -- 300 -->SUBMIT
    //SET --300 -->SUBMIT
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const fomvalues = {
        searchTerm: e.target.value,
      };
      onSubmit(fomvalues);
    }, 300);
  };
  return (
    <form>
      <input
        value={searchTerm}
        onChange={handleSearchTermChange}
        type="text"
        placeholder="Search"
      />
    </form>
  );
}

export default PostFillterForm;
