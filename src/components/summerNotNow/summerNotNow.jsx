import { format, differenceInMilliseconds } from "date-fns";
import ru from "date-fns/locale/ru";

import "../summerSection.css";
import "./summerNotNow.css";


export default function SummerNotNow({now}) {
    
    let isSummerThisYear = now.getMonth() < 6;
    let summerEndYear = isSummerThisYear ? now.getFullYear() - 1 : now.getFullYear();
    let summerStartYear = isSummerThisYear ? now.getFullYear() : now.getFullYear() + 1;
    let summerEnd = new Date(summerEndYear, 9 - 1, 1, 0, 0, 0);
    let summerStart = new Date(summerStartYear, 6 - 1, 1, 0, 0, 0);
    let notSummerTotalMs = summerStart - summerEnd;
    let notSummerPassedMs = now - summerEnd;
    let notSummerPassedPercent = (100 * notSummerPassedMs / notSummerTotalMs).toFixed(6);
    let notSummerLeftPercent = (100 - notSummerPassedPercent).toFixed(6);

    let currentSeason, currentSeasonStart, currentSeasonEnd;
    if ([8, 9, 10].includes(now.getMonth())) {
        currentSeason = 1;
        currentSeasonStart = new Date(now.getFullYear(), 9 - 1, 1, 0, 0, 0);
        currentSeasonEnd = new Date(now.getFullYear(), 12 - 1, 1, 0, 0, 0);
    } else if ([11, 0, 1].includes(now.getMonth())) {
        currentSeason = 2;
        currentSeasonStart = new Date(summerEndYear, 12 - 1, 1, 0, 0, 0);
        currentSeasonEnd = new Date(summerStartYear, 3 - 1, 1, 0, 0, 0);
    } else if ([2, 3, 4].includes(now.getMonth())) {
        currentSeason = 3;
        currentSeasonStart = new Date(now.getFullYear(), 3 - 1, 1, 0, 0, 0);
        currentSeasonEnd = new Date(now.getFullYear(), 6 - 1, 1, 0, 0, 0);
    }
    
    let currentSeasonTotalMs = currentSeasonEnd - currentSeasonStart;
    let currentSeasonPassedMs = now - currentSeasonStart;
    let currentSeasonPassedPercent = (100 * currentSeasonPassedMs / currentSeasonTotalMs).toFixed(6);

    let autumnMessage, winterMessage, springMessage, mainBarColor, autumnPercent, winterPercent, springPercent;
    switch (currentSeason) {
        case 1: {
            autumnMessage = currentSeasonPassedPercent + "% осени прошло";
            winterMessage = "Зима ещё не началась";
            springMessage = "Весна ещё не началась";
            autumnPercent = currentSeasonPassedPercent;
            winterPercent = 0;
            springPercent = 0;
            mainBarColor = "Orange";
            break;
        } case 2: {
            autumnMessage = "Осень уже позади";
            winterMessage = currentSeasonPassedPercent + "% зимы прошло";
            springMessage = "Весна ещё не началась";
            autumnPercent = 100;
            winterPercent = currentSeasonPassedPercent;
            springPercent = 0;
            mainBarColor = "Blue";
            break;
        } case 3: {
            autumnMessage = "Осень уже позади";
            winterMessage = "Зима уже позади";
            springMessage = currentSeasonPassedPercent + "% весны прошло";
            autumnPercent = 100;
            winterPercent = 100;
            springPercent = currentSeasonPassedPercent;
            mainBarColor = "Yellow";
            break;
        }
    }

    let toLength = (s, l) => "0".repeat(l - s.toString().length) + s.toString();

    let nowFormated = `${format(now, "d MMMM, y  HH:mm:ss", {locale: ru})}.${toLength(now.getMilliseconds(), 3)[0]}`;


    return (
        <div className="summerSection summerNotNow">
            <div className="headingSection">
                <div className="title textTitle">Ждём лето</div>
                <div className="subtitle textSecondary">Обратный отсчёт до лета онлайн</div>
            </div>
            <div className="barSection">
                <div className="text nowText">
                    <span>Сейчас {nowFormated}</span>
                </div>
                <div className="text datesText">
                    <span className="textSecondary">1 сентября {summerEndYear}</span>
                    <span className="now">Сейчас {nowFormated}</span>
                    <span className="textSecondary">1 июня {summerStartYear}</span>
                </div>
                <div className={`bar bar${mainBarColor}`}>
                    <div className="barLeft" style={{width: `${notSummerPassedPercent}%`}}></div>
                </div>
                <div className="text percentText">
                    <span>{notSummerPassedPercent}% нелетнего<br />периода прошло</span>
                    <span>{notSummerLeftPercent}% нелетнего<br />периода осталось</span>
                </div>
            </div>
            <div className="seasonsSection">
                <div className="barSection">
                    <div className="bar barOrange">
                        <div className="barLeft" style={{width: `${autumnPercent}%`}}></div>
                    </div>
                    <div className={`text${currentSeason == 1 ? "" : " textSecondary"}`}>{autumnMessage}</div>
                </div>
                <div className="barSection">
                    <div className="bar barBlue">
                        <div className="barLeft" style={{width: `${winterPercent}%`}}></div>
                    </div>
                    <div className={`text${currentSeason == 2 ? "" : " textSecondary"}`}>{winterMessage}</div>
                </div>
                <div className="barSection">
                    <div className="bar barYellow">
                        <div className="barLeft" style={{width: `${springPercent}%`}}></div>
                    </div>
                    <div className={`text${currentSeason == 3 ? "" : " textSecondary"}`}>{springMessage}</div>
                </div>
            </div>
            <div className="infoSection">
                <div className="card infoCard">
                    <div className="heading">С конца лета прошло:</div>
                    <div className="sep"></div>
                    <div className="values">
                        <span>Месяцев: {(differenceInMilliseconds(now, summerEnd) / 86400000 / 30).toFixed(7)}</span>
                        <span>Недель: {(differenceInMilliseconds(now, summerEnd) / 86400000 / 7).toFixed(7)}</span>
                        <span>Дней: {(differenceInMilliseconds(now, summerEnd) / 86400000).toFixed(6)}</span>
                        <span>Часов: {(differenceInMilliseconds(now, summerEnd) / 3600000).toFixed(4)}</span>
                        <span>Минут: {(differenceInMilliseconds(now, summerEnd) / 60000).toFixed(3)}</span>
                        <span>Секунд: {(differenceInMilliseconds(now, summerEnd) / 1000).toFixed(1)}</span>
                        <span>Миллисекунд: {differenceInMilliseconds(now, summerEnd).toString().slice(0, -2)  + "00"}</span>
                    </div>
                </div>
                <div className="card infoCard">
                    <div className="heading">До начала лета осталось:</div>
                    <div className="sep"></div>
                    <div className="values">
                        <span>Месяцев: {(differenceInMilliseconds(summerStart, now) / 86400000 / 30).toFixed(7)}</span>
                        <span>Недель: {(differenceInMilliseconds(summerStart, now) / 86400000 / 7).toFixed(7)}</span>
                        <span>Дней: {(differenceInMilliseconds(summerStart, now) / 86400000).toFixed(6)}</span>
                        <span>Часов: {(differenceInMilliseconds(summerStart, now) / 3600000).toFixed(4)}</span>
                        <span>Минут: {(differenceInMilliseconds(summerStart, now) / 60000).toFixed(3)}</span>
                        <span>Секунд: {(differenceInMilliseconds(summerStart, now) / 1000).toFixed(1)}</span>
                        <span>Миллисекунд: {differenceInMilliseconds(summerStart, now).toString().slice(0, -2)  + "00"}</span>
                    </div>
                </div>
            </div>
        </div>
    );

}
