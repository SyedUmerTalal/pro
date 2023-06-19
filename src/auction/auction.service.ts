import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { PrismaService } from 'src/common/services/prisma.service';
import CreateAuctionInput from './dto/create-auction.input';

@Injectable()
export class AuctionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  findOne({ id, plateId }: { id?: number; plateId?: number }) {
    return this.prismaService.auction.findUnique({ where: { id, plateId } });
  }

  create(createAuctionInput: CreateAuctionInput) {
    return this.prismaService.auction.create({
      data: {
        endAt: createAuctionInput.endAt,
        plateId: createAuctionInput.plateId,
      },
    });
  }

  schedule(endAt: Date) {
    const job = new CronJob(endAt, () => {
      console.log('Auction has been ended. Thank you all for participating.');
    });

    this.schedulerRegistry.addCronJob(`auctionEndAt${endAt}`, job);
    job.start();
  }
}
