import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';


// TODO: add pagination to data

// dummy data to use for now
let dummy_data: any = {
    cal_data: [300, 500, 200, 500, 10, 56, 327],
    dates: ["2026-05-23", "2026-05-24", "2026-05-26", "2026-05-27", "2026-05-28", "2026-05-29", "2026-05-30"],
    exercises: [
        {activity: "running", time: "300s", date: "2026-05-23", calories: "300"},
        {activity: "push ups", time: "200s", date: "2026-05-24", calories: "500"},
        {activity: "running", time: "300s", date: "2026-05-26", calories: "200"},
        {activity: "biking", time: "700s", date: "2026-05-27", calories: "500"},
        {activity: "running", time: "300s", date: "2026-05-28", calories: "10"},
        {activity: "biking", time: "300s", date: "2026-05-29", calories: "56"},
        {activity: "running", time: "300s", date: "2026-05-30", calories: "327"},
    ],
}

export default function Dashboard(){
    const [data, setData] = useState({});
    const [calData, setCalData] = useState([]);
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

    //"loading the data"
    useEffect(() => {
        setData(dummy_data);
    }, []);
    
    // "process data to be used in chartjs"
    useEffect(() => {
        let tempData = {
            labels: data.dates,
            datasets: [{
                label: "Calories",
                data: data.cal_data,
                spanGaps: true,
            }]
        }
        setCalData(tempData);         
    }, [data]);
    
    return (
    <div>
        {
            dummy_data.cal_data.length > 0  ?
            (
                <div>
                    <h2>Calories Burned!</h2>
                    <Line options={options} data={calData}/>
                </div>
            ) :
            (
                <div>
                    <h3>No records of burned calories.</h3>
                </div>
            )

        }
        <div>
            <h2>Calories Burned!</h2>
            <Line />
        </div>

    </div>
    )
}