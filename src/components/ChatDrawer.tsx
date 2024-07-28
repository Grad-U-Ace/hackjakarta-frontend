"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { clearChat, sendMessage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import FollowUp from "./FollowUp";
import RecommendationCarousel from "./RecommendationCarousel";

export default function ChatDrawer() {
  const { rive, RiveComponent } = useRive({
    src: "glowy_ball.riv",
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<{ content: any; isSelf: boolean }[]>(
    [],
  );

  const openInput = useStateMachineInput(rive, "State Machine 1", "open_trig");
  const bingInput = useStateMachineInput(rive, "State Machine 1", "bing_trig");
  const closeInput = useStateMachineInput(
    rive,
    "State Machine 1",
    "close_trig",
  );

  const handleSubmit = (formData = new FormData()) => {
    const message = formData.get("message") as string;
    setMessages((prev) => [...prev, { content: message, isSelf: true }]);
    sendMessage(formData).then((response) => {
      console.log(response);

      setMessages((prev) => [...prev, { content: response, isSelf: false }]);
    });

    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field
    }
  };

  const handleInputFocus = useCallback(() => {
    openInput?.fire();
  }, [openInput]);

  const handleInputBlur = useCallback(() => {
    closeInput?.fire();
  }, [closeInput]);

  useEffect(() => {
    if (messages.length > 0) {
      messageRef.current.scrollIntoView({ behavior: "smooth" }); //Use scrollIntoView to automatically scroll to my ref
    }
  }, [messages.length]);

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
      <DrawerContent className="flex h-svh flex-col rounded-none bg-white/70 backdrop-blur-3xl">
        <DrawerHeader>
          <DrawerTitle className="bg-blend-color-burn">GrabFood AI</DrawerTitle>
        </DrawerHeader>
        <div className="relative flex grow flex-col">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 left-1/2 top-1/4 -z-10 flex w-full grow -translate-x-1/2 -translate-y-1/2 transition-transform duration-700",
              messages.length > 0 && "-translate-y-[95%]",
            )}
          >
            <RiveComponent />
          </div>
          <ScrollArea
            className={cn(
              "flex h-1 grow flex-col justify-end gap-2 pb-28 transition-transform",
              messages.length > 0 && "translate-y-20",
            )}
          >
            <motion.div
              className="flex justify-start gap-2 px-5 py-2"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="max-w-[80%] origin-top-left rounded-2xl rounded-tl-md border border-gray-300 px-4 py-2 text-gray-900">
                Hi! I&apos;m your GrabFood AI Assitant. How can I help you find
                the perfect meal today?
              </div>
            </motion.div>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                ref={index + 1 === messages.length ? messageRef : null}
                className={cn(
                  "flex w-screen gap-2 px-5 py-2",
                  message.isSelf ? "justify-end" : "justify-start",
                )}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div
                  className={cn("max-w-[80vw] rounded-2xl px-4 py-2", {
                    "origin-top-right self-end rounded-tr-md border border-green-700 bg-gradient-to-br from-green-500 to-green-600 text-white":
                      message.isSelf,
                    "origin-top-left rounded-tl-md border border-gray-300 text-gray-900":
                      !message.isSelf,
                    "mb-[180px]":
                      !message.isSelf &&
                      typeof message.content === "object" &&
                      message.content !== null,
                  })}
                >
                  {typeof message.content === "object" &&
                  message.content !== null ? (
                    <RecommendationCarousel recommendations={message.content} />
                  ) : (
                    <FollowUp type={String(message.content)} />
                  )}
                </div>
              </motion.div>
            ))}
            <ScrollBar />
          </ScrollArea>
          <div className="z-10 px-5">
            <form action={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                id="message"
                name="message"
                required
                autoComplete="off"
                placeholder={
                  messages.length === 0
                    ? "Did you already have something in mind?"
                    : "Ask again..."
                }
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="transition-transform active:scale-90"
                onClick={() => bingInput?.fire()}
              >
                <i className="i-solar-plain-bold size-6 text-gray-900/70" />
              </Button>
            </form>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                setMessages([]);
                clearChat();
              }}
            >
              <i className="i-ph-caret-down-bold size-8 text-gray-900" />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
