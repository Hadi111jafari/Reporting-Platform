import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_KEY as string,
});

export async function POST(request: Request) {
  const _user = await currentUser()
  // Get the current user from your database
  const user = {
    id: _user?.emailAddresses[0].emailAddress,
    metadata: {
      name: `${_user?.firstName} ${_user?.lastName}` as string,
      avatar: _user?.imageUrl as string,
      colors: ["#FF0000", "#00FF00", "#0000FF"] as string[],
    },
  }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id as string,
    { userInfo: { ...user.metadata } } // Optional
  );

  const { room } = await request.json()


  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
