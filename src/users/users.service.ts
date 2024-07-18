import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) public repository: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    try {
      await this.repository.save(createUserDto);
    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: 'Created Successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.repository.save({ ...updateUserDto, id });
    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: 'Updated Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    let item = await this.findOne(id);
    if (!item) {
      throw new NotFoundException();
    }
    try {
      await this.repository.delete(item.id);
    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: 'Deleted Successfully',
      statusCode: HttpStatus.OK,
    };
  }


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.repository.save(createUserDto);
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }


  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({where:{email}});
  }

}
