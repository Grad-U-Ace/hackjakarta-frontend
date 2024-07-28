"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "./ui/button";

type FollowUpProps = {
  type: string;
};

export default function FollowUp({ type }: FollowUpProps) {
  switch (type) {
    case "price":
      return (
        <>
          What&apos;s the most you would like to spend?
          <form action="" className="flex flex-col gap-4">
            <Slider
              defaultValue={[55000]}
              min={10000}
              max={100000}
              step={5000}
              className="py-4"
            />
            <Button type="submit"></Button>
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
