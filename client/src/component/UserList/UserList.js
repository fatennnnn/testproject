import React, { useEffect } from "react";
import { getAllUsers } from "../../features/adminSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import { IconContext } from "react-icons";
// import UserFactList from "../UserFactList/"
import "./UserList.css";
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
    <div className="list__facture">
      <h2>facturation</h2>

      {adminStatus.getAll === "loading" ? (
        <h3>Chargement en cours</h3>
      ) : adminStatus.getAll === "failed" ? (
        <h3>Quelque chose s'est mal passe</h3>
      ) : adminStatus.getAll === "succeded" && users.length > 0 ? (
        users && users.length > 0 ? (
          users.map((user) => (
            <div className="user__facture" key={user._id}>
              <div className="user__facture__name">
                <h5>
                  {user.nom} {user.prenom}
                </h5>
                {/* <h5></h5> */}
              </div>
              <div>
                <Link
                  className="linkfacture"
                  to={{
                    pathname: "/admin-section/user-facts",
                    state: { user },
                  }}
                >
                  <span>voir les factures</span>
                </Link>
              </div>
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
