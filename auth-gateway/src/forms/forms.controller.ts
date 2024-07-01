import { Controller } from '@nestjs/common';
import { Post, Body, Inject, Get, Param } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateFeedbackResponseDto } from './dto/createfeedbackresponse.dto';

@Controller('forms')
export class FormsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}
  @Post('create')
  createfeedBackForm(
    @Body() createFeedbackdto: CreateFeedbackDto,
  ): Observable<any> {
    const res1 = this.natsClient.send(
      { cmd: 'createFeedbackForm' },
      createFeedbackdto,
    );
    res1.subscribe((res) => {
      if (res?.receipientType === 'cohort') {
        this.natsClient.send(
          { cmd: 'createCohortNotification' },
          {
            typeofnotification: 'form',
            form_id: res?.id,
            recipient_id: res?.recipientId,
          },
        );
      } else {
        this.natsClient.send(
          { cmd: 'createPocNotification' },
          {
            typeofnotification: 'form',
            form_id: res?.id,
            recipient_id: res?.recipientId,
          },
        );
      }
    });
    return res1;
  }
  @Get('get/:id')
  getfeedBackForm(@Param('id') id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getFeedbackForm' }, id);
  }
  @Post('response')
  response(
    @Body() createFeedbackResponse: CreateFeedbackResponseDto,
  ): Observable<any> {
    return this.natsClient.send({ cmd: 'response' }, createFeedbackResponse);
  }

  @Get('getresponse/:form_id')
  getResponse(@Param('form_id') form_id: number): Observable<any> {
    return this.natsClient.send({ cmd: 'getResponse' }, form_id);
  }
}
