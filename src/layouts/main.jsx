import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };

    return (
        <div className="conteiner mt-5 ms-2">
            <h1>Main Page</h1>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>Status:{status}</li>
                <li>Progress:{progress}%</li>
                {error && <li>Error:{error}</li>}
            </ul>
            <button onClick={handleClick} className="btn btn-primary">Инициализировать</button>
        </div>
    );
};

export default Main;
