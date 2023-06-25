/**
 * This file contains the root router of the tRPC-backend
 */
import { createRouter } from '../createRouter';
import { commentRouter } from '../routers/comment';
import { forumRouter } from '../routers/forum';
import { subforumRouter } from '../routers/subforum';
import { threadRouter } from '../routers/thread';
import { userRouter } from '../routers/user';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('status', {
    async resolve() {
      return 'OK';
    },
  })
  .merge('comment.', commentRouter)
  .merge('thread.', threadRouter)
  .merge('subforum.', subforumRouter)
  .merge('forum.', forumRouter)
  .merge('user.', userRouter);

export type AppRouter = typeof appRouter;
