import React from "react";
import { v4 as uuidv4 } from 'uuid';
import './PopUp.css';
import { useSelector } from "react-redux";

function PopUp() {
    const noticesData = useSelector((state) =>(state.notice.noticeData));

    const PopUpList = noticesData.map(notice => {
        return (
            <div
                className="pop-up__box"
                key={uuidv4()}
            >
                <div className="pop-up__title">{ notice.text }</div>
            </div>
        )
    })

    return (
        <div className="pop-up__wrapper">
            { PopUpList }
        </div>
    );
}

export default PopUp;