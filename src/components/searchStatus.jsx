import React from "react";

export const SearchStatus = (props) => {//number
    let answer, styleAnswer, number;
    number = props.number;
    if (number === 0) {
        answer = `Никто с тобой не тусанет`
        styleAnswer = `danger`
    } else {
        styleAnswer = `primary`
        let piple;
        let action;
        const ending = 'с тобой сегодня'
        const lastOne = Number(number.toString().slice(-1));
        if (number === 1 || (number > 20 && number % 10 === 1)) {
            piple = `человек`
            action = `тусанёт`
        } else if ([2, 3, 4].indexOf(lastOne) >= 0 && !(number > 4 && number < 15)) { //|| (number>20 && (number%10===2 || number%10===3 || number%10===4))
            piple = `человека`
            action = `тусанут`
        } else {
            piple = `человек`
            action = `тусанёт`
        }
        answer = `${number} ${piple} ${action} ${ending}`
    }

    return <><h2><div className={'badge bg-' + styleAnswer}>{answer}</div></h2></>
}
