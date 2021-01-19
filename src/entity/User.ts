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

import { Hall } from "./Hall";
import { Movie } from "./Movie";
import { Ticket } from "./Ticket";
import { Today } from "../config";
import { UseRole } from "./UseRole";
import { Payment } from "./Payment";
import { Activity } from "./Activity";
import { Notification } from "./Notification";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  firtsname: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ default: null })
  address: string;

  /** relation part */
  @OneToMany((type) => Hall, (hall) => hall.user)
  hall: Hall[];

  @ManyToOne((type) => User, (user) => user.owner)
  employee: User;

  @OneToMany((type) => Movie, (movie) => movie.user)
  movie: Movie[];

  @OneToMany((type) => User, (user) => user.employee)
  owner: User[];

  @OneToMany((type) => Ticket, (ticket) => ticket.user)
  ticket: Ticket[];

  @OneToMany((type) => UseRole, (userole) => userole.user)
  userole: UseRole[];

  @OneToMany((type) => Payment, (payment) => payment.user)
  payment: Payment[];

  @OneToMany((type) => Activity, (activity) => activity.user)
  activity: Activity[];

  @OneToMany((type) => Notification, (notification) => notification.user)
  notification: Notification[];
  /** end of relations */

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

  constructor(data?: user) {
    super();
    if (data) {
      this.email = data.email;
      this.phone = data.phone;
      this.address = data.address;
      this.lastname = data.lastname;
      this.firtsname = data.firtsname;
    }
  }
}

export interface user {
  email: string;
  phone: string;
  address: string;
  lastname: string;
  firtsname: string;
}
