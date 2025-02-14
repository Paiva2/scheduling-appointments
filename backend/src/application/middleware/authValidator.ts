import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserNotFoundException } from "../../core/usecase/common/exception";
import TokenConfig from "../config/jwt/tokenConfig";
import ForbiddenException from "../../core/usecase/common/exception/core/forbiddenException";
import UserRepositoryPg from "../../infra/persistence/repository/UserRepositoryPg";

export default function authValidator(validRoutes: string[]) {
  const tokenConfig = new TokenConfig();
  const userRepository = new UserRepositoryPg();

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.headers.authorization;

      const parsedToken = tokenConfig.verify(token!) as JwtPayload;

      if (!parsedToken.sub) {
        throw new Error("Subject is null!");
      }

      const user = await userRepository.findById(parsedToken.sub);

      if (user == null || !user.getId()) {
        throw new UserNotFoundException("User not found!");
      }

      if (validRoutes[0] === "*") {
        request.headers["authentication-principal"] = parsedToken.sub;
        return next();
      }

      const roles = user.getUserRoles()?.map((userRole) => userRole?.getRoleEntity()?.getName());
      const hasAccess = roles?.some((role) => validRoutes.includes(role!));

      if (!hasAccess) {
        return response.status(401).send();
      }

      request.headers["authentication-principal"] = parsedToken.sub;

      next();
    } catch (e) {
      console.error(e);
      throw new ForbiddenException("Error while validating token...");
    }
  };
}
