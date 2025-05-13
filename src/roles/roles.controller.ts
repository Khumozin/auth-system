import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateRoleRequest } from './dto/create-role.request';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() role: CreateRoleRequest) {
    return this.rolesService.createRole(role);
  }

  @Get()
  async getRoles() {
    return this.rolesService.getAllRoles();
  }
}
