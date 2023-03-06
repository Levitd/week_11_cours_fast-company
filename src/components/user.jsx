import React, { useState } from "react";
import api from "../api";
import Table from "./table";
import { UserCount } from "./usersCount";


const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const renderTable = Table(users, setUsers);

  let usersCount=users.length
  const renderPhrase =(usersCount) =UserCount(usersCount)

  return <>{renderPhrase} {renderTable}</>;
};


export default Users;
