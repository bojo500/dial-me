import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
  @ApiProperty({
    description: "The name of a user",
    type: String,
    default: "Mohamed Khaled"
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  password: string;

}
