import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './use-case-unread-notification';

describe('Use Case - Read notification ', () => {
  it('Should be able to read a notification', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(
      notificationRepositoryInMemory,
    );

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepositoryInMemory.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepositoryInMemory.notifications).toHaveLength(1);
    expect(notificationRepositoryInMemory.notifications[0].readAt).toBeNull();
  });

  it('Should NOT be able to read a notification when it does not exist', async () => {
    const notificationRepositoryInMemory =
      new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(
      notificationRepositoryInMemory,
    );

    expect(async () => {
      return unreadNotification.execute({
        notificationId: 'Fake test ID',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
