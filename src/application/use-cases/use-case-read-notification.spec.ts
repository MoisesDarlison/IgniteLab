import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './use-case-read-notification';

describe('Use Case - Read notification ', () => {
  it('Should be able to read a notification', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(
      notificationRepositoryInMemory,
    );

    const notification = makeNotification();

    await notificationRepositoryInMemory.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepositoryInMemory.notifications).toHaveLength(1);
    expect(notificationRepositoryInMemory.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('Should NOT be able to read a notification when it does not exist', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(
      notificationRepositoryInMemory,
    );

    expect(async () => {
      return readNotification.execute({
        notificationId: 'Fake test ID',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
