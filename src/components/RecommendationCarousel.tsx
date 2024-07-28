import React from "react";

import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import foodPic from "./food.jpg";

type MenuItem = {
  id: number;
  menu_name: string;
  restaurant: number;
  price: number;
  description: string;
  buy_count: number;
};

type RecommendationCarouselProps = {
  recommendations: MenuItem[];
};

export default function RecommendationCarousel({
  recommendations,
}: RecommendationCarouselProps): React.ReactElement {
  return (
    <div className="mb-4 flex flex-col gap-2">
      I&apos;ve found these results for you.
      <div className="-mx-10 h-20">
        <ScrollArea className="w-screen min-w-1 whitespace-nowrap">
          <div className="flex gap-2 px-10 pb-8">
            {recommendations.map((item: MenuItem) => (
              <div
                key={item.id}
                className="min-w-[200px] overflow-hidden rounded-lg bg-white drop-shadow-xl"
              >
                <Image src={foodPic} alt="" placeholder="blur" />
                <div className="p-3">
                  <h3 className="font-bold">{item.menu_name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="mt-2 font-semibold">
                    Rp{item.price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-500">
                    Purchased {item.buy_count} times
                  </p>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
