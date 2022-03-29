import React, { useState, useEffect } from "react";
import queryString from "query-string";
import Axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import PostFillterForm from "../PostFillterForm";

export default function Student() {
  const [conduct, setConduct] = useState({
    listdata: [],
    values: {
      id: "",
      author: "",
      createdAt: "",
      description: "",
      imageUrl: "",
      title: "",
      updatedAt: "",
    },
  });

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    // title_like: "",
  });

  // const handlePageChange = (newPage) => {
  //   console.log("newPage: ", newPage);
  //   setFilters({
  //     ...filters,
  //     _page: newPage,
  //   });
  // };
  function handlePageChange(newPage) {
    console.log("newPage: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  const handleFilltersChange = (newFillters) => {
    console.log("newFillters: ", newFillters);
    setFilters({
      ...filters,
      _page: 1,
      id_like: newFillters.searchTerm, ///tim kiem theo lua chon
    });
  };

  const getTaskList = () => {
    // console.log("123");
    const paramString = queryString.stringify(filters);
    console.log("filters: ", paramString);
    const promises = Axios({
      url: `http://js-post-api.herokuapp.com/api/posts?${paramString}`,
      method: "GET",
    });
    promises.then((results) => {
      console.log("thành conmeno cong", results);
      setConduct({
        ...conduct,
        listdata: results.data.data,
      });
      setPagination(results.data.pagination);
    });
    promises.catch((errors) => {
      console.log("k thành conmeno cong", errors);
    });
  };
  const renderTaskAPI = () => {
    // console.log("1", conduct);
    // console.log("2", conduct.listdata);
    // console.log("asd123",conduct.item.name);
    return conduct.listdata.map((item, index) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.author}</td>
        <td>{item.createdAt}</td>
        <td>{item.description}</td>
        <td>
          <img
            style={{ width: "100%", height: "100%" }}
            src={item.imageUrl}
            alt="ảnh đẹp vcl"
          />
        </td>
        <td>{item.title}</td>
        <td>{item.updatedAt}</td>
        <td>
          <button class="btn btn-primary">Xóa</button>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    getTaskList();
    // setPagination();
  }, [filters]);

  // useEffect(() => {
  //   async function getTaskList() {
  //     const paramString = queryString.stringify(filters);
  //     // console.log("filters: ", paramString);
  //     const promises = Axios({
  //       url: `http://js-post-api.herokuapp.com/api/posts?${paramString}`,
  //       method: "GET",
  //     });
  //     promises.then((results) => {
  //       console.log("thành conmeno cong", results);
  //       setConduct({
  //         ...conduct,
  //         listdata: results.data.data,
  //       });
  //       setPagination(results.data.pagination);
  //     });
  //     promises.catch((errors) => {
  //       console.log("k thành conmeno cong", errors);
  //     });
  //   }
  //   getTaskList();
  // }, [filters]);
  return (
    <>
      <PostFillterForm onSubmit={handleFilltersChange} />
      <div>
        <h3 style={{ textAlign: "center" }}>check trạng thái</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Stt</th>
              <th scope="col">name</th>
              <th scope="col">type</th>
              <th scope="col">classification</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{renderTaskAPI()}</tbody>
        </table>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </>
  );
}
