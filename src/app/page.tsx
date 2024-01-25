import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center mx-auto max-w-3xl py-20 bg-bg_primary space-y-5">
          <h1 className="text-4xl text-white text-center">
            Track the films you want to see.{" "}
            <span className="block">Save the films you want to see.</span>
          </h1>
          <Link href={"/register"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
