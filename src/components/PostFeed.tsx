import { extendedPost } from "@/types/db";
import { FC, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ISPR } from "@/config";
import axios from "axios";
interface PostFeedProps {
  initialPosts: extendedPost[];
  subredditName: string;
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const {} = useInfiniteQuery(
    ["infinit-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${ISPR}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "");
      const { data } = await axios.get(query);
      return data as extendedPost[];
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );
  return <div>PostFeed</div>;
};

export default PostFeed;
