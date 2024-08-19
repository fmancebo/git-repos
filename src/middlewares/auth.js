import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

// Middleware para autenticar o usuário e extrair informações do token
export const Auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token não fornecido.",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await jwt.verify(token, authConfig.secret);
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

// Middleware para verificar se o usuário é administrador
export const IsAdmin = (req, res, next) => {
  if (!req.userId || !req.isAdmin) {
    return res
      .status(403)
      .json({ error: "Acesso restrito a administradores." });
  }
  return next();
};

// Middleware para verificar se o usuário tem permissão para acessar o recurso
export const CheckUserPermission = (req, res, next) => {
  const userIdParam = req.params.user_id;

  if (req.userId !== userIdParam && !req.isAdmin) {
    return res.status(403).json({
      error: "Você não tem permissão para acessar este recurso.",
    });
  }

  return next();
};
