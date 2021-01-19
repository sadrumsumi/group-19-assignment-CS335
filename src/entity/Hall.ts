import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";
import { Room } from "./Room";

import { Today } from "../config";

@Entity()
export class Hall extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @ManyToOne((type) => User, (user) => user.hall, { nullable: false })
  user: User;

  @OneToMany((type) => Room, (room) => room.hall)
  room: Room[];

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
      this.name = data.name;
      this.address = data.address;
    }
  }
}

export interface hall {
  user: User;
  name: string;
  address: string;
}
