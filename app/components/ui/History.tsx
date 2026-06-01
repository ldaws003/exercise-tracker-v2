import { useEffect, useState } from "react";


//TODO: show the full raw history of exercise, and allow users to delete, have pagination
export default function History(){
    const [data, setData] = useState([]);
    const [showData, setShowData] = useState([]);

     let dummy_activity_data: any = {
        data: [
            {activity: "running", duration: "300s", date: "2026-05-23", calories: "300"},
            {activity: "running", duration: "300s", date: "2026-05-26", calories: "200"},
            {activity: "running", duration: "300s", date: "2026-05-28", calories: "10"},
            {activity: "running", duration: "300s", date: "2026-05-30", calories: "327"},
            {activity: "weights", duration: "200s", date: "2026-05-24", calories: "500"},
            {activity: "biking", duration: "700s", date: "2026-05-27", calories: "500"},
            {activity: "biking", duration: "300s", date: "2026-05-29", calories: "56"},
        ]
    };

    //TODO: sort by date
    function SortByDate(history_data: any[]){
        return history_data.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    function Filter(history_data: any[], property: any, condition: any){
        return history_data.filter( (obj) => obj[property] == condition);      
    }

    // Add error handling
    function DateRange(history_data: any[], start_date: any, end_date: any){
        return history_data.filter( (obj) => {
            let time = new Date(obj.date).getTime();
            return (new Date(start_date).getTime() <= time) && (time <= new Date(end_date).getTime())
        });
    }

    useEffect( () => {d
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
        
        setData(result.data);
    }, []);


    return (
        <div>
            {
                data.map((ele: any, i: number) => {
                    return (
                        <div key={`history_{i}`}>
                            <p>{ele.activity}</p>
                            <p>{ele.date}</p>
                            <p>{ele.duration}</p>
                            <p>{ele.calories}</p>
                        </div>
                    )
                });
            }
        </div>
    )
}
