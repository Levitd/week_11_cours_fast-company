import React from "react";

const Qualitie = (qual) => {
    return <span className={"badge m-2 bg-" + qual.color} key={qual._id}>{qual.name}</span>
};

export default Qualitie;