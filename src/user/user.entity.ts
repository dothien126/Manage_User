import bcrypt from 'bcryptjs';

import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Photo } from '../photo/photo.entity';

export enum userStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BAN = 'ban',
}

@Entity('User')
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({
      nullable: true
  })
  name: string;

  @Column({
      nullable: true,
      unique: true
  })
  userName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: userStatus,
  })
  status: userStatus;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unryptedPassword: string) {
    return bcrypt.compareSync(unryptedPassword, this.password);
  }
}
