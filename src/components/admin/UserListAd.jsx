import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { blockUser } from "../../redux/actions/userActions";

const UserListAd = () => {
  const { AllUsers } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  return (
    <div>
      {AllUsers.map((el) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <h4>{el.Username}</h4>
          <p>{el.userRole}</p>
          <p>{el.email}</p>
          <p>Account status : {el.blocked ? "Blocked" : "Working"}</p>
          <Button onClick={() => dispatch(blockUser(el.id))} variant="danger">
            {el.blocked ? "Unblock" : "Block"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UserListAd;
