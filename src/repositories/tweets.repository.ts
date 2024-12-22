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
}
