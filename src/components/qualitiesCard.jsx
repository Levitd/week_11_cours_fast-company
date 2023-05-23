import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./ui/qualities/qualitiesList";

const QualitiesCard = ({ data }) => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h5 className="card-title">
                        <span>Qualities</span>
                    </h5>
                    <p className="card-text">
                        <QualitiesList qualities={data} />
                    </p>
                </div>
            </div>
            {/* <h4>Встретился, раз: {user.completedMeetings}</h4> */}
        </>
    );
};

QualitiesCard.propTypes = {
    data: PropTypes.array
};

export default QualitiesCard;
