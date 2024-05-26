import { useState, useEffect } from "react";
import SummerNow from "../src/components/summerNow/summerNow";
import SummerNotNow from "./components/summerNotNow/summerNotNow";

import './App.css'


export default function App() {

    let [now, setNow] = useState(new Date());


    useEffect(() => {setInterval(() => setNow(new Date()), 10)}, []);


    // let [startDate] = useState(new Date());
    // useEffect(() => {
    //     setInterval(() => {
    //         let currentDate = new Date();
    //         let startFrom = new Date(2024, 4, 31, 23, 59, 40);  // new Date(2024, 4, 31, 23, 59, 40)
    //         let speed = 1;  // 2000000
    //         setNow(new Date((currentDate.valueOf() - startDate.valueOf()) * speed + startFrom.valueOf()));
    //     }, 10)
    // }, []);


    return (
        <>{[6, 7, 8].includes(now.getMonth() + 1) ? 
            <SummerNow now={now} />
            :
            <SummerNotNow now={now} />
        }</>
    )

}
