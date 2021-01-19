import {
  Entity,
  Column,
  OneToOne,
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

import { User } from "./User";
import { Image } from "./Image";
import { Shows } from "./Shows";
import { Trailer } from "./Trailer";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne((type) => User, (user) => user.movie, { nullable: false })
  user: User;

  @OneToMany((type) => Shows, (shows) => shows.movie)
  shows: Shows[];

  @OneToMany((type) => Image, (image) => image.movie)
  image: Image[];

  @OneToOne((type) => Trailer, (trailer) => trailer.movie)
  trailer: Trailer;

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
