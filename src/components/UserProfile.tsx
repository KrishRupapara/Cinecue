import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function UserProfile() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <CircleUser className="w-9 h-9 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-fit bg-gray-800 text-white mt-1">
        <div className="grid gap-2 items-center">
          <Link
            href="/watch-list"
            className="text-center border-b pb-1 hover:text-primary"
          >
            Watch list
          </Link>
          <Button variant={"destructive"} className="bg-red-800">
            Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
