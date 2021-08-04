import React, { useState, useEffect } from "react";
import { headerData } from "../../headerData.js";
import DataTable from "../../components/DataTable/DataTable";
import { toast } from "react-toastify";
import AuthGuard from "../../components/AuthGuard/AuthGuard";
import constants from '../../constants';
function Index() {
  const [rowData, setRowData] = useState();
  useEffect(() => {
    const url = `${constants.API_URL}/users/`;
    const token = localStorage.getItem("token");
    fetch(url,{
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          setRowData(response.data);
        } else if (response.code === 401) {
          window.location.href = "/login";
        }
      });
  }, []);

  const onDeleteBatchActionClick = (selectedRows) => {
    const url = `${constants.API_URL}/users/delete/`;
    const selectedRowsId = selectedRows.map((row) => row.id);
    let formData = { user_ids: selectedRowsId, is_active: true };
    formData = JSON.stringify(formData);
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "DELETE",
      body: formData,
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:`Token ${token}`
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          const updatedRow = rowData.filter(
            (row) => !selectedRowsId.includes(row.id)
          );
          setRowData(updatedRow);
          toast.success("Successfully delete items.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (response.code === 401) {
          window.location.href = "/login";
        }
      });
  };

  const onActivateBatchActionClick = (selectedRows) => {
    const url = `${constants.API_URL}/users/status/`;
    const selectedRowsId = selectedRows.map((row) => row.id);
    let formData = { user_ids: selectedRowsId, is_active: true };
    formData = JSON.stringify(formData);
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "PATCH",
      body: formData,
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:`Token ${token}`
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          const updatedRow = rowData.filter((row) => {
            if (selectedRowsId.includes(row.id)) {
              row.is_active = true;
            }
            return row;
          });
          setRowData([]);
          setRowData(updatedRow);
          toast.success("Updated Status to Active for selected user.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (response.code === 401) {
          window.location.href = "/login";
        }
      });
  };
  const onDeactivateBatchActionClick = (selectedRows) => {
    const url = `${constants.API_URL}/users/status/`;
    const selectedRowsId = selectedRows.map((row) => row.id);
    let formData = { user_ids: selectedRowsId, is_active: false };
    formData = JSON.stringify(formData);
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "PATCH",
      body: formData,
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization:`Token ${token}`
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === 200) {
          const updatedRow = rowData.map((row) => {
            if (selectedRowsId.includes(row.id)) {
              row.is_active = false;
            }
            return row;
          });
          setRowData([]);
          setRowData(updatedRow);
          toast.success("Updated Status to Deactive for selected user.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (response.code === 401) {
          window.location.href = "/login";
        }
      });
  };

  return (
    <>
      <AuthGuard />
      <DataTable
        rowData={rowData}
        headerData={headerData}
        onDeleteBatchActionClick={onDeleteBatchActionClick}
        onActivateBatchActionClick={onActivateBatchActionClick}
        onDeactivateBatchActionClick={onDeactivateBatchActionClick}
      />
    </>
  );
}

export default Index;
