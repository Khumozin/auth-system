import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/authentication/current-user.decorator';
import { AuthorizationGuard } from 'src/authentication/guards/authorization.guard';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Permissions } from 'src/roles/decorators/permissions.decorator';
import { Action } from 'src/roles/enums/action.enum';
import { Resource } from 'src/roles/enums/resource.enum';

import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    await this.usersService.createUser(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Permissions([{ resource: Resource.users, actions: [Action.upload] }])
  async getUsers(@CurrentUser() user: User) {
    console.log(user);

    return this.usersService.getUsers();
  }
}
