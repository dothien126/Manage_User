import { Album } from '../album/album.entity';
import { Photo } from '../photo/photo.entity';
import bcrypt from 'bcryptjs';

import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';


export enum userStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BAN = 'ban',
}

@Entity('User')
export class User extends BaseEntity{
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

  @OneToMany((type) => Photo, (photo) => photo.user, {
    cascade: true
  })
  photos?: Photo[];

  @ManyToMany((type) => Album, {
    cascade: true
  })
  @JoinTable({
    name: 'User_Album',
    joinColumn: {
			name: 'user',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'album',
			referencedColumnName: 'id',
		},
  })
  albums: Album[]

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(hashPassword: string) {
    return bcrypt.compareSync(hashPassword, this.password);
  }
}
