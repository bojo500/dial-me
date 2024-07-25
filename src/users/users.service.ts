import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}


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

  async update(id: number, updateUserDto: Partial<User>) {
    const user = await this.repository.findOne({ where:{id} });
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }
    Object.assign(user, updateUserDto);
    try {
      await this.repository.save(user);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
    return {
      message: 'Updated Successfully',
      statusCode: HttpStatus.OK,
    };
  }



  async findOne(id: number): Promise<User> {
    return await this.repository.findOne({ where: { id } });
  }

  async updatePhoneNumber(userId: number, phoneNumber: string): Promise<void> {
    await this.repository.update(userId, { phoneNumber });
  }

  findAll() {
    return this.repository.find();
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
