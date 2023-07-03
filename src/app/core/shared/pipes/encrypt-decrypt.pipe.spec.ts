import { DecryptPipe, EncryptPipe } from './encrypt-decrypt.pipe';

describe('EncryptDecryptPipe', () => {
  it('create an instance', () => {
    const epipe = new EncryptPipe();
    expect(epipe).toBeTruthy();

    const Dpipe = new DecryptPipe();
    expect(Dpipe).toBeTruthy();
  });
});
