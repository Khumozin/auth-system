import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/roles/decorators/permissions.decorator';
import { Permission } from 'src/roles/dto/create-role.request';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!request.user._id) {
      throw new UnauthorizedException('User Id not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const routePermissions: Permission[] = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log(routePermissions);

    try {
      const userPermissions =
        await this.authenticationService.getUserPermissions(request.user._id);

      for (const routePermission of routePermissions) {
        const userPermission = userPermissions.find(
          (permission) => permission.resource === routePermission.resource,
        );

        if (!userPermission) throw new ForbiddenException();

        const actionsAvailable = routePermission.actions.every(
          (requiredAction) => userPermission.actions.includes(requiredAction),
        );

        if (!actionsAvailable) throw new ForbiddenException();
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException();
    }

    return true;
  }
}
