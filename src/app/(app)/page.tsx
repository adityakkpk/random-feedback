"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import messages from "../../messages.json";
import AutoPlay from "embla-carousel-autoplay";

const Home = () => {
  return (
    <>
      <main className="flex-grow flex flex-col items-center px-4 md:px-24 py-12">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the world of Anonymous people&apos;s thoughts
          </h1>
          <p className="mt-3 md:mt-4 teat-base md:text-lg">
            Explore Random Feedback - Where your identity remains a secret.
          </p>
        </section>

        <Carousel
          plugins={[AutoPlay({ delay: 2000 })]}
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardHeader>{message.title}</CardHeader>
                    <CardContent className="flex  items-center justify-center p-10">
                      <span className="text-lg font-semibold">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6">
        &copy; {new Date().getFullYear()} Random Feedback. All Rights Reserved.
      </footer>
    </>
  );
};

export default Home;
