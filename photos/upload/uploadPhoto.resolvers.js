import { protectedResovler } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResovler(
      async (_, { file, caption }, { loggedInUser }) => {
        const hashtag = caption.match(/#[\w]+/g);
      }
    ),
  },
};
