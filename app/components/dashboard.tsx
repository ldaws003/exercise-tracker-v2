
import { Suspense } from 'react';
import CaloriesChart from './ui/CaloriesChart';
import ActivitiesChart from './ui/ActivitiesChart';
import Loading from './ui/Loading';
import UploadActivity from './ui/UploadActivity';

// TODO: add refetching data when new data is uploaded

export default function Dashboard(){
    
    return (
    <div>

        <Suspense fallback={<Loading/>}>
            <CaloriesChart />
        </Suspense>

        <Suspense fallback={<Loading/>}>
            <ActivitiesChart />
        </Suspense>

        {/*TODO add form to add an activity*/}
        <UploadActivity />

    </div>
    )
}