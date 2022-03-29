import React, { useState, useEffect } from "react";
import Axios from "axios";
import PaginationUser from "./PaginationUser";
import queryString from "query-string";
import SearchForm from "./SearchForm";
import Modal from "./Modal";
import ModalUpdate from "./ModalUpdate";

function Movie(props) {
  const [users, setUsers] = useState({
    listUsers: [],
    // values: {
    //   id: "",
    //   name: "",
    //   phone: "",
    //   company: "",
    //   email: "",
    //   status: "",
    //   type_user: "",
    // },
  });

  const [editUsers, setEditUser] = useState({});

  const [pagination, setPagination] = useState({
    count: 10,
    current_page: 1,
    total: 1,
  });
  const [filters, setFilters] = useState({
    count: 10,
    page: 1,
  });

  //phần sự kiện Phân trang
  const handlePageChange = (newPage) => {
    // console.log("filters", filters.current_page);
    // console.log("newPage", newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  //phần sự kiện Tìm kiếm theo tên
  const handleFillterName = (newFilltersName) => {
    // console.log("newFilltersname", newFilltersName);
    setFilters({
      ...filters,
      current_page: 1,
      name: newFilltersName.searchTerm,
    });
    console.log("fillters", filters);
  };

  //phần sự kiện Tìm kiếm theo Name
  const handleFillterPhone = (newFilltersPhone) => {
    // console.log("newFilltersPhone", newFilltersPhone);
    setFilters({
      ...filters,
      current_page: 1,
      phone: newFilltersPhone.searchTerm,
    });
    console.log("fillters", filters);
  };

  //phần sự kiện Lọc theo trạng thái
  const handleStatusChange = (newStatus) => {
    // console.log("status", newStatus);
    setFilters({
      ...filters,
      current_page: 1,
      status: newStatus.searchStatus,
    });
  };

  //phần sự kiện Lọc theo Loại Người dùng
  const handleTypeUserChange = (newTypeUser) => {
    console.log("newTypeUser", newTypeUser);
    setFilters({
      ...filters,
      current_page: 1,
      type_user: newTypeUser.searchTypeUser,
    });
  };

  //phần sự kiện Xóa
  const handleDelete = (id) => {
    console.log("id", id);
    const promises = Axios({
      url: `http://192.168.102.42:8000/api/user/${id}`,
      method: "DELETE",
    });
    promises.then((results) => {
      getTaskList();
      alert("xóa thành công");
    });
    promises.catch((err) => {
      alert("xóa thất bại");
    });
  };

  //phần sự kiện sửa
  const handleUpdate = (user) => {
    setEditUser({
      editUsers: user,
    });
    console.log("user >>", user);
  };

  //phần sự kiện thêm User

  //phần sự kiện Gọi API Get
  const getTaskList = () => {
    const paramString = queryString.stringify(filters);
    // const paramString = filters;
    console.log("paramString", paramString);

    const promises = Axios({
      url: `http://192.168.102.42:8000/api/user?page=${paramString}`,
      method: "GET",
    });
    promises.then((results) => {
      console.log("thành cong getAPI", results);
      setUsers({
        ...users,
        listUsers: results.data.data.data.data,
      });
      setPagination(results.data.data.data.meta.pagination);
    });
    promises.catch((errors) => {
      console.log("k thành cong getAPI", errors);
    });
  };
  //phần sự kiện Render Bảng
  const renderTaskAPI = () => {
    // console.log("aa", users.listUsers);
    return users.listUsers.map((item, index) => (
      <tr key={index.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.company}</td>
        <td>{item.email}</td>
        <td>{item.status}</td>
        <td>{item.type_user}</td>
        <td style={{}}>
          <button
            class="btn btn-warning ml-2"
            data-toggle="modal"
            data-target="#exampleModalCenter2"
            onClick={() => {
              handleUpdate(item.id);
            }}
          >
            Sửa
          </button>
          <button
            class="btn btn-danger ml-2"
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            Xóa
          </button>
        </td>
      </tr>
    ));
  };
  useEffect(() => {
    getTaskList();
  }, [filters]);
  return (
    <div>
      <h3 className="m-5 text-primary" style={{ textAlign: "center" }}>
        List API USER
      </h3>
      <SearchForm
        onHandledName={handleFillterName}
        onHandledPhone={handleFillterPhone}
        onStatus={handleStatusChange}
        onTypeUser={handleTypeUserChange}
      />
      <button
        class="btn btn-success ml-2"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Thêm
      </button>
      <table class="table">
        {/* {limit='10'} */}
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Tên công ty</th>
            <th scope="col">email</th>
            <th scope="col">Trậng thái</th>
            <th scope="col">Trạng thái người dùng </th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>{renderTaskAPI()}</tbody>
      </table>
      <PaginationUser pagination={pagination} onPageChange={handlePageChange} />

      {/* Modal */}
      <Modal />
      <ModalUpdate onEditForm={editUsers} />
    </div>
  );
}

export default Movie;
