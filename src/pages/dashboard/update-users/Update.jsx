import React from "react";
import { useParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const UpdateUser = () => {
  const { id } = useParams();
  const users = useUser();

  const user = users.find((u) => u._id === id);
  console.log(user);

  return (
    <div>
      <h1>Update user</h1>
    </div>
  );
};

export default UpdateUser;
