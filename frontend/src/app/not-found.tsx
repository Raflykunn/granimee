import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-12 justify-center items-center w-screen h-screen">
      <Image src="/notfound.gif" alt="loading" width={200} height={200} />
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl font-bold">404</p>
        <p className="text-primary text-center">Page Not Found</p>
        <p className="text-primary text-center text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button variant={"outline"} className="my-2">
          <Link href="/" className="text-primary">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
