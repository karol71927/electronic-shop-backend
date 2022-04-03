import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === ('http' || 'https')) {
      return true;
    }
    return false;
    // const result = (await super.canActivate(context)) as boolean;
    // if (context.getType() === 'http') {
    //   const request = context.switchToHttp().getRequest();

    //   await super.logIn(request);
    // }

    // return result;
  }
}
