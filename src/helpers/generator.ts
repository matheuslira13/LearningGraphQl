import jwt from "jsonwebtoken";

export const generator = {
  createToken(id: any) {
    return jwt.sign({ id }, "secret", { expiresIn: "1d" });
  },

  verifyToken(token: any) {
    return jwt.verify(token, "secret");
  },
};
