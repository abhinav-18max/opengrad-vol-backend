import { Controller } from '@nestjs/common';
import { FormsService } from './forms.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { CreateFeedbackResponseDto } from './dto/createfeedbackresponse.dto';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}
  @MessagePattern({ cmd: 'createFeedbackForm' })
  async createfeedBackForm(@Payload() createFeedbackdto: CreateFeedbackDto) {
    return await this.formsService.createfeedBackForm(createFeedbackdto);
  }

  @MessagePattern({ cmd: 'getFeedbackForm' })
  async getfeedBackForm(@Payload() id: number) {
    return await this.formsService.getfeedBackForm(id);
  }

  @MessagePattern({ cmd: 'response' })
  async Response(@Payload() createFeedbackResponse: CreateFeedbackResponseDto) {
    return await this.formsService.Response(createFeedbackResponse);
  }
  @MessagePattern({ cmd: 'getResponse' })
  async getResponse(@Payload() form_id: number) {
    return await this.formsService.getResponse(form_id);
  }
}
