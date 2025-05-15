import { INodeProperties } from 'n8n-workflow';

// When the resource `` is selected, this `operation` parameter will be shown.
export const webScrapperOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webScrapper'],
			},
		},
		options: [

			{
				name: 'Get Snapshots',
				value: 'getSnapshots',
				action: 'Get filtered snapshots',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/v3/snapshots',
						qs: {
							dataset_id: '={{$parameter["dataset_id"]}}'
						},
					},
				},
			},

			{
				name: 'Monitor Progress Snapshot',
				value: 'monitorProgressSnapshot',
				action: 'Monitor the progress of a snapshot',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/v3/progress/{{$parameter["snapshot_id"]}}',
					},
				},
			},

			{
				name: 'Scrape By URL',
				value: 'scrapeByUrl',
				action: 'Scrape data synchronously by URL',
				routing: {
					request: {
						method: 'POST',
						url: '/datasets/v3/scrape',
						qs: {
							dataset_id: '={{$parameter["dataset_id"]}}'
						},
					},
				},
			},
			{
				name: 'Trigger Collection By URL',
				value: 'triggerCollectionByUrl',
				action: 'Trigger a collection and generate a snapshot by URL',
				routing: {
					request: {
						method: 'POST',
						url: '/datasets/v3/trigger',
						qs: {
							dataset_id: '={{$parameter["dataset_id"]}}',
						},
					},
				},
			},
		],
		default: 'scrapeByUrl',
	},
];

// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
const webScrapperParameters: INodeProperties[] = [

	{
		displayName: 'Dataset',
		name: 'dataset_id',
		type: 'resourceLocator',
		default: {
			mode: 'list',
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a DataSet ...',
				typeOptions: {
					searchListMethod: 'getDataSets',
					searchable: true,
				},
			},
		],
		required: true,
		description: 'Select the DataSet',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: [
					'getSnapshots',
					'scrapeByUrl',
					'triggerCollectionByUrl',
				],
			},
		},
	},

	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'ready',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: ['getSnapshots'],
			},
		},
		options: [
			{
				name: 'Building',
				value: 'building',
			},
			{
				name: 'Canceled',
				value: 'canceled',
			},
			{
				name: 'Collecting',
				value: 'collecting',
			},
			{
				name: 'Delivering',
				value: 'delivering',
			},
			{
				name: 'Digesting',
				value: 'digesting',
			},
			{
				name: 'Failed',
				value: 'failed',
			},
			{
				name: 'Pending Developer Review',
				value: 'pending_developer_review',
			},
			{
				name: 'Pending Discovery Input',
				value: 'pending_discovery_input',
			},
			{
				name: 'Pending Owner Review',
				value: 'pending_owner_review',
			},
			{
				name: 'Pending PDP Input',
				value: 'pending_pdp_input',
			},
			{
				name: 'Queued For Developer Review',
				value: 'queued_for_developer_review',
			},
			{
				name: 'Ready',
				value: 'ready',
			},
			{
				name: 'Rolling Back',
				value: 'rolling_back',
			},
			{
				name: 'Scheduled',
				value: 'scheduled',
			},
			{
				name: 'Validating',
				value: 'validating',
			},
		],
		description: 'The status of the snapshot to filter the snapshots',
	},

	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		default: 0,
		description: 'Number of snapshots to skip',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: ['getSnapshots'],
			},
		},
		routing: {
			request: {
				qs: {
					skip: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: ['getSnapshots'],
			},
		},
		routing: {
			request: {
				qs: {
					limit: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'From Date',
		name: 'from_date',
		type: 'dateTime',
		default: '',
		description: 'Start date to filter snapshots (ISO 8601 format)',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: ['getSnapshots'],
			},
		},
		routing: {
			request: {
				qs: {
					from_date: '={{$value}}',
				},
			},
		},
		required: true,
	},
	{
		displayName: 'To Date',
		name: 'to_date',
		type: 'dateTime',
		default: '',
		description: 'End date to filter snapshots (ISO 8601 format)',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: ['getSnapshots'],
			},
		},
		routing: {
			request: {
				qs: {
					to_date: '={{$value}}',
				},
			},
		},
		required: true,
	},

	{
		displayName: 'Snapshot ID',
		name: 'snapshot_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: [
					'monitorProgressSnapshot',
				],
			},
		},
		required: true,
		description: 'The ID of the snapshot to operate on',
	},



	{
		displayName: 'URLs',
		name: 'urls',
		type: 'json',
		default: '[{"url":"https://www.linkedin.com/in/bulentakar"}]',
		description: 'The URLs to trigger the snapshot',
		required: true,
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: ['triggerCollectionByUrl', 'scrapeByUrl'],
			},
		},
		routing: {
			send: {
				type: 'body',
			},
		},
	},

	{
		displayName: 'Include Errors',
		name: 'include_errors',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: [
					'scrapeByUrl',
				],
			},
		},
		required: true,
		description: 'Whether to include errors in the response',
	},

	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		options: [
			{
				name: 'JSON',
				value: 'json',
			},
			{
				name: 'CSV',
				value: 'csv',
			},
		],
		default: 'json',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: [
					'scrapeByUrl',
				],
			},
		},
		description: 'The format of the data to be returned',
	},

	{
		displayName: 'Endpoint',
		name: 'endpoint',
		type: 'string',
		default: 'https://brightdata-test.free.beeceptor.com',
		description: 'The endpoint to send the data obtained from the snapshot',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: ['triggerCollectionByUrl'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'endpoint',
			},
		},
	},

	{
		displayName: 'Notify',
		name: 'notify',
		type: 'string',
		default: '',
		description: 'The URL to notify when the collection is finished',
		displayOptions: {
			show: {
				resource: ['webScrapper'],
				operation: ['triggerCollectionByUrl'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'notify',
			},
		},
	},

];

export const webScrapperFields: INodeProperties[] = [...webScrapperParameters];
