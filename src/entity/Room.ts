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
import { Today } from "../config";

import { Hall } from "./Hall";
import { Shows } from "./Shows";

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  seats: string;

  @ManyToOne((type) => Hall, (hall) => hall.room, { nullable: false })
  hall: Hall;

  @OneToMany((type) => Shows, (shows) => shows.room)
  shows: Shows[];

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
      this.hall = data.hall;
      this.name = data.name;
      this.seats = data.seats;
    }
  }
}

export interface hall {
  hall: Hall;
  name: string;
  seats: string;
}
