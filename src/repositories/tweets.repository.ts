import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TweetEntity } from 'src/entities/tweet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TweetsRepository {
  constructor(
    @InjectRepository(TweetEntity)
    private readonly entityRepository: Repository<TweetEntity>,
  ) {}
  async create(data: Partial<TweetEntity>): Promise<TweetEntity> {
    const tweet = this.entityRepository.create(data);
    return await this.entityRepository.save(tweet);
  }
}
