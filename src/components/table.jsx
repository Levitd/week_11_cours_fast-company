import React from "react";
import { headColum as headColumArray} from "../api/columsTable";

const Table = (usersArray, setUsers ) => {
  
  const headTable = () => headColumArray.map((el,idx) =><th scope="col" key={idx}>{el}</th>);
  
  const badges =(qlt) =>qlt.map((elq)=><span className={"badge m-2 bg-"+elq.color} key={elq._id}>{elq.name}</span>)

  const handleDeleteUser = (idUser)=>{
    setUsers((prevState) => prevState.filter((el) => el._id !== idUser));
    console.log(idUser);
  }
  
  const rowTable =(elRow) =>{
    return (
    <>
      <td key={"name_"+elRow._id}>
        {elRow.name}
      </td>
      <td key={"qualities_"+elRow._id}>
        {badges(elRow.qualities)}
      </td>
      <td key={"profession_"+elRow._id}>
        {elRow.profession.name}
      </td>
      <td key={"completedMeetings_"+elRow._id}>
        {elRow.completedMeetings}
      </td>
      <td key={"rate_"+elRow._id}>
        {elRow.rate}
      </td>
      <td key={"button_"+elRow._id}>
        <button className="btn btn-danger btn-sm" onClick={(e) => handleDeleteUser(elRow._id)}>delete</button>
      </td>
    </>
  )
}

const rowsTable = (() => {
  return (
    <>
      {
        usersArray.map((el, idx)=>{return <tr key={idx}>{rowTable(el)}</tr>})
      }
    </>
  )
})
return (
    <>
    {usersArray.length>0 && (
      <table className="table">
        <thead><tr>{headTable()}</tr></thead>
        <tbody>{rowsTable()}</tbody>
      </table>
      )
    }
    </>
  );
};


export default Table;
