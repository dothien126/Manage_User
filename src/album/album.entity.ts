import { timeLog } from 'console';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Photo } from '../photo/photo.entity';
import { User } from '../user/user.entity';

export enum albumStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

@Entity('Album')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Column({
    type: 'enum',
    enum: albumStatus,
    default: 'private',
  })
  status: albumStatus;

  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: true,
  })
  photos: Photo[];

  @ManyToMany(() => User)
  @JoinTable()
  user: User[];
}
