import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { CancelNotification } from './use-case-cancel-notification';

describe('Use Case - Cancel notification ', () => {
  it('Should be able to cancel a notification', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      notificationRepositoryInMemory,
    );

    const notification = makeNotification();

    await notificationRepositoryInMemory.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepositoryInMemory.notifications).toHaveLength(1);
    expect(notificationRepositoryInMemory.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should NOT be able to cancel a notification when it does not exist', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(
      notificationRepositoryInMemory,
    );

    expect(async () => {
      return cancelNotification.execute({
        notificationId: 'Fake test ID',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
