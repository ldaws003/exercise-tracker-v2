"use client"

import { useEffect, useState } from "react";
import Loading from "./Loading";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CaloriesChart(){
    const [calData, setCalData] = useState<any>({labels: "", datasets: []});
    const [loaded, setLoaded] = useState<any>(false);

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

            let tempData: any = {
                labels: dummy_cal_data.dates,
                datasets: [{
                    label: "Calories",
                    data: dummy_cal_data.cal_data,
                    spanGaps: true,
                    backgroundColor: 'rgb(70, 222, 255)',
                    borderColor: 'rgb(70, 222, 255)',
                    tension: 0.3
                }]
            }

            setCalData(tempData);     
            setLoaded(true);
        };

        fetchData();

    }, []);

    const options: any = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'Calories Burned',
                    color: "#000000",
                    font: {
                        size: 24,          
                        weight: 'bold',
                        family: "sans-serif, 'Arial'"
                    }
                },
            },
    };
    
    return (
        <div className="w-1/3">
            {
                loaded ?
                <Line options={options} data={calData}/>
                :
                <Loading />
            }
        </div>
    );
}