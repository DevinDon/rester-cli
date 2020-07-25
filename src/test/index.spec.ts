import { program, VERSION } from '../main';

describe('Version', () => {

  it('should output `0.0.0`', done => {
    program.parse(['-V']);
    expect(program.args).toEqual(VERSION);
    done();
  });

});
