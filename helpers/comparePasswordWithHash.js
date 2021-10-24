import bcrypt from "bcryptjs";

export default function comparePasswordWithHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}
