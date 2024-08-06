import { Injectable } from '@nestjs/common';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { DailyLog } from './entities/daily-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDailyLogDto } from './dto/create-dailylog.dto';

@Injectable()
export class AttendenceService {
  constructor(
    @InjectRepository(Log) private logRepository: Repository<Log>,
    @InjectRepository(DailyLog)
    private dailyLogRepository: Repository<DailyLog>,
  ) {}

  async createLog(createLog: CreateDailyLogDto) {
    try {
      const dailylog = new DailyLog();
      dailylog.vol_id = createLog.vol_id;
      dailylog.Date = createLog.Date;
      const logs = [];
      for (let i = 0; i < createLog.Logs.length; i++) {
        const log = new Log();
        log.hourStart = createLog.Logs[i].hourStart;
        log.minStart = createLog.Logs[i].minStart;
        log.hourEnd = createLog.Logs[i].hourEnd;
        log.minEnd = createLog.Logs[i].minEnd;
        log.activity = createLog.Logs[i].activity;
        log.details = createLog.Logs[i].details;
        logs.push(await this.logRepository.save(log));
      }
      dailylog.Logs = logs;
      return await this.dailyLogRepository.save(dailylog);
    } catch (error) {
      console.error('Error creating log', error);
      return error;
    }
  }
  async getLogById(id: number, Date: Date) {
    const response = await this.dailyLogRepository.findOne({
      where: {
        vol_id: id,
        Date: Date,
      },
      relations: {
        Logs: true,
      },
    });
    if (!response) return {};
    return response;
  }
  async isPocverified(id: number) {
    const log = await this.dailyLogRepository.findOne({
      where: {
        id: id,
      },
    });
    log.isPocVerified = true;
    return await this.dailyLogRepository.save(log);
  }
}
