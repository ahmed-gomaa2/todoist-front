import React, {useEffect, useState} from 'react';
import './Ucoming.css';
import {Button} from "@mui/material";
import Header from "./Header/Header";
import Body from "../UI/Body/Body";

const Upcoming = props => {
    const [daysInYear, setDaysInYear] = useState([]);
    const [currentDay, setCurrentDa] = useState(new Date());

    useEffect(() => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;
        const currentDayInWeek = new Date().getDay();
        let currentDay;
        if(currentDayInWeek === 0) {
            currentDay = new Date().getDate();
        }else {
            currentDay = new Date().getDate() - currentDayInWeek;
        }

        const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

        let daysInYear = [];
        for(let i = currentMonth; i <= 12; i++) {
            const daysInMonth = getDaysInMonth(currentYear, currentMonth);
            if (i === currentMonth) {
                for (let z = currentDay; z <= daysInMonth; z++) {
                    let day = new Date(currentYear, i, z);
                    daysInYear.push(day);
                }
            }else {
                for(let y = 1; y <= daysInMonth; y++) {
                    let day = new Date(currentYear, i, y);
                    daysInYear.push(day);
                }
            }
        }
        setDaysInYear(daysInYear);
    }, []);

    const months = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    }
    return (
        <div className={'Upcoming'}>
            <Body header={getDaysInMonth(currentDay?.getMonth())} />
        </div>
    );
};

export default Upcoming;