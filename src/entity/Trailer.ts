import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Today } from "../config";
import { Movie } from "./Movie";

@Entity()
export class Trailer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  file: string;

  @OneToOne((type) => Movie, (movie) => movie.trailer, { nullable: false })
  @JoinColumn()
  movie: Movie;

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
      this.file = data.file;
      this.movie = data.movie;
    }
  }
}

export interface hall {
  file: string;
  movie: Movie;
}
