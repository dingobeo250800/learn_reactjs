import Axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function SearchForm(props) {
  const onSubmitName = props.onHandledName;
  const { onHandledPhone } = props;
  const { onStatus } = props;
  const { onTypeUser } = props;

  const [status, setStatus] = useState({
    listStatus: [],
    getStatus: "",
  });

  const [typeUsers, setTypeUsers] = useState({
    listTypeUsers: [],
    getTypeUser: "",
  });

  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermPhone, setSearchTermPhone] = useState("");
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const getSealectionApi = () => {
      const promises = Axios({
        url: `http://192.168.102.42:8000/api/get-status-user`,
        method: "GET",
      });
      promises.then((results) =>
        // console.log("select Thanh cong", results)
        setStatus({
          ...status,
          listStatus: results.data.data.data.data,
        })
      );
      promises.catch((errors) => console.log("select k Thanh cong", errors));
    };
    getSealectionApi();
  }, []);

  useEffect(() => {
    const getSealectionApi = () => {
      const promises = Axios({
        url: `http://192.168.102.42:8000/api/get-type-user`,
        method: "GET",
      });
      promises.then((results) =>
        // console.log("select type Thanh cong", results)
        setTypeUsers({
          ...typeUsers,
          listTypeUsers: results.data.data.data.data,
        })
      );
      promises.catch((errors) => console.log("select k Thanh cong", errors));
    };
    getSealectionApi();
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTermName(e.target.value);
    // setSearchTermPhone(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const fomvalues = {
        searchTerm: e.target.value,
      };
      onSubmitName(fomvalues);
    }, 300);
  };
  const handlePhoneTermChange = (e) => {
    setSearchTermPhone(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const fomvalues = {
        searchTerm: e.target.value,
      };
      onHandledPhone(fomvalues);
    }, 300);
  };

  const handleStatusChange = (e) => {
    // console.log("e", e.target.value);
    // setStatus(e.target.value);
    const formSearchStatus = {
      searchStatus: e.target.value,
    };
    onStatus(formSearchStatus);
  };

  const handleTypeUserChange = (e) => {
    const constSearchTYpeUser = {
      searchTypeUser: e.target.value,
    };
    onTypeUser(constSearchTYpeUser);
  };

  const renderSelectTypeUser = () => {
    return typeUsers.listTypeUsers.map((item, index) => (
      <option key={index} value={item.type_user_number}>
        {item.type_user}
      </option>
    ));
  };

  return (
    <div className="d-flex justify-content-end mb-5">
      <div className="col-2">
        <form>
          <input
            value={searchTermName}
            onChange={handleSearchTermChange}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div className="col-2">
        <form>
          <input
            value={searchTermPhone}
            onChange={handlePhoneTermChange}
            type="text"
            placeholder="Search"
          />
        </form>
      </div>
      <div class="form-group col-2">
        <select
          class="form-control"
          id="exampleFormControlSelect1"
          onChange={handleStatusChange}
        >
          {/* {console.log("list", status)}
          {console.log("list2", status.listStatus)} */}
          <option value="">--Chọn trạng thái--</option>
          {status.listStatus.map((item, index) => {
            return (
              <option key={index} value={item.status_number}>
                {item.status}
              </option>
            );
          })}
        </select>
      </div>
      <div class="form-group col-2">
        <select
          class="form-control"
          id="exampleFormControlSelect1"
          onChange={handleTypeUserChange}
        >
          {renderSelectTypeUser()}
        </select>
      </div>
      <div className="col-1">
        <button className="btn btn-primary">Bỏ chọn</button>
      </div>
    </div>
  );
}

export default SearchForm;
