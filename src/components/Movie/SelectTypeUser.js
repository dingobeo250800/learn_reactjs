import React, { useState, useEffect } from "react";
import Axios from "axios";


function SelectTypeUser(props) {
  const { onChange } = props;
  const [typeUsers, setTypeUsers] = useState({
    listTypeUsers: [],
  });
  const handleStatusChange = (e) => {
    const formSearchStatus = {
      s: e.target.value,
    };
    onChange(formSearchStatus);
  };

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

  return (
    <select
      class="form-control"
      id="exampleFormControlSelect1"
      onChange={handleStatusChange}
    >
      {/* {console.log("list", typeUsers)}
      {console.log("list2", typeUsers.listTypeUsers)} */}
      {typeUsers.listTypeUsers.map((item, index) => {
        return (
          <option key={index} value={item.type_user_number}>
            {item.type_user}
          </option>
        );
      })}
    </select>
  );
}

export default SelectTypeUser;
