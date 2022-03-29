import React, { useState } from "react";
import "./UserProfile.css";
import Axios from "axios";

function UserProfile() {
  // const url = "http://172.168.10.91:8000/api/admin/register";
  const [user, setUser] = useState({
    listUser: [],
    values: {
      name: "",
      avatar: "",
      email: "",
      phone: "",
      password: "",
    },
    errors: {
      name: "",
      avatar: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const handleChangeValue = (e) => {
    let { name, value } = e.target;
    // console.log("name", name, value);
    let newValues = { ...user.values };
    // console.log(newValues);
    newValues = { ...newValues, [name]: value };

    let newErrors = [user.errors.name, user.errors.email, user.errors.password];
    // console.log("newErrors>>>>>>>>>>>>>", newErrors);
    newErrors = { ...newErrors, [name]: value.trim() === "" };

    setUser((state) => ({
      ...state,
      values: newValues,
      errors: newErrors,
    }));
  };

  // console.log("data", user.values);
  const submitForm = (e) => {
    e.preventDefault();
    const promises = Axios({
      url: "http://172.168.10.91:8000/api/admin/register",
      method: "POST",
      data: user.values,
    });
    promises.then((results) => {
      console.log("thành công", results.data);
    });
    promises.catch((errors) => {
      console.log("thành công", errors);
    });
    // console.log("user.values.name", user.values.name);
    // Axios.post(url, {
    //   name: user.values.name,
    //   email: user.values.email,
    //   phone: user.values.phone,
    //   password: user.values.password,
    // }).then((res) => {
    //   console.log(res.data);
    // });

    console.log("123");
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#EEEEEE",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          fontSize:
            'font-family: "Google Sans", "Noto Sans Myanmar UI", arial, sans-serif',
          width: 600,
        }}
        className=" bg-white p-5 m-5"
      >
        <h1 className="text-center mt-0 mb-5">User Profile</h1>
        <div className="row">
          <div className="col-6">
            <div className="group">
              <input
                type="text"
                value={user.values.name}
                name="name"
                required
                onChange={handleChangeValue}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>name</label>
              <span className="text text-danger">{user.errors.name}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="group">
              <input
                type="text"
                value={user.values.avatar}
                name="avatar"
                required
                onChange={handleChangeValue}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>avatar</label>
              <span className="text text-danger">{user.errors.avatar}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="group">
              <input
                type="text"
                value={user.values.email}
                name="email"
                required
                onChange={handleChangeValue}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>email</label>
              <span className="text text-danger">{user.errors.email}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="group">
              <input
                type="text"
                value={user.values.phone}
                name="phone"
                required
                onChange={handleChangeValue}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>phone</label>
              <span className="text text-danger">{user.errors.phone}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="group">
              <input
                type="password"
                value={user.values.password}
                name="password"
                required
                onChange={handleChangeValue}
              />
              <span className="highlight" />
              <span className="bar" />
              <label>password</label>
              <span className="text text-danger">{user.errors.password}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <button
            className="btn text-white bg-dark w-100 col-12"
            onClick={submitForm}
            style={{ fontSize: 25 }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
