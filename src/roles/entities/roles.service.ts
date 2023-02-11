import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
  @InjectRepository(Roles)
  private readonly RolesRepository: Repository<Roles>;

  public async createRole(rolesDto: Roles) {
    try {
      const saveTypeConfigDetails = await this.RolesRepository.save(rolesDto);
      return saveTypeConfigDetails;
    } catch (error) {
      throw error;
    }
  }

  public async getAllRoles() {
    try {
      const getAllRoles = await this.RolesRepository.find();
      return getAllRoles;
    } catch (error) {
      throw error;
    }
  }

  public async replaceRoleById(id: number, rolesDto: Roles) {
    try {
      const getAllRoles = await this.RolesRepository.createQueryBuilder()
        .update(Roles)
        .set(rolesDto)
        .where({ id: id })
        .execute();

      return getAllRoles;
    } catch (error) {
      throw error;
    }
  }

  public async getRoleById(id: number) {
    try {
      const getAllRoles = await this.RolesRepository.findOne({
        where: { id: id },
      });
      return getAllRoles;
    } catch (error) {
      throw error;
    }
  }
}
