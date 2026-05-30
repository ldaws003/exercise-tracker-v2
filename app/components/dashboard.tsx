import { Line } from 'react-chartjs-2';
import { useState, useEffect, Suspense } from 'react';
import CaloriesChart from './ui/CaloriesChart';
import Loading from './ui/Loading';
import UploadActivity from './ui/UploadActivity';


// TODO: add pagination to data

// dummy data to use for now, replace with api calls later
let dummy_exercise_data: any = {
    data: [
        {activity: "running", duration: "300s", date: "2026-05-23", calories: "300"},
        {activity: "push ups", duration: "200s", date: "2026-05-24", calories: "500"},
        {activity: "running", duration: "300s", date: "2026-05-26", calories: "200"},
        {activity: "biking", duration: "700s", date: "2026-05-27", calories: "500"},
        {activity: "running", duration: "300s", date: "2026-05-28", calories: "10"},
        {activity: "biking", duration: "300s", date: "2026-05-29", calories: "56"},
        {activity: "running", duration: "300s", date: "2026-05-30", calories: "327"},
    ],
};

export default function Dashboard(){
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //"loading the data"
    useEffect(() => {
        setData(dummy_exercise_data);
        setIsLoading(false);
    }, []);
    
    return (
    <div>
        <Suspense fallback={<Loading/>}>
            <CaloriesChart />
        </Suspense>

        {/*TODO add activities bar chart*/}
        <Suspense fallback={<Loading/>}>
            <div>Hello World</div>
        </Suspense>

        {/*TODO add form to add an activity*/}
        <UploadActivity />

    </div>
    )
}