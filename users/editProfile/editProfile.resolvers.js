import { createWriteStream, write } from "fs";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResovler } from "../users.utils";

const resolverFunc = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newfilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newfilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newfilename}`;
  }
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
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
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
