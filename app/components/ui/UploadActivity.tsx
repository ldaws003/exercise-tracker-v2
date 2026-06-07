"use client"

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel, FieldError } from "@/components/ui/field";


// TODO: convert form duration from minutes to seconds when sending to backend

interface ActivityForm {
    activity: string,
    duration: number,
    calories: number,
    date: Date
};

export default function UploadActivity(){
    const [formData, setFormData] = useState<ActivityForm>({
        activity: "",
        duration: 0, // in minutes
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
            date: { value: string }
        }

        // TODO: add better form validation
        if(!ValidateForm(formData)){
            console.log("Error with Form");
            return;
        }

        // TODO: use API call to upload data
        console.log(formData);
        setFormData({
            activity: "",
            duration: 0,
            calories: 0,
            date: new Date()
        });
    };

    function onActivityChange(value: string){
        setFormData( ( prevData: ActivityForm ) => ({
            ...prevData,
            activity: value
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
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="text-white hover:bg-emerald-900 bg-emerald-700" variant="outline">Upload Exercise</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Upload Exercise Activity</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">

                        <form onSubmit={handleSubmit}>
                            <Field>
                                <FieldLabel>Exercise Activity: </FieldLabel>
                                <Select value={formData.activity} onValueChange={onActivityChange} name="activity">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Activity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="running">Running</SelectItem>
                                            <SelectItem value="weights">Weights</SelectItem>
                                            <SelectItem value="walking">Walking</SelectItem>
                                            <SelectItem value="biking">Biking</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="DurationInput">Duration (in minutes): </FieldLabel>
                                <Input id="DurationInput" name="duration" type="number" onChange={onChangeDuration} value={formData.duration} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="CaloriesInput">Calories: </FieldLabel>
                                <Input id="CaloriesInput" name="Calories" type="number" onChange={onChangeCalories} value={formData.calories}/>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="DateInput">Date: </FieldLabel>
                                <Input id="DateInput" name="date" type="date" onChange={onDateChange} value={formData.date.toISOString().split("T")[0]}/>
                            </Field>

                            <Input className="my-3" type="submit" value="Submit Activity" />
                        </form>
                     
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}