import { BrightData } from '../nodes/BrightData/BrightData.node';

describe('BrightData', () => {
  let node: BrightData;

  beforeEach(() => {
    node = new BrightData();
  });

  it('should be defined', () => {
		expect(node).toBeDefined();
	});

	it('should have the correct properties', () => {
		expect(node.description).toBeDefined();
		expect(node.description.displayName).toBe('BrightData');
		expect(node.description.name).toBe('brightData');
		expect(node.description.icon).toBe('file:brightdatasquared.svg');
		expect(node.description.group).toEqual(["transform"]);
		expect(node.description.version).toBe(1);
	});
});
