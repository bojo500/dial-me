import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException, UnauthorizedException
} from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { User } from "../users/entities";
import { RegisterDto } from "../users/dto";
import { TokenPayloadInterface } from "./interfaces";

@Injectable()export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user?.password);
      if (isPasswordCorrect) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(user: any): Promise<any> {
    console.log({user})
    let payload : TokenPayloadInterface;
    try {
      payload = { email: user.email, sub: user.id };
    } catch (e) {
      throw new BadRequestException(e);
    }
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }


  async register(user: RegisterDto): Promise<any> {
    const _user: User = await this.usersService.findOneByEmail(user?.email);
    if (_user) {
      this.handleBadRequest("Email or username already exists");
    }
    user.password = await bcrypt.hash(user.password, 10);
    try {
      await this.usersService.createUser(user);

    } catch {
      throw new InternalServerErrorException();
    }
    return {
      message: "Created Successfully",
      statusCode: HttpStatus.CREATED
    };
  }

  handleBadRequest(message: string): void {
    throw new BadRequestException({
      message,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  async checkAuth(token: string): Promise<TokenPayloadInterface> {
    let verifyObject: TokenPayloadInterface;
    try {
      verifyObject = await this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
    return verifyObject;
  }
}
