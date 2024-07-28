"use client";

import React, { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { Button } from "./ui/button";
import { sendMessage } from "@/app/actions";

type FollowUpProps = {
  type: string;
};


export default function FollowUp({ type }: FollowUpProps) {
  const [sliderValue, setSliderValue] = useState<number>(55000);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  const handleSubmit = (formData: FormData) => {
    // Here you can handle the form submission
    // The slider value is already included in the formData
    const price = formData.get("price");
    console.log("Form submitted with value:", price);
    //sendmessage with 
  };

  switch (type) {
    case "price":
      return (
        <>
          What&apos;s the most you would like to spend?
          <form action={handleSubmit} className="flex flex-col gap-4">
            <Slider
              value={[sliderValue]}
              onValueChange={handleSliderChange}
              min={10000}
              max={100000}
              step={5000}
              className="py-4"
              name="price"
            />
            <Button type="submit">Rp{(sliderValue / 1000).toFixed(3)}</Button>
          </form>
        </>
      );
    case "rating":
      // Code for handling rating follow-up
      break;
    case "distance":
      // Code for handling distance follow-up
      break;
    case "category":
      // Code for handling category follow-up
      break;
    default:
      return type;
  }
}
