import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	INodeExecutionData,
	IExecuteFunctions,
	NodeOperationError,
	IDataObject
} from 'n8n-workflow';

import {
	getActiveZones,
	getCountries,
	getDataSets
} from './SearchFunctions';

import {
	brightdataApiRequest
} from './GenericFunctions';

export class BrightData implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BrightData',
		name: 'brightData',
		icon: 'file:brightdatasquared.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Bright Data to scrape websites or use existing datasets from the marketplace to generate adapted snapshots',
		defaults: {
			name: 'BrightData',
		},
		usableAsTool: true,
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'brightdataApi',
				required: false,
			},
		],

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
					{
						name: 'Marketplace Dataset',
						value: 'marketplaceDataset',
					}
				],
				default: 'webUnlocker',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webUnlocker'],
					},
				},
				options: [
					{
						name: 'Send a Request',
						value: 'request',
						action: 'Perform a request',
						routing: {
							request: {
								method: 'POST',
								url: '/request',
							},
						},
					}
				],
				default: 'request',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['marketplaceDataset'],
					},
				},
				options: [
					{
						name: 'List Datasets',
						value: 'listDatasets',
						action: 'List datasets',
						routing: {
							request: {
								method: 'GET',
								url: '/datasets/list',
							},
						},
					}
				],
				default: 'listDatasets',
			},

			{
				displayName: 'Zone',
				name: 'zone',
				type: 'resourceLocator',
				default: {
					mode: 'list',
					value: 'web_unlocker1',
				},
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						placeholder: 'Select a Zone ...',
						typeOptions: {
							searchListMethod: 'getActiveZones',
						},
					},
				],
				required: true,
				description: 'Select the zone',
				displayOptions: {
					show: {
						resource: ['webUnlocker'],
						operation: ['request'],
					},
				},
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'resourceLocator',
				default: {
					mode: 'list',
					value: 'us',
				},
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						placeholder: 'Select a Country ...',
						typeOptions: {
							searchListMethod: 'getCountries',
						},
					},
				],
				required: true,
				description: 'Select the country',
				displayOptions: {
					show: {
						resource: ['webUnlocker'],
						operation: ['request'],
					},
				},
			},
			{
				displayName: 'Method',
				name: 'method',
				type: 'options',
				options: [
					{
						name: 'DELETE',
						value: 'DELETE',
					},
					{
						name: 'GET',
						value: 'GET',
					},
					{
						name: 'HEAD',
						value: 'HEAD',
					},
					{
						name: 'PATCH',
						value: 'PATCH',
					},
					{
						name: 'POST',
						value: 'POST',
					},
					{
						name: 'PUT',
						value: 'PUT',
					},
				],
				default: 'GET',
				required: true,
				description: 'The HTTP method to use',
				displayOptions: {
					show: {
						resource: ['webUnlocker'],
						operation: ['request'],
					},
				},
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				description: 'The URL to send the request to',
				displayOptions: {
					show: {
						resource: ['webUnlocker'],
						operation: ['request'],
					},
				},
			},

			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{
						name: 'Raw',
						value: 'raw',
					},
					{
						name: 'JSON',
						value: 'json',
					},
				],
				default: 'raw',
				required: true,
				description: 'The format of the response',
				displayOptions: {
					show: {
						resource: ['webUnlocker'],
						operation: ['request'],
					},
				},
			},
		],
	};

	methods = {
		listSearch: {
			getActiveZones: getActiveZones,
			getCountries: getCountries,
			getDataSets: getDataSets
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Retrieve the routing info defined for the current operation from the node description
		const operationProperty = this.getNodeParameter('operation', 0);

		console.log('Routing:', operationProperty);

		if (resource === 'marketplaceDataset') {
			if (operation === 'listDatasets') {
				for (let i = 0; i < items.length; i++) {
					const body: IDataObject = {};
					try {
						const responseData = await brightdataApiRequest.call(this, 'GET', '/datasets/list', body);
						returnData.push(responseData);
					} catch (error) {
						throw new NodeOperationError(this.getNode(), error);
					}
				}
			}
		} else if (resource === 'webUnlocker') {
			if (operation === 'request') {
				for (let i = 0; i < items.length; i++) {
					const zoneData = this.getNodeParameter('zone', i) as { value: string };
					const countryData = this.getNodeParameter('country', i) as { value: string };
					const zone = zoneData.value;
					const country = countryData.value;
					const method = this.getNodeParameter('method', i) as string;
					const url = this.getNodeParameter('url', i) as string;
					const format = this.getNodeParameter('format', i) as string;

					const body: IDataObject = {
						zone,
						country,
						method,
						url,
						format,
					};


					try {
						const responseData = await brightdataApiRequest.call(this, 'POST', '/request', body);
						returnData.push(responseData);
					} catch (error) {
						throw new NodeOperationError(this.getNode(), error);
					}
				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
