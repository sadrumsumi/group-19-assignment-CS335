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

import { User } from "./User";
import { Today } from "../config";

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: null })
  flag: string;

  @Column({ default: null })
  district: string;

  @Column({ default: null })
  city: string;

  @Column({ default: null })
  country: string;

  @Column({ default: null })
  ip: string;

  @Column({ default: null })
  latitude: string;

  @Column({ default: null })
  longitude: string;

  @Column({ nullable: false })
  type: string;

  @ManyToOne((type) => User, (user) => user.activity, { nullable: false })
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
      this.ip = data.ip;
      this.user = data.user;
      this.flag = data.flag;
      this.city = data.city;
      this.type = data.type;
      this.country = data.country;
      this.district = data.district;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    }
  }
}

export interface hall {
  ip: string;
  user: User;
  flag: string;
  city: string;
  type: string;
  country: string;
  district: string;
  latitude: string;
  longitude: string;
}
