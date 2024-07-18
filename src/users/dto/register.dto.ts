import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {

  @ApiProperty({ type: [String] })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({type: IsEmail})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
