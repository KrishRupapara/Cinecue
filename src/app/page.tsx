import { Button } from "@/components/ui/button";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="w-screen h-screen">
        <div className="flex items-center justify-center flex-col space-y-5 h-full">
          <div className={cn("text-4xl text-center", inter.className)}>
            <h1>Track the films you&apos;ve watched.</h1>
            <h1>Save the ones you want to see.</h1>
          </div>
          <RegisterLink className="group">
            <Button>
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-all" />
            </Button>
          </RegisterLink>
        </div>
      </section>
      <section className="w-screen h-screen">
        <div className="w-4/5 mx-auto h-full flex flex-col items-center justify-center">
          <div>
            Whether you&apos;re a cinephile tired of finding the best movies or
            just a casual movie watcher.
            <span className="block">With Cinécue, you can...</span>
          </div>
          <div>Keep track of every movie you&apos;ve ever watched.</div>
          <div>
            Compile and share lists of films on any topic and keep watchlist of
            films you want to see.
          </div>
        </div>
      </section>
    </>
  );
}
