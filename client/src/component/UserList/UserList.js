import React, { useEffect } from "react";
import { getAllUsers } from "../../features/adminSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import { IconContext } from "react-icons";
// import UserFactList from "../UserFactList/"

const UserList = () => {
  //   const dispactch = useDispatch();
  const dispatch = useDispatch();

  let isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuth) {
      dispatch(getAllUsers());
    }
  }, [isAuth]);
  const { users, adminStatus, adminErrors } = useSelector(
    (state) => state.admin
  );
  return (
    <div>
      <h2>List Client</h2>

      {adminStatus.getAll === "loading" ? (
        <IconContext.Provider value={{ className: "spinner--large" }}>
          <div>
            <ImSpinner9 />
          </div>
        </IconContext.Provider>
      ) : adminStatus.getAll === "failed" ? (
        <h3>quelque chose s'est mal passe</h3>
      ) : adminStatus.getAll === "succeded" && users.length > 0 ? (
        users && users.length > 0 ? (
          users.map((user) => (
            <div key={user._id}>
              <span>{user.nom}</span>
              <span>{user.prenom}</span>
              <Link
                to={{
                  pathname: "/admin-section/user-facts",
                  state: { user },
                }}
              >
                <span>view facts</span>
              </Link>
            </div>
          ))
        ) : (
          <h3>il n'y a pas de clients</h3>
        )
      ) : (
        <h3>Pas de Client</h3>
      )}
    </div>
  );
};
export default UserList;
