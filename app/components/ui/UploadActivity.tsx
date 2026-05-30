import { useEffect, useState } from "react";


//TODO: set the date to international standard

interface ActivityForm {
    activity: string,
    duration: number,
    calories: number,
    date: Date
};

export default function UploadActivity(){
    const [formData, setFormData] = useState<ActivityForm>({
        activity: "",
        duration: 0,
        calories: 0,
        date: new Date()
    });

    const ValidActivities: string[] = ["running", "weights", "walking", "biking"]; // valid values for activity

    function handleSubmit(event: React.SyntheticEvent){
        event.preventDefault();

        const target = event.target as typeof event.target & {
            activity: { value: string },
            duration: { value: number },
            calories: { value: number },
            date: { value: Date }
        }

        const activity = target.activity.value;
        const duration = target.duration.value;
        const calories = target.calories.value;
        const date = target.date.value;

        // TODO: use API call to upload data
        console.log(target);
    };

    function onActivityChange(event: React.ChangeEvent<HTMLSelectElement>){
        setFormData( (prevData: ActivityForm) => ({
            ...prevData,
            activity: event.target.value
        }));
    };

    // TODO: add form validation
    function ValidateForm(formData: ActivityForm): boolean {
                
        return true;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ActivityInput">Activity: </label>
                <select id="ActivityInput" onChange={onActivityChange} name="activity">
                    <option value="running">Running</option>
                    <option value="weights">Weights</option>
                    <option value="walking">Walking</option>
                    <option value="biking">Biking</option>
                </select>

                <label htmlFor="DurationInput">Duration: </label>
                <input id="DurationInput" name="duration" type="number" />

                <label htmlFor="CaloriesInput">Calories: </label>
                <input id="CaloriesInput" name="Calories" type="number" />

                <label htmlFor="DateInput">Date: </label>
                <input id="DateInput" name="date" type="date" />

                <input type="submit" value="Submit Activity" />
            </form>

        </div>
    )
}