import { Clock5 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import WatchLaterForm from "./WatchLaterForm";

export default function WatchLater({
  title,
  id,
  type,
  userId,
}: {
  title: string;
  id: number;
  type: string;
  userId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Clock5 className="w-8 h-8 hover:text-primary cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Add to the Watchlist</DialogTitle>
        </DialogHeader>
        <WatchLaterForm title={title} id={id} type={type} userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
