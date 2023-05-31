import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualities } = useQuality();
    const quialArray = getQualities(qualities);
    return <>
        {quialArray.map((qual) => {
            return (!isLoading ? <Qualitie key={qual._id} {...qual} /> : "Loading...");
        })}
    </>;
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
