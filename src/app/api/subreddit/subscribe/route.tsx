import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user)
      return new Response("User not authorized", { status: 401 });
    const body = await req.json;
    const { subredditId } = SubredditSubscriptionValidator.parse(body);
    const alreadySubscribed = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session?.user.id,
      },
    });
    if (alreadySubscribed)
      return new Response("you are already subscribed!", { status: 400 });
    await db.subscription.create({
      data: {
        subredditId,
        userId: session?.user.id,
      },
    });
    return new Response(subredditId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("failed to do action, please retry later", {
      status: 500,
    });
  }
}
