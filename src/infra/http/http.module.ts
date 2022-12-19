import { CancelNotification } from '@application/use-cases/use-case-cancel-notification';
import { CountRecipientNotification } from '@application/use-cases/use-case-count-notification';
import { GetRecipientNotification } from '@application/use-cases/use-case-get-recipient-notification';
import { ReadNotification } from '@application/use-cases/use-case-read-notification';
import { UnreadNotification } from '@application/use-cases/use-case-unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/use-case-send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
