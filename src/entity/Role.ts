import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Today } from "../config";

import { UseRole } from "./UseRole";

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany((type) => UseRole, (userole) => userole.role)
  userole: UseRole[];

  // date the data issued
  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  // date the data updated
  @UpdateDateColumn({ type: "datetime" })
  updatedAt: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = Today(new Date()).format();
 
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = Today(new Date()).format();
 
  }

  constructor(data?: hall) {
    super();
    if (data) {
      this.name = data.name;
      this.description = data.description;
    }
  }
}

export interface hall {
  name: string;
  description: string;
}
