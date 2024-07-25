import { Column, Entity, OneToMany } from "typeorm";
import { CoreEntity } from "../../core";
import { Otp } from "../../twilio/entities";


@Entity()
export class User  extends CoreEntity{

  @Column({ unique: true })
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToMany(() => Otp, otp => otp.user)
  otps: Otp[];
}

