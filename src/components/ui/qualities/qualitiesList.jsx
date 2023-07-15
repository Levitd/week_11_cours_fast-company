import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQualitiesByIds, getQualitiesLoadingStatus } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    // const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));

    // useEffect(() => {
    //     dispatch(loadQualitiesList());
    // }, []);
    if (isLoading) return "Loading...";

    return <>
        {qualitiesList.map((qual) => {
            return (!isLoading ? <Qualitie key={qual._id} {...qual} /> : "Loading...");
        })}
    </>;
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
