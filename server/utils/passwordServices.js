import bcrypt from "bcrypt";

export const encryptPassword = async (myPlaintextPassword) => {
  const saltRounds = 10;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = bcrypt.hash(myPlaintextPassword, salt);
    return hashPassword;
  } catch (error) {
    console.log("failed to hash password", error);
    return null;
  }
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  const isPasswordCorrect = await bcrypt.compare(plainPassword, hashedPassword);
  return isPasswordCorrect;
};
