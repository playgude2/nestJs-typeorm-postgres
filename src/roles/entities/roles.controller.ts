import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';

@ApiTags('RolesController')
@Controller('roles')
export class RolesController {
  @Inject(RolesService)
  private readonly rolesService: RolesService;

  @Post('/')
  @ApiOperation({
    summary: 'Create one role',
    description: 'Create one role',
  })
  private createRole(@Body() rolesDto: Roles) {
    return this.rolesService.createRole(rolesDto);
  }

  @Get('/')
  @ApiOperation({
    summary: 'Retreive many roles',
    description: 'Retreive many roles',
  })
  private getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Replace one role by id',
    description: 'Replace one role by id',
  })
  private replaceRoleById(@Param('id') id: number, @Body() rolesDto: Roles) {
    return this.rolesService.replaceRoleById(id, rolesDto);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Retrieve one role by id',
    description: 'Retrieve one role by id',
  })
  private getRoleById(@Param('id') id: number) {
    return this.rolesService.getRoleById(id);
  }
}
