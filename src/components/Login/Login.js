import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
function Login(props) {
  const [user, setUser] = useState({
    listUser: [],
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  });

  const handleChangeValue = (e) => {
    let { name, value } = e.target;
    // console.log("name", name, value);
    let newValues = { ...user.values };
    console.log(newValues);
    newValues = { ...newValues, [name]: value };

    setUser((state) => ({
      ...state,
      values: newValues,
    }));
  };

  const submitDangnhap = (e) => {
    e.preventDefault();
    const promises = Axios({
      url: "http://172.168.10.91:8000/api/admin/login",
      method: "POST",
      data: user.values,
    });
    promises.then((results) => {
      console.log("thành công đăng nhập", results.data);
    });
  };

  return (
    <>
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
          <h1 className="text-center mt-0 mb-5">User Login</h1>
          <div className="row"></div>
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
              onClick={submitDangnhap}
              style={{ fontSize: 25 }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
