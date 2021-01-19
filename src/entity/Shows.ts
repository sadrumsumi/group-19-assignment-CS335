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

import { Room } from "./Room";
import { Movie } from "./Movie";
import { Ticket } from "./Ticket";

@Entity()
export class Shows extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  day: Date;

  @Column({ nullable: false })
  start_at: string;

  @Column({ nullable: false })
  end_at: string;

  @ManyToOne((type) => Room, (room) => room.shows, { nullable: false })
  room: Room;

  @ManyToOne((type) => Movie, (movie) => movie.shows)
  movie: Movie;

  @OneToMany((type) => Ticket, (ticket) => ticket.shows)
  ticket: Ticket[];

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
      this.day = data.day;
      this.room = data.room;
      this.end_at = data.end_at;
      this.start_at = data.start_at;
    }
  }
}

export interface hall {
  day: Date;
  room: Room;
  end_at: string;
  start_at: string;
}
