import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../hooks/useProfession";

const ProfessionCard = ({ value }) => {
    const { getProfession } = useProfessions();

    const proffessionName = getProfession(value);

    return (
        <>
            {proffessionName && (
                <div className="card mb-3">
                    <div className="card mb-3">
                        <div className="card-body d-flex flex-column justify-content-center text-center">
                            <h5 className="card-title">
                                <span>Profession</span>
                            </h5>

                            <h1 className="display-1">{proffessionName.name}</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

ProfessionCard.propTypes = {
    value: PropTypes.string
};

export default ProfessionCard;
