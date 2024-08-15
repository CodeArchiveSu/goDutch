import jwt from "jsonwebtoken";

export const generateToken = (userID) => {
  const payload = {
    sub: userID,
  };
  const secretOrPrivateKey = "this is secret key";
  const signOption = {
    expiresIn: "2 days",
  };
  const token = jwt.sign(payload, secretOrPrivateKey, signOption);
  return token;
};

