import client from "../client";

export default {
  Query: {
    seeProfile: (_, {username}) => client.user.findUnique({ //@unique인 값으로만 find
      where:{
        username,
      }
    })
  },
};
