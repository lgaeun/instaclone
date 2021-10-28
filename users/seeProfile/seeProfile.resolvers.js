import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        //@unique인 값으로만 find
        where: {
          username,
        },
        //relation이 있는 경우 include를 통해서 전체 보여줄 수 있음
        // include: {
        //   followers: true,
        //   following: true,
        // },
      }),
  },
};
