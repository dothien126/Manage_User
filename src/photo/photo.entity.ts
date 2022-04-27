import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Album } from '../album/album.entity';

export enum photoStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('photo')
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  link: string;

  @CreateDateColumn({name: 'created_at', type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type: 'timestamp', nullable: true})
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: photoStatus,
  })
  status: photoStatus;

  @ManyToOne(() => User, (user) => user.photos, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;
}
