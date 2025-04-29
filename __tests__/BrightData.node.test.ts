import { BrightData } from '../nodes/BrightData/BrightData.node';
import { NodeOperationError } from 'n8n-workflow';

describe('BrightData', () => {
  let node: BrightData;

  beforeEach(() => {
    node = new BrightData();
  });

  it('should be defined', () => {
		expect(node).toBeDefined();
	});
});
