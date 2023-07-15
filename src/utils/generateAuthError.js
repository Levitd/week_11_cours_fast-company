/* eslint-disable */
// eslint ругается на кол-во отступов...

export function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким email не найден";
        case "INVALID_PASSWORD":
            return "Пароль введен не правильно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже зарегистрирован";
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
            return "Слишком много попыток входа, попробуйте позже...";
        default:
            return "Ошибка входа, попробуйте позже...";
    }
}
