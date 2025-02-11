import { ITokenConfig } from "../../../core/interfaces/adapter/ITokenConfig";
import jwt from "jsonwebtoken";
import ForbiddenException from "../../../core/usecase/common/exception/core/forbiddenException";

export default class TokenConfig implements ITokenConfig {
  private readonly EXP_TIME_STRING = "15h";
  private readonly SECRET = process.env.SECRET ?? "development";
  private readonly ISSUER = "project_issuer";

  public generate(payload: { id: string; email: string }): string {
    try {
      return jwt.sign(
        {
          data: {
            id: payload.id,
            email: payload.email,
          },
        },
        this.SECRET,
        {
          expiresIn: this.EXP_TIME_STRING,
          issuer: this.ISSUER,
          algorithm: "HS256",
        }
      );
    } catch (e) {
      console.error(e);
      throw new Error("Internal error while generating a new token...");
    }
  }

  public verify(token: string): unknown {
    try {
      const decoded = jwt.verify(token, this.SECRET);

      return null;
    } catch (e) {
      console.error(e);
      throw new ForbiddenException("Invalid token!");
    }
  }
}
