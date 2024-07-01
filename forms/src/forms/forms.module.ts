import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { FeedbackItem } from './entities/feedbackitem.entity';
import { FeedbackResponse } from './entities/feedbackresponse.entity';
import { FeedbackitemResponse } from './entities/feedbackitemresponse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Feedback,
      FeedbackItem,
      FeedbackResponse,
      FeedbackitemResponse,
    ]),
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
