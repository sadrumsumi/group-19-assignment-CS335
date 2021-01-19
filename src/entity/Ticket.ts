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

  @Column({ nullable: false })
  number: number;

  @Column({ nullable: false })
  seat_no: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  type: string;

  @OneToOne((type) => Payment, (payment) => payment.ticket)
  payment: Payment;

  @ManyToOne((type) => User, (user) => user.ticket, { nullable: false })
  user: User;

  @ManyToOne((type) => Shows, (shows) => shows.ticket, { nullable: false })
  shows: Shows;

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
      this.type = data.type;
      this.shows = data.shows;
      this.price = data.price;
      this.number = data.number;
      this.seat_no = data.seat_no;
    }
  }
}

export interface hall {
  user: User;
  shows: Shows;
  type: string;
  price: number;
  number: number;
  seat_no: string;
}
