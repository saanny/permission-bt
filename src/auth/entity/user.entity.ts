import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { AccountStatusEnum } from '../types/account-status.enum';

@Table({
  tableName: 'users',
  underscored: true,
})
export class UserEntity extends Model<UserEntity> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    field: 'email',
    unique: true,
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    field: 'first_name',
  })
  firstName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    field: 'last_name',
  })
  lastName: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    field: 'nick_name',
  })
  nickName: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    field: 'display_name',
  })
  displayName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    field: 'password',
  })
  password: string;

  @Column({
    allowNull: true,
    type: DataType.ENUM('ADMIN', 'USER'),
    field: 'role',
  })
  role: 'ADMIN' | 'USER' | null;

  @Column({
    type: DataType.ENUM,
    values: Object.values(AccountStatusEnum) as string[],
  })
  accountStatus: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt: Date;
}
