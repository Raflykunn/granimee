import { ScrollArea } from "@/components/ui/scroll-area";

export const WatchHistory = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="border-b border-border py-2">
        <p className="text-sm">Riwayat tonton</p>
      </div>

      <div className="flex flex-col gap-4">
        <ScrollArea className="w-full rounded-tl-lg rounded-bl-lg bg-sidebar">

        </ScrollArea>
      </div>
    </div>
  );
};
