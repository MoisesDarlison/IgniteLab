import { Content } from './content';

describe('Notification content ', () => {
  it('Should be able to create a notification content', () => {
    const content = new Content('Notificação ja esta ai cabra?');

    expect(content).toBeTruthy();
  });

  it('Should NOT be able to create a notification content wSa less than 5 characters', () => {
    expect(() => new Content('1234')).toThrow();
  });

  it('Should NOT be able to create a notification content with a more than 240 characters', () => {
    expect(() => new Content('0'.repeat(241))).toThrow();
  });
});
