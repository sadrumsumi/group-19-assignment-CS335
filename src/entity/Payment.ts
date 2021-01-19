import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";
import { Ticket } from "./Ticket";

import { Today } from "../config";

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  reference: string;

  @Column({ nullable: false })
  status: string;

  @ManyToOne((type) => User, (user) => user.payment, { nullable: false })
  user: User;

  @OneToOne((type) => Ticket, (ticket) => ticket.payment, { nullable: false })
  @JoinColumn()
  ticket: Ticket;

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
      this.ticket = data.ticket;
      this.status = data.status;
      this.reference = data.reference;
    }
  }
}

export interface hall {
  user: User;
  ticket: Ticket;
  status: string;
  reference: string;
}
