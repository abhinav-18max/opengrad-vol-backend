import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { FeedbackItem } from './entities/feedbackitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, FeedbackItem])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
