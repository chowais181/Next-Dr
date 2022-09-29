import React, { useEffect, Fragment, useState } from "react";
import AppointmentItems from "./AppointmentItems";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { getMyAppointmentsUser } from "../../features/appointment/appointmentActions";
import Pagination from "react-js-pagination";

const Appointments = () => {
  const dispatch = useDispatch();
  const { loading, appointments, resultPerPage, total_appointments } =
    useSelector((state) => state.appointment);
  const { userInfo } = useSelector((state) => state.user);

  ///pagination
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getMyAppointmentsUser({ currentPage }));
  }, [dispatch, currentPage]);

  return (
    <Fragment>
      {loading && appointments !== null ? (
        <Loader />
      ) : (
        <Fragment>
          <section id="dashboard">
            <div className="container">
              <div className="heading-common">
                <h1>
                  <strong>Appointments</strong>
                </h1>
                <h2 className="welcome-heading">
                  <i className="fas fa-calendar-check"></i> {userInfo?.name}'s
                  appointments
                </h2>
                <div
                  className="mt-3"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button
                    className="btn btn-danger"
                    // onClick={() => deleteAccountUser()}
                  >
                    <i className="fas fa-user-minus"></i>
                    Delete My Account
                  </button>
                </div>
              </div>
              <div className="common-details">
                <br />
                {appointments?.length > 0 ? (
                  <div className="profiles">
                    <Fragment>
                      <AppointmentItems appointment={appointments} />
                    </Fragment>
                  </div>
                ) : (
                  <h4 style={{ color: "#738f93" }}>No Appointments found...</h4>
                )}
              </div>

              {appointments?.length > 0 && (
                <div className="pagination">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={total_appointments}
                    onChange={setCurrentPageNo}
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Appointments;
