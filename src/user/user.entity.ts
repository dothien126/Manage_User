import bcrypt from 'bcryptjs';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from '../photo/photo.entity';

export enum userStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BAN = 'ban',
}

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
    unique: true,
  })
  userName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp'}, )
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Column({
    type: 'enum',
    enum: userStatus,
    default: 'active',
  })
  status: userStatus;

  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: true
  })
  photos?: Photo[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(hashPassword: string) {
    return bcrypt.compareSync(hashPassword, this.password);
  }
}
