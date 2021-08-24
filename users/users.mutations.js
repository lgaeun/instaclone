import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
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
      console.log(existingUser);
      //hash password
      const uglyPassword = await bcrypt.hash(password, 10);
      return client.user.create({data: {
        username, email, firstName, lastName, password:uglyPassword,
      }})
      //save and return the user
    },
  },
};
