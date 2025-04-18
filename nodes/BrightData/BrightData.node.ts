import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import { webUnlockerOperations, webUnlockerFields } from './WebUnlockerDescription';
// import { marketplaceDatasetOperations, marketplaceDatasetFields } from './MarketplaceDatasetDescription';
import { getActiveZones, getCountries } from './SearchFunctions';

export class BrightData implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BrightData',
		name: 'brightData',
		icon: 'file:brightdatasquared.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		//subtitle: '={{$parameter["zone"] + ": " + $parameter["country"]}}',
		description: 'Interact with BrightData API',
		defaults: {
			name: 'BrightData',
		},
		inputs: [{ type: NodeConnectionType.Main }],
		outputs: [{ type: NodeConnectionType.Main }],
		credentials: [
			{
				name: 'brightdataApi',
				required: false,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.brightdata.com',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Web Unlocker',
						value: 'webUnlocker',
					},
				],
				default: 'webUnlocker',
			},
			...webUnlockerOperations,
			...webUnlockerFields,
		],
	};

	methods = {
		listSearch: {
			getActiveZones: getActiveZones,
			getCountries: getCountries,
		},
	};
}
