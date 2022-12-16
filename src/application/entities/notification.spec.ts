import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('Should be able to create a notification', () => {
    const content = new Notification({
      content: new Content('Notification Test'),
      category: 'Test',
      recipientId: 'test-recipient-id',
    });

    expect(content).toBeTruthy();
  });
});
