import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { loggedUser, isAuth } = useSelector((state) => state.userReducer);
  return (
    <div>
      {isAuth ? (
        <>
          {" "}
          <h1>{loggedUser.Username}</h1>
          <h4>{loggedUser.Email}</h4>
          <p>Role : {loggedUser.userRole}</p>
          <p>Account Status : {loggedUser.blocked ? "Blocked" : "Good"}</p>
        </>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
};

export default Profile;
