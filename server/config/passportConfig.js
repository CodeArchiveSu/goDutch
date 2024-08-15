import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/userModel.js";

const JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "this is secret key",
};

export const passportStrategy = new JwtStrategy(JWTOptions, async function (
  jwt_payload,
  done
) {
  try {
    // console.log(jwt_payload);
    const user = await userModel.findOne({ _id: jwt_payload.sub });
    if (user) {
      return done(null, user);
    }
    if (!user) {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});
