
import { Suspense } from 'react';
import CaloriesChart from './ui/CaloriesChart';
import ActivitiesChart from './ui/ActivitiesChart';
import Loading from './ui/Loading';
import UploadActivity from './ui/UploadActivity';

// TODO: add refetching data when new data is uploaded

export default function Dashboard(){
    
    return (
    <div className="bg-slate-100 text-black flex flex-nowrap sm:flex-wrap justify-around w-full">
        
        <div className="self-center flex flex-nowrap sm:flex-wrap items-center justify-around w-full">
            <CaloriesChart />
            <ActivitiesChart />
        </div>

        {/*TODO add form to add an activity*/}
        <UploadActivity />

    </div>
    )
}