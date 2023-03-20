import React from "react";

const BookMark = (status) => {
    return <i className={"bi-bookmark" + (status ? "-star-fill" : "")}></i>;
};

export default BookMark;
