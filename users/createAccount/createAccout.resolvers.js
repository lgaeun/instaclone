import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        //check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          //send filters where having same username or email
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        console.log(existingUser);
        //hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        //save and return the user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
