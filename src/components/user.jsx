import React from "react";
import { headColum as headColumArray } from "../api/columsTable";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const Users = (props) => {

  const headTable = () => headColumArray.map((el, idx) => <th scope="col" key={idx}>{el}</th>);

  const qualities = (qlt) => qlt.map((elq) => Qualitie(elq));

  const rowTable = (elRow) => {
    return (
      <>
        <td key={"name_" + elRow._id}>
          {elRow.name}
        </td>
        <td key={"qualities_" + elRow._id}>
          {qualities(elRow.qualities)}
        </td>
        <td key={"profession_" + elRow._id}>
          {elRow.profession.name}
        </td>
        <td key={"completedMeetings_" + elRow._id}>
          {elRow.completedMeetings}
        </td>
        <td key={"rate_" + elRow._id}>
          {elRow.rate}
        </td>
        <td key={"bookmark_" + elRow._id}>
          <button className="btn btn-sm" onClick={(e) => props.OnBookMark(elRow._id)}>{BookMark(elRow.bookmark)}</button>
        </td>
        <td key={"button_" + elRow._id}>
          <button className="btn btn-danger btn-sm" onClick={(e) => props.OnDeleteUser(elRow._id)}>delete</button>
        </td>
      </>
    )
  }

  const rowsTable = (() => {
    return (
      <>
        {
          props.usersArray.map((el, idx) => { return <tr key={idx}>{rowTable(el)}</tr> })
        }
      </>
    )
  })
  return (
    <>
      {props.usersArray.length > 0 && (
        <table className="table">
          <thead><tr>{headTable()}</tr></thead>
          <tbody>{rowsTable()}</tbody>
        </table>
      )
      }
    </>
  );
};


export default Users;
