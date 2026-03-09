import { dbConnect, Collection } from "./dbConnect";
import bcrypt from "bcryptjs";

export const loginUser = async (credentials) => {

  const { email, password } = credentials;

  const collection = await dbConnect(Collection.USERS);

  const user = await collection.findOne({ email });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
      role: user.role || "user",
  };
};