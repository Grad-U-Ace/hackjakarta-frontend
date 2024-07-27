"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { sendMessage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Rive, { useRive } from "@rive-app/react-canvas";

export default function ChatDrawer() {
  const { rive, RiveComponent } = useRive({
    src: "glowy_ball.riv",
    stateMachines: "bumpy",
    autoplay: true,
  });

  const [messages, setMessages] = useState<
    { content: string; isSelf: boolean }[]
  >([]);

  const handleSubmit = (formData = new FormData()) => {
    const message = formData.get("message") as string;
    setMessages((prev) => [...prev, { content: message, isSelf: true }]);
    sendMessage(formData).then((response) => {
      console.log(response);
      setMessages((prev) => [...prev, { content: response, isSelf: false }]);
    });
  };

  return (
    <Drawer shouldScaleBackground setBackgroundColorOnScale={false}>
      <DrawerTrigger asChild>
        <div className="mb-4 flex w-full cursor-pointer justify-center gap-3 rounded-lg bg-gradient-to-r from-yellow-200 to-red-300 p-4 drop-shadow-lg">
          <i className="i-solar-magic-stick-3-bold size-6" />
          <p className="text-base font-bold">
            Click here if you&apos;re confused!
          </p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="flex h-svh flex-col rounded-none bg-white/10 px-2 backdrop-blur-3xl">
        <DrawerHeader>
          <DrawerTitle>GrabFood Chat</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex grow flex-col">
          <motion.div
            layout
            className={cn(
              "relative flex grow before:absolute before:left-1/2 before:top-[60%] before:-z-10 before:h-20 before:w-32 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-500 before:blur-3xl",
              messages.length > 0 && "h-20 grow-0",
            )}
          >
            <RiveComponent
              onMouseEnter={() => rive && rive.play()}
              onMouseLeave={() => rive && rive.pause()}
            />
          </motion.div>
          <ScrollArea className="flex h-1 grow flex-col justify-end gap-2 p-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 py-2 ${
                  message.isSelf ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={cn("max-w-[80%] rounded-2xl px-4 py-2", {
                    "rounded-tr-md bg-gradient-to-br from-green-500 to-green-600 text-white":
                      message.isSelf,
                    "rounded-tl-md border border-gray-300 text-gray-900":
                      !message.isSelf,
                  })}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <ScrollBar />
          </ScrollArea>
          <div className="px-5">
            <form action={handleSubmit} className="flex gap-2">
              <Input
                id="message"
                name="message"
                required
                autoComplete="off"
                placeholder="Did you already have something in mind?"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="transition-transform active:scale-90"
              >
                <i className="i-solar-plain-bold size-6 text-gray-900" />
              </Button>
            </form>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="ghost" className="w-full">
              <i className="i-ph-caret-down-bold size-8 text-gray-900" />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
