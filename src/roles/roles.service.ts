import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoleRequest } from './dto/create-role.request';
import { Role } from './schema/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}

  async createRole(role: CreateRoleRequest) {
    const roleExists = await this.roleModel.findOne({ name: role.name });

    if (roleExists) {
      throw new BadRequestException('Role already exists!');
    }

    await new this.roleModel({
      ...role,
      name: role.name.toLowerCase().trim(),
    }).save();
  }

  async getAllRoles() {
    return this.roleModel.find({});
  }

  async getRoleById(roleId: string) {
    return this.roleModel.findById(roleId);
  }
}
