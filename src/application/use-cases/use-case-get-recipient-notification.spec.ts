import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { GetRecipientNotification } from './use-case-get-recipient-notification';

describe('Use Case - Get Recipient Notification ', () => {
  it('Should be able get list notification by Recipient', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'test-recipient-id-01',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'test-recipient-id-01' }),
      ]),
    );
  });
});
