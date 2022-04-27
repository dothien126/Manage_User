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
  PrimaryGeneratedColumn
} from 'typeorm';
import { Photo } from '../photo/photo.entity';
import { User } from '../user/user.entity';

export enum albumStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('album')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp', nullable: true})
  updatedAt?: Date;

  @Column({
    type: 'enum',
    enum: albumStatus,
  })
  status: albumStatus;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @ManyToMany(() => User)
  @JoinTable()
  user: User[];
}
