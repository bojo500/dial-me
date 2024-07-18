import { Controller, Post, UseGuards, Request, Get, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../users/entities";
import { RegisterDto } from "../users/dto";
import { JwtAuthGuard, LocalAuthGuard } from "./guards";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * the login
   * @param req
   * @param body
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async login(@Request() req, @Body() body): Promise<User> {
    console.log({reqUser : req.user})
    console.log({body})
    return this.authService.login(req.user);
  }

  /**
   * the login
   * @param userData
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() userData: RegisterDto): Promise<User> {
    return this.authService.register(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}