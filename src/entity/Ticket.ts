import {
  Entity,
  Column,
  OneToOne,
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
import { Shows } from "./Shows";
import { Payment } from "./Payment";

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false, unique: true })
  type: string;

  @Column({ nullable: false })
  price: number;

  @OneToOne((type) => Payment, (payment) => payment.ticket)
  payment: Payment;

  @ManyToOne((type) => User, (user) => user.ticket, { nullable: false })
  user: User;

  @ManyToOne((type) => Shows, (shows) => shows.ticket)
  shows: Shows;

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
      this.type = data.type;
      this.price = data.price;
    }
  }
}

export interface hall {
  user: User;
  type: string;
  price: number;
}
