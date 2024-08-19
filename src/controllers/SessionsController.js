import jwt from "jsonwebtoken";
import User from "../models/User";
import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User / password invalid." });
    }

    const passwordIsValid = await checkPassword(user, password);

    if (!passwordIsValid) {
      return res.status(401).json({ error: "User / password invalid." });
    }

    // Aqui está a principal mudança: adicionamos o campo isAdmin ao token
    const { id, isAdmin } = user;
    const token = jwt.sign({ id, isAdmin }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      user: {
        id,
        email,
      },
      token,
    });
  }
}

export default new SessionController();
