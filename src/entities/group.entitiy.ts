import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/entities/base.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'groups' })
export class GroupEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'group_users',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];

  @ManyToMany(() => GroupEntity, (group) => group.childGroups)
  @JoinTable({
    name: 'group_subgroups',
    joinColumn: {
      name: 'parent_group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'child_group_id',
      referencedColumnName: 'id',
    },
  })
  childGroups: GroupEntity[];
}
@ObjectType({ description: 'Group object type.' })
export class Group {
  @Field(() => ID, {
    description: 'The group ID',
  })
  id: string;

  @Field(() => [ID], { description: 'The user IDs that are part this Group' })
  userIds: string[];

  @Field(() => [ID], {
    description: 'The group IDs that are part of this Group',
  })
  groupIds: string[];
}
