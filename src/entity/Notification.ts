import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Today } from "../config";
import { User } from "./User";

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ default: null })
  file: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne((type) => User, (user) => user.notification, { nullable: false })
  user: User;

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
      this.user = data.user;
      this.title = data.title;
      this.description = data.description;
    }
  }
}

export interface hall {
  user: User;
  title: string;
  description: string;
}
