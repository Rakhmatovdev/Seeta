import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const adminAuthHeader = req.headers.authorization;
    if (!adminAuthHeader) {
      throw new UnauthorizedException({
        message: "Token is not given in Header",
      });
    }

    const bearer = adminAuthHeader.split(" ")[0];
    const token = adminAuthHeader.split(" ")[1];
    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({
        message: "Bearer and Token are not given",
      });
    }
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Token can not verificate!",
        error,
      });
    }
    req.admin = payload;
    // logika
    return true;
  }
}
