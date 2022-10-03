import React, { Fragment, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Tooltip from "@mui/material/Tooltip";
import Loader from "../../components/Loader";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getAllUser, deleteUser } from "../../features/user/userActions";

export default function UsersList() {
  const { loading, users, isDeleted } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch, isDeleted]);

  // confirm alert --------------

  // ------------- columns -------------
  const columns = [
    { field: "index", headerName: "#No", minWidth: 100, flex: 0.1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.1,
    },

    {
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <button className="btn-action">
              <Tooltip title="Change Role">
                <Icon
                  icon="arcticons:set-edit"
                  color="blue"
                  width="25"
                  height="25"
                />
              </Tooltip>
            </button>
            <button className="btn-action">
              <Tooltip title="Delete User">
                <Icon
                  icon="eva:person-delete-fill"
                  color="red"
                  width="25"
                  height="25"
                  onClick={() => {
                    confirmAlert({
                      title: "Delete User",
                      message: "Are you sure to delete this user ?",
                      buttons: [
                        {
                          label: "Yes",
                          onClick: () => dispatch(deleteUser(params.row.id)),
                        },
                        {
                          label: "No",
                          // onClick: () => alert("Click No")
                        },
                      ],
                    });
                  }}
                />
              </Tooltip>
            </button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  // we slice the array bcz we cannot sort the array in strict mode without it
  users
    ?.slice()
    .reverse()
    .map((item, index) => {
      rows.push({
        index: index + 1,
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        createdAt: item.createdAt.substring(0, 10),
        phoneNumber: "+" + item.phoneNumber,
      });
      return 1;
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="profiles-page">
            <div className="container">
              <div className="heading-common">
                <h1>
                  <strong>Users List</strong>
                </h1>
              </div>
              <h2 className="welcome-heading">
                <i className="fas fa-user"></i> Registered Users
              </h2>
              <br />

              {users?.length > 0 ? (
                <div className="datagrid">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={13}
                    rowsPerPageOptions={[13]}
                    disableSelectionOnClick
                    components={{ Toolbar: GridToolbar }}
                    autoHeight
                    sx={{
                      m: 1,
                      boxShadow: 2,
                    }}
                  />
                </div>
              ) : (
                <h2
                  style={{ textAlign: "center", margin: "15%", color: "red" }}
                >
                  No user found..
                </h2>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
