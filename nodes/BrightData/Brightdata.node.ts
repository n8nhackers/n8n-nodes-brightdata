import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { webUnlockerOperations, webUnlockerFields } from './WebUnlockerDescription';
import { getActiveZones, getCountries } from './SearchFunctions';

export class Brightdata implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BrightData',
		name: 'brightdata',
		icon: 'file:brightdata.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		//subtitle: '={{$parameter["zone"] + ": " + $parameter["country"]}}',
		description: 'Interact with BrightData API',
		defaults: {
			name: 'BrightData',
		},
		inputs: ['main'],
		outputs: ['main'],
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
		}
	};
}
