import Axios from "axios";
import React, { useState } from "react";
import SelectStatus from "./SelectStatus";
import SelectTypeUser from "./SelectTypeUser";

function ModalUpdate(props) {
  const { onEditForm } = props;
  // let name = props.name;
  // const [name, setName]= useState("")
  console.log("id", onEditForm.editUsers);
  let id = onEditForm.editUsers;

  const [users, setUsers] = useState({
    values: {
      name: "",
      phone: "",
      company: "",
      email: "",
      status: "0",
      type_user: "0",
    },
  });
  // console.log("onEditForm", onEditForm.editUsers.name);

  const [valueStatus, setValueStatus] = useState({});

  const handleFormControlChange = (newStatus) => {
    // console.log("newStatus", newStatus.searchStatus);
    setValueStatus({
      ...valueStatus,
      status: newStatus.searchStatus,
    });
    // console.log("users", users);
  };
  const handleFormControlChange2 = (newTypeUser) => {
    // console.log("newStatus", newTypeUser.searchStatus);
    setValueStatus({
      ...valueStatus,
      type_user: newTypeUser.searchTypeUser,
    });
    // console.log("users", users);
  };

  const handleChangeUser = (e) => {
    e.preventDefault();
    let { value, name } = e.target;
    let newValues = { ...users.values };
    newValues = { ...newValues, [name]: value };
    // console.log("newValues", newValues);
    setUsers({
      ...users,
      values: newValues,
    });
  };

  const handleUpdateUser = () => {
    const submitForm = Object.assign({}, users.values, valueStatus);
    console.log("body", submitForm);
    const promises = Axios({
      url: `http://192.168.102.42:8000/api/user/${id}`,
      method: "PUT",
      data: submitForm,
    });
    promises.then((results) => {
      console.log("them thanh cong");
    });
    promises.catch((err) => {
      console.log("them k thanh cong");
    });
  };

  return (
    <div
      className="modal fade"
      id="exampleModalCenter2"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Sửa User
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form action="" onSubmit={handleUpdateUser}>
              <div className="row">
                <div className="col-6 mt-4 ">
                  <input
                    onChange={handleChangeUser}
                    name="name"
                    value={users.values.name}
                    type="text"
                    placeholder="Họ và tên"
                  />
                </div>
                <div className="col-6 mt-4">
                  <input
                    onChange={handleChangeUser}
                    name="phone"
                    type="number"
                    placeholder="Số điện thoại"
                  />
                </div>
                <div className="col-6 mt-4">
                  <input
                    onChange={handleChangeUser}
                    name="company"
                    type="text"
                    placeholder="Tên công ty"
                  />
                </div>
                <div className="col-6 mt-4">
                  <input
                    onChange={handleChangeUser}
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="col-6 mt-4">
                  <SelectStatus onChange={handleFormControlChange} />
                </div>

                <div className="col-6 mt-4">
                  <SelectTypeUser onChange={handleFormControlChange2} />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleUpdateUser()}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdate;
