import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
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
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  link: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: photoStatus,
  })
  status: photoStatus;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;
}
