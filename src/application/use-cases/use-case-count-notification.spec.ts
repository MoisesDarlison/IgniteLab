import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { CountRecipientNotification } from './use-case-count-notification';

describe('Use Case - Count Recipient Notification ', () => {
  it('Should be able count all notification by Recipient', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepositoryInMemory,
    );

    await notificationRepositoryInMemory.create(
      makeNotification({ recipientId: 'test-recipient-id-01' }),
    );
    await notificationRepositoryInMemory.create(
      makeNotification({ recipientId: 'test-recipient-id-01' }),
    );
    await notificationRepositoryInMemory.create(
      makeNotification({ recipientId: 'test-recipient-id-02' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'test-recipient-id-01',
    });

    expect(count).toBe(2);
  });
});
