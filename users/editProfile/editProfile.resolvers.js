import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResovler } from "../users.utils";

const resolverFunc = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser, protectedResolver }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "You need to login.",
    };
  }

  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bycrypt.hash(newPassword, 10);
  }

  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(uglyPassword && { password: uglyPassword }),
    },
  });
  if (updatedUser.id) {
    return { ok: true };
  } else {
    return {
      ok: false,
      error: "Could not update profile",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResovler(resolverFunc),
  },
};
