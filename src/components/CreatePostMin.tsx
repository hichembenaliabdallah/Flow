"use client";

import { FC } from "react";
import { Button } from "./ui/Button";
import { UserAvatar } from "./UserAvatar";
import { Session } from "next-auth";
import { Input } from "./ui/Input";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { ImageIcon, Link, Link2 } from "lucide-react";

interface CreatePostMinProps {
  session: Session | null;
}

const CreatePostMin: FC<CreatePostMinProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <li className="rounded-md list-none bg-white shadow-md mt-4">
        <div className="flex h-full py-6 px-4  justify-between gap-6">
          <div className="relative">
            <UserAvatar
              user={{
                name: session?.user.name || null,
                image: session?.user.image || null,
              }}
            />
            <span className="absolute right-0 bottom-0 bg-green-500 h-3 w-3 rounded-full"></span>
          </div>
          <Input
            readOnly
            onClick={() => router.push(pathname + "/submit")}
            placeholder="Post something!"
          />

          <Button
            variant="ghost"
            onClick={() => router.push(pathname + "/submit")}
          >
            <ImageIcon className="text-zinc-500" />
          </Button>
          <Button
            variant="ghost"
            className="text-zinc-500"
            onClick={() => router.push(pathname + "/submit")}
          >
            <Link2 />{" "}
          </Button>
        </div>
      </li>
    </>
  );
};

export default CreatePostMin;
