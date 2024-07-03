import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    try {
      const request = <AuthenticatedRequest>ctx.switchToHttp().getRequest();
      console.log(request);
      console.log(request.user);
      return request.user;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
);
