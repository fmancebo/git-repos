import User from "../models/User";

import { createPasswordHash } from "../services/auth";

class UsersController {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async create(req, res) {
    try {
      const { fullName, email, password, secretAdmin } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(422)
          .json({ message: `${email} já está cadastrado.` });
      }

      const encryptedPassword = await createPasswordHash(password);

      const newUser = await User.create({
        fullName,
        email,
        password: encryptedPassword,
        // verifica se tem secretadmin e se ele é corresponde
        isAdmin: secretAdmin && secretAdmin === process.env.ADMIN_SECRET,
      });

      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { fullName, email, password } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      const encryptedPassword = await createPasswordHash(password);

      await user.updateOne({ fullName, email, password: encryptedPassword });

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json();
      }

      await user.deleteOne();

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new UsersController();
