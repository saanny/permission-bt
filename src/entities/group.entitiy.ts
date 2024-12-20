import { BaseEntity } from 'src/entities/base.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'groups' })
export class GroupEntity extends BaseEntity {
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
