import CaloriesChart from './ui/CaloriesChart';
import ActivitiesChart from './ui/ActivitiesChart';
import UploadActivity from './ui/UploadActivity';

// TODO: add refetching data when new data is uploaded

export default function Dashboard(){
    
    return (
    <div className="bg-slate-100 text-black flex flex-col flex-nowrap justify-around w-full my-5 px-1">
        
        <div className="self-center flex sm:flex-nowrap flex-col sm:flex-row items-center justify-around w-full">
            <CaloriesChart />
            <ActivitiesChart />
        </div>

        {/*TODO add form to add an activity*/}
        <UploadActivity />

    </div>
    )
}