"use client"

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

        // TODO: add better form validation
        if(!ValidateForm(formData)){
            console.log("Error with Form");
            return;
        }

        // TODO: use API call to upload data
        console.log(target);
    };

    function onActivityChange(event: React.ChangeEvent<HTMLSelectElement>){
        setFormData( ( prevData: ActivityForm ) => ({
            ...prevData,
            activity: event.target.value
        }));
    };

    function onChangeDuration(event: React.ChangeEvent<HTMLInputElement>){
        setFormData( ( prevData: ActivityForm ) => ({
            ...prevData,
            duration: Number(event.target.value)
        }));
    };

    function onChangeCalories(event: React.ChangeEvent<HTMLInputElement>){
        setFormData( ( prevData: ActivityForm ) => ({
            ...prevData,
            calories: Number(event.target.value)
        }))
    }

    function onDateChange(event: React.ChangeEvent<HTMLInputElement>){
        setFormData( ( prevData: ActivityForm ) => ({
            ...prevData,
            date: new Date(event.target.value)
        }));
    };

    // TODO: add proper form validation (warning for each input, unique error message for each)
    function ValidateForm(formData: ActivityForm): boolean {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const cleanTargetDate = new Date(formData.date);
        cleanTargetDate.setHours(0, 0, 0, 0);

        if(!ValidActivities.includes(formData.activity)) return false;
        if(formData.duration <= 0 || Number.isNaN(formData.duration)) return false;
        if(formData.calories <= 0 || Number.isNaN(formData.calories)) return false;
        if(!(cleanTargetDate <= today)) return false;
                
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
                <input id="DurationInput" name="duration" type="number" onChange={onChangeDuration}/>

                <label htmlFor="CaloriesInput">Calories: </label>
                <input id="CaloriesInput" name="Calories" type="number" onChange={onChangeCalories}/>

                <label htmlFor="DateInput">Date: </label>
                <input id="DateInput" name="date" type="date" onChange={onDateChange} />

                <input type="submit" value="Submit Activity" />
            </form>

        </div>
    )
}