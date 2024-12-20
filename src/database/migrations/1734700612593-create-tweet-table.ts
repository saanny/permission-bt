import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTweetTable1734700612593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           CREATE TYPE tweet_category_enum AS ENUM ('GENERAL', 'NEWS', 'TECH')
       `);

    await queryRunner.createTable(
      new Table({
        name: 'tweets',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'author_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'hashtags',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'parent_tweet_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'tweet_category_enum',
            isNullable: true,
            default: "'GENERAL'",
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tweets',
      new TableForeignKey({
        name: 'fk_tweet_author',
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tweets',
      new TableForeignKey({
        name: 'fk_tweet_parent',
        columnNames: ['parent_tweet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tweets',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.query(`
           CREATE INDEX idx_tweets_author ON tweets(author_id)
       `);

    await queryRunner.query(`
           CREATE INDEX idx_tweets_parent ON tweets(parent_tweet_id)
       `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tweets_author`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_tweets_parent`);

    await queryRunner.dropForeignKey('tweets', 'fk_tweet_author');
    await queryRunner.dropForeignKey('tweets', 'fk_tweet_parent');

    await queryRunner.dropTable('tweets');

    await queryRunner.query(`DROP TYPE IF EXISTS tweet_category_enum`);
  }
}
