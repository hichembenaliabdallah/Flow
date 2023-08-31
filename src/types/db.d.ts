import { Comment, Post, Subreddit, User, Vote } from "@prisma/client";

export type extendedPost = Post & {
  subreddit: Subreddit;
  comment: Comment;
  author: User;
  Votes: Vote[];
};
