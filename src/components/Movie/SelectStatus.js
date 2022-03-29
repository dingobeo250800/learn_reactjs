import React, { useState, useEffect } from "react";
import Axios from "axios";
function SelectStatus(props) {
  const { onChange } = props;

  const [status, setStatus] = useState({
    listStatus: [],
    // status:"0"
  });
  const handleStatusChange = (e) => {
    // const status = e.target.value;
    // console.log("status: ", status);
    const formSearchStatus = {
      searchStatus: e.target.value,
    };
    onChange(formSearchStatus);
  };

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

  return (
    <select
      class="form-control"
      id="exampleFormControlSelect1"
      onChange={handleStatusChange}
    >
      {/* {console.log("list", status)}
          {console.log("list2", status.listStatus)} */}
      {status.listStatus.map((item, index) => {
        return (
          <option key={index} value={item.status_number}>
            {item.status}
          </option>
        );
      })}
    </select>
  );
}

export default SelectStatus;
