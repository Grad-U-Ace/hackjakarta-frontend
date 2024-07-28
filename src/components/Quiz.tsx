"use client";

import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

export default function Quiz() {
  const form = useForm({
    defaultValues: {
      distanceSlider: [400],
      priceSlider: [50000],
      ratingSlider: [3],
    },
  });
  const [payload, setPayload] = useState({
    restaurant_category: "",
    restaurant_max_distance: 0,
    max_price: 0,
    restaurant_min_rating: 0,
  });
  const [slide, setSlide] = useState(1);

  useEffect(() => {
    if (slide === 5) {
      const fetchData = async () => {
        try {
            try {
            const response = await fetch("http://localhost:8000/api/menus", {
              method: "GET",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
            const data = await response.json();
            console.log(data);
            } catch (error) {
            console.error(error);
            }
        } catch (error) {
          // Handle the error here
          console.error(error);
        }
      };

      fetchData();
    }
  }, [payload]);

  function onSubmitCategories(data) {
    setPayload((prev) => {
      return { ...prev, restaurant_category: data.radioOption };
    });
    setSlide((prevSlide) => prevSlide + 1);
  }

  function onSubmitDistance(data) {
    console.log(data.distanceSlider[0]);
    setPayload((prev) => {
      return { ...prev, restaurant_max_distance: data.distanceSlider[0] };
    });
    setSlide((prevSlide) => prevSlide + 1);
  }

  function onSubmitPrice(data) {
    console.log(data.priceSlider[0]);
    setPayload((prev) => {
      return { ...prev, max_price: data.priceSlider[0] };
    });
    setSlide((prevSlide) => prevSlide + 1);
  }

  function onSubmitRating(data) {
    console.log(data.ratingSlider[0]);
    setPayload((prev) => {
      return { ...prev, restaurant_min_rating: data.ratingSlider[0] };
    });
    setSlide((prevSlide) => prevSlide + 1);
  }

  return (
    <div className="h-full w-full">
      {slide === 1 && (
        <div className="flex h-full w-full flex-col">
          <h2 className="text-center text-xl font-bold">Question 1</h2>
          <p className="text-center text-lg font-semibold">
            What category of food are you in the mood for?
          </p>
          <div className="flex w-full grow flex-col items-center justify-center">
            <Form {...form}>
              <form
                className="flex flex-col items-center justify-center"
                onSubmit={form.handleSubmit(onSubmitCategories)}
              >
                <FormField
                  control={form.control}
                  name="radioOption"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="indonesian" id="r1" />
                          <Label htmlFor="r1">Indonesian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="korean" id="r2" />
                          <Label htmlFor="r2">Korean</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="japanese" id="r3" />
                          <Label htmlFor="r3">Japanese</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="chinese" id="r3" />
                          <Label htmlFor="r3">Chinese</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="indian" id="r3" />
                          <Label htmlFor="r3">Indian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="western" id="r3" />
                          <Label htmlFor="r3">Western</Label>
                        </div>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
                <button className="mt-4" type="submit">
                  Next
                </button>
              </form>
            </Form>
          </div>
        </div>
      )}
      {slide === 2 && (
        <div className="flex h-full w-full flex-col justify-start">
          <h2 className="text-center text-xl font-bold">Question 2</h2>
          <p className="text-center text-lg font-semibold">
            What's the maximum distance your food can be from you?
          </p>
          <Form {...form}>
            <form
              className="flex h-full grow flex-col"
              onSubmit={form.handleSubmit(onSubmitDistance)}
            >
              <FormField
                control={form.control}
                name="distanceSlider"
                render={({ field }) => (
                  <FormItem>
                    <Slider
                      className="w-[80%]"
                      defaultValue={field.value}
                      max={10000}
                      step={10}
                      onValueChange={field.onChange}
                    />
                    <p className="mt-2 text-center">
                      Current value: {field.value[0]}
                    </p>
                  </FormItem>
                )}
              />
              <button className="drop-shadows-2xl bg-slate-300" type="submit">
                Submit
              </button>
            </form>
          </Form>
        </div>
      )}
      {slide === 3 && (
        <div className="flex h-full w-full flex-col justify-start">
          <h2 className="text-center text-xl font-bold">Question 3</h2>
          <p className="text-center text-lg font-semibold">
            What's your maximum budget for this meal?
          </p>
          <Form {...form}>
            <form
              className="flex h-full grow flex-col"
              onSubmit={form.handleSubmit(onSubmitPrice)}
            >
              <FormField
                control={form.control}
                name="priceSlider"
                render={({ field }) => (
                  <FormItem>
                    <Slider
                      className="w-[80%]"
                      defaultValue={field.value}
                      max={500000}
                      step={1000}
                      onValueChange={field.onChange}
                    />
                    <p className="mt-2 text-center">
                      Current value: {field.value[0]}
                    </p>
                  </FormItem>
                )}
              />
              <button className="drop-shadows-2xl bg-slate-300" type="submit">
                Submit
              </button>
            </form>
          </Form>
        </div>
      )}
      {slide === 4 && (
        <div className="flex h-full w-full flex-col justify-start">
          <h2 className="text-center text-xl font-bold">Question 4</h2>
          <p className="text-center text-lg font-semibold">
            What's the minimum rating you expect from the restaurant?
          </p>
          <Form {...form}>
            <form
              className="flex h-full grow flex-col"
              onSubmit={form.handleSubmit(onSubmitRating)}
            >
              <FormField
                control={form.control}
                name="ratingSlider"
                render={({ field }) => (
                  <FormItem>
                    <Slider
                      className="w-[80%]"
                      defaultValue={field.value}
                      max={5}
                      step={1}
                      onValueChange={field.onChange}
                    />
                    <p className="mt-2 text-center">
                      Current value: {field.value[0]}
                    </p>
                  </FormItem>
                )}
              />
              <button className="drop-shadows-2xl bg-slate-300" type="submit">
                Submit
              </button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
