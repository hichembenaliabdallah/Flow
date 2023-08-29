import { buttonVariants } from "@/components/ui/Button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-bold mb-4 text-3xl md:text-4xl">Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-6 md:gap-x-4">
        {/* feed */}
        <div className="overflow-hidden h-fit rounded-lg shadow-md border border-gray-200 order-first md:order-last">
          <div className="bg-[#FA8484]  py-4 px-6">
            <p className="flex items-center gap-1.5 py-3 font-semibold">
              <HomeIcon className="w-4 h-4 " />
              Home
            </p>
          </div>
          <div className="-my-3 divide-y divide-grey-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                Your personal Flow homepage. Come here to check in with your
                favorite communities
              </p>
            </div>
            <Link
              href="/r/create"
              className={buttonVariants({ className: "w-full mt-4 mb-6" })}
            >
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
