import { Column, Entity } from "typeorm";
import { CoreEntity } from "../../core";


@Entity()
export class User  extends CoreEntity{

  @Column({ unique: true })
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

}

