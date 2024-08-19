import { Router } from "express";
import { Auth, IsAdmin, CheckUserPermission } from "./middlewares/auth";

import SessionsController from "./controllers/SessionsController";
import UsersController from "./controllers/UserController";
import RespositoriesController from "./controllers/RespositoriesController";

import FrontController from "./controllers/FrontController";

const routes = new Router();

routes.post("/sessions", SessionsController.create);

routes.post("/users", UsersController.create);

routes.use(Auth);
// ROTAS DE CIRCULAÇAO
routes.get(
  "/user/:user_id/repositories",
  CheckUserPermission,
  FrontController.index
);
routes.post(
  "/user/:user_id/repositories",
  CheckUserPermission,
  FrontController.create
);
routes.delete(
  "/user/:user_id/repositories/:id",
  CheckUserPermission,
  FrontController.destroy
);

routes.use(Auth, IsAdmin);

// ROTAS ADMINISTRATIVAS
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

routes.get("/users/:user_id/repositories", RespositoriesController.index);
routes.post("/users/:user_id/repositories", RespositoriesController.create);
routes.delete(
  "/users/:user_id/repositories/:id",
  RespositoriesController.destroy
);

export default routes;
