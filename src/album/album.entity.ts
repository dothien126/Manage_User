import {Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import {Photo} from '../photo/photo.entity'
import {User} from '../user/user.entity'

export enum albumStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

@Entity('album')
export class Album extends BaseEntity {
    @PrimaryColumn({type: 'uuid'})
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({
        type: 'enum',
        enum: albumStatus,
    })
    status: albumStatus

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]

    @ManyToMany (() => User)
    @JoinTable()
    user: User[]
}
