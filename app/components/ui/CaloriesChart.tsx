"use client"

import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';

export default function CaloriesChart(){
    const [calData, setCalData] = useState({labels: [], datasets: []});

    // Dummy data, remove and replace with actual api call once set up
    const dummy_cal_data: any = {
        cal_data: [300, 500, 200, 500, 10, 56, 327],
        dates: ["2026-05-23", "2026-05-24", "2026-05-26", "2026-05-27", "2026-05-28", "2026-05-29", "2026-05-30"]
    };

    useEffect(() => {
        const fetchData = async () => {
            function sleep(ms: number){
                return new Promise(resolve => setTimeout(resolve, ms));
            }


            // waits for 1000ms
            await sleep(1000);
            const dummy_cal_data: any = {
                cal_data: [300, 500, 200, 500, 10, 56, 327],
                dates: ["2026-05-23", "2026-05-24", "2026-05-26", "2026-05-27", "2026-05-28", "2026-05-29", "2026-05-30"]
            };
            return dummy_cal_data;
        };

        const result: any = fetchData().catch(console.error);

        
        let tempData: any = {
            labels: result.dates,
            datasets: [{
                label: "Calories",
                data: result.cal_data,
                spanGaps: true,
            }]
        }

        setCalData(tempData);      
    }, []);

    const options = {
            responsive: true,
            plugins: {
                legend: {
                position: 'top' as const,
                },
                title: {
                display: true,
                text: 'Calories Burned',
                },
            },
    };
    
    return (
        <div>
            <h2>Calories Burned!</h2>
            <Line options={options} data={calData}/>
        </div>
    );
}