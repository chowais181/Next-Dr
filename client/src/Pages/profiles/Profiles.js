import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import ProfileItem from "./ProfileItem";
import { getAllProfiles } from "../../features/profile/profileActions";
import SearchNotFound from "../../components/SearchNotFound";
//.....................................................

export default function Profiles() {
  const dispatch = useDispatch();
  const [name, setKeyword] = useState("");
  console.log(name.toLowerCase());
  const { profiles, loading } = useSelector((state) => state.profile);

  profiles
    ?.filter((profiles) => profiles.specialist.includes(name))
    .map((profiles) => console.log("Goood", profiles));

  let isProfileNotFound = 0;
  if (loading === false) {
    isProfileNotFound = profiles && profiles.length === 0;
  }

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);
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
                  <strong>Doctor Profiles</strong>
                </h1>
              </div>
              <h2 className="welcome-heading">
                <i className="fas fa-user-md"></i> Book your Appointments
              </h2>

              <div className="search-profile">
                <div className="form-group has-search">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="form-control"
                    placeholder="Search Doctor by name or specialist..."
                  />
                </div>
              </div>
              {isProfileNotFound && <SearchNotFound searchQuery={name} />}
              {profiles != null ? (
                profiles
                  ?.filter(
                    (profiles) =>
                      profiles.specialist
                        .toLowerCase()
                        .includes(name.toLowerCase()) ||
                      profiles?.doctor?.name
                        .toLowerCase()
                        .includes(name.toLowerCase())
                  )
                  .map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
              ) : (
                <h4>No Profiles found..</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}
