"use client"

import { useEffect, useState } from "react";
import Loading from "./Loading";
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
    const [activityData, setActivityData] = useState<any>({labels: "", datasets: []});
    const [loaded, setLoaded] = useState<any>(false);

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

    const options: any = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Exercise Activities',
                color: "#000000",
                font: {
                    size: 24,          
                    weight: 'bold',
                    family: "sans-serif, 'Arial'"
                }
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

            let tempData: any = {
                labels: ActivityCategories,
                datasets: [
                    {
                        label: "Calories Burned",
                        data: [
                            dummy_activity_data.running_data.reduce( (acc: number, currObject: any) => {
                                return acc + Number(currObject.calories)
                            }, 0),
                            dummy_activity_data.weights_data.reduce( (acc: number, currObject: any) => {
                                return acc + Number(currObject.calories)
                            }, 0),
                            dummy_activity_data.biking_data.reduce( (acc: number, currObject: any) => {
                                return acc + Number(currObject.calories)
                            }, 0)
                        ],
                        backgroundColor: 'rgb(255, 99, 132)'
                    }
                ]
            };

            setActivityData(tempData);
            setLoaded(true);
        };

        fetchData();
    }, []);

    
    return (
        <div className="w-1/3">
            {
                loaded ?
                <Bar options={options} data={activityData} /> 
                :
                <Loading />
            }
        </div>
    )
}