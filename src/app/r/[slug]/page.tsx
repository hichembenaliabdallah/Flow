import { PageProps } from "../../../../.next/types/app/layout";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ISPR } from "@/config";
import { notFound } from "next/navigation";
import CreatePostMin from "@/components/CreatePostMin";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const session = await getAuthSession();
  const { slug } = params;
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          comments: true,
          votes: true,
          subreddit: true,
        },
        take: ISPR,
      },
    },
  });
  if (!subreddit) return notFound();
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl ">r/{subreddit?.name}</h1>
      <CreatePostMin session={session} />
    </>
  );
};

export default page;
