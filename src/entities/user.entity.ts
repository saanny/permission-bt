import { BaseEntity } from 'src/entities/base.entity';
import { GroupEntity } from 'src/entities/group.entitiy';
import { TweetEntity } from 'src/entities/tweet.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @ManyToMany(() => GroupEntity, (group) => group.users)
  groups: GroupEntity[];

  @OneToMany(() => TweetEntity, (tweet) => tweet.author)
  tweets: TweetEntity[];
}
