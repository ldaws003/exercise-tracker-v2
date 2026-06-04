"use client"

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ActivitiesChart(){
    const [activityData, setActivityData] = useState<any>({labels: null, datasets: []});

    let dummy_activity_data: any = {
        running_data: [
            {activity: "running", duration: "300s", date: "2026-05-23", calories: "300"},
            {activity: "running", duration: "300s", date: "2026-05-26", calories: "200"},
            {activity: "running", duration: "300s", date: "2026-05-28", calories: "10"},
            {activity: "running", duration: "300s", date: "2026-05-30", calories: "327"},
        ],
        weights_data: [
            {activity: "weights", duration: "200s", date: "2026-05-24", calories: "500"}
        ],
        biking_data: [
            {activity: "biking", duration: "700s", date: "2026-05-27", calories: "500"},
            {activity: "biking", duration: "300s", date: "2026-05-29", calories: "56"},
        ],
    };

    const ActivityCategories: any = [
        "running",
        "weights",
        "biking"
    ];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Exercise Activities',
            },
        },
    };

    // TODO: properly format to have include activity data for a barchart
    useEffect( () => {
        const fetchData = async () => {
            function sleep(ms: number){
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            // waits for 1000ms
            await sleep(1000);

            return dummy_activity_data;
        };

        const result: any = fetchData().catch(console.error);


        // show time and show calories burned
        
        let tempData: any = {
            labels: result.dates,
            datasets: [
                {
                    label: "Running",
                    data: result.running_data
                },
                {
                    label: "Weights",
                    data: result.weights_data
                },
                {
                    label: "Biking",
                    data: result.biking_data
                },
            ]
        };

        setActivityData(tempData);
    }, []);

    
    return (
        <div>
            <Bar options={options} data={activityData} />
        </div>
    )
}