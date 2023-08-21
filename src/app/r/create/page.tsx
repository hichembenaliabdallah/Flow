"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FC } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
import { useCustomToasts } from "@/hooks/use-custom-toasts";
interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { loginToast } = useCustomToasts();
  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };

      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Subreddit already exists.",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid subreddit name.",
            description: "Please choose a name between 3 and 21 letters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "There was an error.",
        description: "Could not create subreddit.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });
  return (
    <div className="container flex items-center max-w-3xl h-full mx-auto ">
      <div className=" relative bg-white w-full p-4 space-y-6 h-fit ">
        <div className=" flex justify-between items-center">
          <h1 className="font-semibold text-xl">Create Community</h1>{" "}
        </div>
        <hr className="bg-zinc-500 h-px" />
        <div>
          <p className=" font-medium text-zinc-900 text-lg ">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization won't be changable.
          </p>
          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-6"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-8">
          <Button
            isLoading={isLoading}
            variant="subtle"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createCommunity()}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
