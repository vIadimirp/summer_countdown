import { format, differenceInMilliseconds } from "date-fns";
import ru from "date-fns/locale/ru";

import "../summerSection.css";
import "./summerNow.css";


export default function SummerNow({now}) {

    {/* {format(now, "HH:mm:ss dd.MM.y")} */}
    let summerStart = new Date(now.getFullYear(), 6 - 1, 1, 0, 0, 0);
    let summerEnd = new Date(now.getFullYear(), 9 - 1, 1, 0, 0, 0);
    let summerTotalMs = summerEnd - summerStart;
    let summerPassedMs = now - summerStart;
    let summerPassedPercent = (100 * summerPassedMs / summerTotalMs).toFixed(6);
    let summerLeftPercent = (100 - summerPassedPercent).toFixed(6);

    let toLength = (s, l) => "0".repeat(l - s.toString().length) + s.toString();

    let nowFormated = `${format(now, "d MMMM, y  HH:mm:ss", {locale: ru})}.${toLength(now.getMilliseconds(), 3)[0]}`;


    return (
        <div className="summerSection summerNow">
            {(now.getMonth() == 6 - 1 && now.getDate() == 1) ? 
                <div className="firework fireworkGreen"></div> : null
            }
            <div className="headingSection">
                <div className="title textTitle">Лето уже идёт</div>
                <div className="subtitle textSecondary">Не теряйте времени!</div>
            </div>
            <div className="barSection">
                <div className="text nowText">
                    <span>Сейчас {nowFormated}</span>
                </div>
                <div className="text datesText">
                    <span className="textSecondary">1 июня {now.getFullYear()}</span>
                    <span className="now">Сейчас {nowFormated}</span>
                    <span className="textSecondary">1 сентября {now.getFullYear()}</span>
                </div>
                <div className="bar barGreen">
                    <div className="barLeft" style={{width: `${summerPassedPercent}%`}}></div>
                </div>
                <div className="text percentText">
                    <span>{summerPassedPercent}% лета прошло</span>
                    <span>{summerLeftPercent}% лета осталось</span>
                </div>
            </div>
            <div className="infoSection">
                <div className="card infoCard">
                    <div className="heading">С начала лета прошло:</div>
                    <div className="sep"></div>
                    <div className="values">
                        <span>Месяцев: {(differenceInMilliseconds(now, summerStart) / 86400000 / 30).toFixed(7)}</span>
                        <span>Недель: {(differenceInMilliseconds(now, summerStart) / 86400000 / 7).toFixed(7)}</span>
                        <span>Дней: {(differenceInMilliseconds(now, summerStart) / 86400000).toFixed(6)}</span>
                        <span>Часов: {(differenceInMilliseconds(now, summerStart) / 3600000).toFixed(4)}</span>
                        <span>Минут: {(differenceInMilliseconds(now, summerStart) / 60000).toFixed(3)}</span>
                        <span>Секунд: {(differenceInMilliseconds(now, summerStart) / 1000).toFixed(1)}</span>
                        <span>Миллисекунд: {differenceInMilliseconds(now, summerStart).toString().slice(0, -2) + "00"}</span>
                    </div>
                </div>
                <div className="card infoCard">
                    <div className="heading">До конца лета осталось:</div>
                    <div className="sep"></div>
                    <div className="values">
                        <span>Месяцев: {(differenceInMilliseconds(summerEnd, now) / 86400000 / 30).toFixed(7)}</span>
                        <span>Недель: {(differenceInMilliseconds(summerEnd, now) / 86400000 / 7).toFixed(7)}</span>
                        <span>Дней: {(differenceInMilliseconds(summerEnd, now) / 86400000).toFixed(6)}</span>
                        <span>Часов: {(differenceInMilliseconds(summerEnd, now) / 3600000).toFixed(4)}</span>
                        <span>Минут: {(differenceInMilliseconds(summerEnd, now) / 60000).toFixed(3)}</span>
                        <span>Секунд: {(differenceInMilliseconds(summerEnd, now) / 1000).toFixed(1)}</span>
                        <span>Миллисекунд: {differenceInMilliseconds(summerEnd, now).toString().slice(0, -2) + "00"}</span>
                    </div>
                </div>
            </div>
        </div>
    );

}
