import { expect } from 'chai';

describe('natural-brain', () => {
  it('is CommonJS compatible', () => {
    expect(typeof require('../lib')).to.equal('function');
  });
});
