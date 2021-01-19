import {
  Entity,
  ManyToOne,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Today } from "../config";
import { Role } from "./Role";
import { User } from "./User";

@Entity()
export class UseRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne((type) => User, (user) => user.userole)
  user: User;

  @ManyToOne((type) => Role, (role) => role.userole)
  role: Role;

  // date the data issued
  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  // date the data updated
  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = Today(new Date()).unix();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = Today(new Date()).unix();
  }

  constructor(data?: hall) {
    super();
    if (data) {
      this.user = data.user;
      this.role = data.role;
    }
  }
}

export interface hall {
  user: User;
  role: Role;
}
