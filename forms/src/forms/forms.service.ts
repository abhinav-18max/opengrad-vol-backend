import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackItem } from './entities/feedbackitem.entity';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/createFeedback.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(FeedbackItem)
    private feedbackItemRepository: Repository<FeedbackItem>,
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async createfeedBackForm(createFeedbackDto: CreateFeedbackDto) {
    try {
      const feedback = new Feedback();
      feedback.recipientType = createFeedbackDto.receipientType;
      feedback.recipientId = createFeedbackDto.receipientId;
      feedback.feedbackIitemCount = createFeedbackDto.feedbackItemCount;
      const items: FeedbackItem[] = [];
      for (let j = 0; j < createFeedbackDto.feedbackItems.length; j++) {
        const feedbackitem = new FeedbackItem();
        feedbackitem.type = createFeedbackDto.feedbackItems[j].type;
        feedbackitem.question = createFeedbackDto.feedbackItems[j].question;
        feedbackitem.option_count =
          createFeedbackDto.feedbackItems[j].option_count;
        feedbackitem.options = createFeedbackDto.feedbackItems[j].options;
        items.push(await this.feedbackItemRepository.save(feedbackitem));
      }
      feedback.feedbackItems = items;
      return await this.feedbackRepository.save(feedback);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async getfeedBackForm(id: number, cohortId: number, pocId: number) {
    try {
      const feedBackForm1 = await this.feedbackRepository.findOne({
        where: { id: id, recipientId: cohortId, recipientType:'cohort' },
        relations: {
          feedbackItems: true,
        },
      });
      if (feedBackForm1) {
        return feedBackForm1;
      }
      const feedBackForm2 = await this.feedbackRepository.findOne({
        where: { id: id, recipientId: pocId, recipientType:'poc' },
        relations: {
          feedbackItems: true,
        },
      });
      if (feedBackForm2) {
        return feedBackForm2;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
