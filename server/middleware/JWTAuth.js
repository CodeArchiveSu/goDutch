import passport from "passport";

export const JWTAuth = passport.authenticate("jwt", { session: false });
