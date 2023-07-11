import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";

const UserEditPage = () => {
    const params = useParams();
    const { id } = params;
    const history = useHistory();

    const { currentUser: user } = useAuth();
    if (user._id !== id) {
        history.push(`/user/${user._id}/edit`);
    }
    const [allLoading, setAllLoading] = useState(false);
    const [data, setData] = useState({});

    const profArray = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const quialArray = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const [errors, setErrors] = useState({});

    const professions = profArray.map((p) => ({ value: p._id, label: p.name }));
    const qualities = quialArray.map((q) => ({ value: q._id, label: q.name }));

    useEffect(() => {
        let isLabel = false;
        setData(
            {
                ...user,
                qualities: user.qualities.map((qualiti) => ({
                    label: (qualities.find((q) => {
                        if (q.value === qualiti) if (q.label) isLabel = true;
                        return q.value === qualiti;
                    }))?.label,
                    value: qualiti
                }))
            });
        setAllLoading(isLabel);
    }, [qualitiesLoading, professionsLoading]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: { message: "Имя должно быть не менее 2 символов", value: 2 }
        }
    };

    useEffect(() => { validate(); }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const { apdateUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;
        const quialArray = [];
        data.qualities.forEach(el => {
            quialArray.push(el.value);
        });

        const newData = {
            ...data,
            qualities: quialArray,
            profession: data.profession
        };

        await apdateUser(newData);
        history.push("/user/" + id);
    };

    if (user && allLoading) {
        return (
            <div className="conteiner shadow">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                options={professions}
                                onChange={handleChange}
                                defaultOption="Выберите..."
                                error={errors.profession}
                                value={data.profession}
                                label="Выберите вашу профеcсию"
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: "Мужской", value: "male" },
                                    { name: "Женский", value: "female" }
                                ]}
                                value={data.sex}
                                onChange={handleChange}
                                name="sex"
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите Ваши качества"
                                defaultValue={data.qualities}
                            />
                            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">Обновить</button>
                        </form>
                    </div>
                </div>
            </div >
        );
    } else {
        return <div className="badge bg-info">Загрузка....</div>;
    }
};

export default UserEditPage;
