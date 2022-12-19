import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { SendNotification } from './use-case-send-notification';

describe('Use Case - Send notification ', () => {
  it('Should be able to send a notification', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(
      notificationRepositoryInMemory,
    );

    const { notification } = await sendNotification.execute({
      content: 'Use case - send notification',
      category: 'test',
      recipientId: 'test-recipient-id',
    });

    expect(notificationRepositoryInMemory.notifications).toHaveLength(1);
    expect(notificationRepositoryInMemory.notifications[0]).toEqual(
      notification,
    );
  });
});
