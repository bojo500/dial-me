import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  InternalServerErrorException,
  HttpStatus
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags('User 👤')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({summary: "Create one User"})
  @ApiResponse({status: HttpStatus.CREATED, description: "Operation success"})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary: `Get Many Users`})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({summary: "Get one User"})
  @ApiResponse({status: HttpStatus.OK, description: "Operation success"})
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(":id")
  @ApiOperation({summary: "Delete one User"})
  @ApiResponse({status: HttpStatus.OK, description: "Operation success"})
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Update one User"})
  @ApiResponse({status: HttpStatus.OK, description: "Operation success"})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.usersService.update(+id, updateUserDto);
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

}

