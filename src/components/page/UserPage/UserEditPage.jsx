import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
import { validator } from "../../../api/utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditPage = () => {
    const params = useParams();
    const { id } = params;
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const [user, setUser] = useState(0);
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data);
            setData((prevState) => ({
                ...prevState,
                email: data.email,
                name: data.name,
                sex: data.sex,
                qualities: data.qualities.map((qualiti) => ({
                    label: qualiti.name,
                    value: qualiti._id
                })),
                profession: data.profession._id
            }));
        });
        api.professions.fetchAll().then((data) => {
            setProfession(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);

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
        // profession: {
        //     isRequired: { message: "Обязательно выберите вашу профессию" }
        // }
    };

    useEffect(() => { validate(); }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;
        // console.log(data);
        // найдем цвет и из массива в объект qualities
        const quialArray = [];
        data.qualities.forEach(el => {
            // console.log(el);
            // console.log(qualities);
            const oneQual = Object.values(qualities).filter((qlts) => qlts._id === el.value);
            quialArray.push({ name: el.label, _id: el.value, color: oneQual[0].color });
        });

        const profArr = Object.values(professions).filter((prof) => prof._id === data.profession);
        const profObj = { _id: profArr[0]._id, name: profArr[0].name };
        // console.log(quialArray, profArr);
        const mewData = {
            ...data,
            qualities: quialArray,
            profession: profObj
        };
        // console.log(mewData);
        api.users.update(id, mewData);
        history.push("/user/" + id);
    };
    if (user && professions && qualities) {
        return (
            <div className="conteiner shadow">
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
