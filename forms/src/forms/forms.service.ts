import { FeedbackitemResponse } from './entities/feedbackitemresponse.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackItem } from './entities/feedbackitem.entity';
import { Repository } from 'typeorm';
import { Feedback, FeedbackType } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { CreateFeedbackResponseDto } from './dto/createfeedbackresponse.dto';
import { FeedbackResponse } from './entities/feedbackresponse.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(FeedbackItem)
    private feedbackItemRepository: Repository<FeedbackItem>,
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(FeedbackResponse)
    private FeedbackResponse: Repository<FeedbackResponse>,
    @InjectRepository(FeedbackitemResponse)
    private FeedbackitemResponse: Repository<FeedbackitemResponse>,
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
  async getfeedBackForm(id: number) {
    try {
      return await this.feedbackRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          feedbackItems: true,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async Response(createFeedbackResponse: CreateFeedbackResponseDto) {
    try {
      const feedbackresponse = new FeedbackResponse();
      feedbackresponse.form_id = createFeedbackResponse.form_id;
      feedbackresponse.vol_id = createFeedbackResponse.vol_id;
      feedbackresponse.feedbackitemResponses = [];
      for (
        let i = 0;
        i < createFeedbackResponse.feedbackitemResponses.length;
        i++
      ) {
        const feedbackitemresponse = new FeedbackitemResponse();
        feedbackitemresponse.feedbackitem_id =
          createFeedbackResponse.feedbackitemResponses[i].feedbackitem_id;
        feedbackitemresponse.item_type =
          createFeedbackResponse.feedbackitemResponses[i].item_type;
        feedbackitemresponse.option_ans =
          createFeedbackResponse.feedbackitemResponses[i].option_ans;
        feedbackitemresponse.descr_ans =
          createFeedbackResponse.feedbackitemResponses[i].descr_ans;
        feedbackitemresponse.question =
          createFeedbackResponse.feedbackitemResponses[i].question;
        feedbackresponse.feedbackitemResponses.push(
          await this.FeedbackitemResponse.save(feedbackitemresponse),
        );
      }
      return await this.FeedbackResponse.save(feedbackresponse);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getResponse(form_id: number) {
    try {
      const feedbackresponse = await this.FeedbackResponse.find({
        where: { form_id: form_id },
        relations: {
          feedbackitemResponses: true,
        },
      });
      return feedbackresponse;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
