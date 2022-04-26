import {Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'
import {Photo} from '../photo/photo.entity'

export enum userStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BAN = 'ban'
}

@Entity('user')
export class User extends BaseEntity {
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column()
    name: string;

    @Column()
    userName: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({
        type: 'enum',
        enum: userStatus,
    })
    status: userStatus

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]
}
