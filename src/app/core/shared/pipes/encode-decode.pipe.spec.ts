import { DecodePipe, EncodePipe } from './encode-decode.pipe';

describe('EncodeDecodePipe', () => {
  it('create an instance', () => {
    const epipe = new EncodePipe();
    expect(epipe).toBeTruthy();

    const dpipe = new DecodePipe();
    expect(dpipe).toBeTruthy();
  });
});
