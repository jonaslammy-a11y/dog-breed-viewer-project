import { flattenBreeds } from '../src/api/dogApi';

describe('flattenBreeds', () => {
  it('flattens breeds with no sub-breeds', () => {
    const input = { message: { bulldog: [], beagle: [] } };
    expect(flattenBreeds(input.message)).toEqual(['beagle', 'bulldog']);
  });

  it('flattens breeds with sub-breeds', () => {
    const input = { message: { bulldog: ['boston', 'french'] } };
    expect(flattenBreeds(input.message)).toEqual(['bulldog - boston', 'bulldog - french']);
  });
});