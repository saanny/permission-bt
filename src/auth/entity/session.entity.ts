import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'sessions',
})
export class SessionEntity extends Model<SessionEntity> {
  @Column({
    primaryKey: true,
    allowNull: false,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.UUID,
    field: 'user_id',
  })
  userId: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    field: 'is_revoked',
  })
  isRevoked: boolean;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    field: 'expires',
  })
  expires: Date | null;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    field: 'time_zone',
  })
  timeZone: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    field: 'refresh_token',
  })
  refreshToken: string;

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
