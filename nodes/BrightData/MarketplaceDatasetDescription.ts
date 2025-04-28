import { INodeProperties } from 'n8n-workflow';

// When the resource `` is selected, this `operation` parameter will be shown.
export const marketplaceDatasetOperations: INodeProperties[] = [
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
				name: 'Deliver Snapshot',
				value: 'deliverSnapshot',
				action: 'Deliver the dataset snapshot',
				routing: {
					request: {
						method: 'POST',
						url: '/datasets/snapshots/{{id}}/deliver',
						body: {
							deliver: '={{$parameter["deliver"]}}',
							compress: '={{$parameter["compress"] || false}}',
						},
					},
				},
			},
			{
				name: 'Filter Dataset',
				value: 'filterDataset',
				action: 'Create a dataset snapshot based on a provided filter',
				routing: {
					request: {
						method: 'POST',
						url: '/datasets/filter',
						body: {
							dataset_id: '={{$parameter["dataset_id"]}}',
							filter: '={{$parameter["filter"]}}',
							records_limit: '={{$parameter["records_limit"] || undefined}}',
						},
					},
				},
			},
			{
				name: 'Get Snapshot Content',
				value: 'getSnapshotContent',
				action: 'Get dataset snapshot content',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/snapshots/{{id}}/download',
					},
				},
			},
			{
				name: 'Get Dataset Metadata',
				value: 'getDatasetMetadata',
				action: 'Retrieve detailed metadata for a specific dataset',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/{{dataset_id}}/metadata',
					},
				},
			},
			{
				name: 'Get Snapshot Metadata',
				value: 'getSnapshotMetadata',
				action: 'Get dataset snapshot metadata',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/snapshots/{{id}}',
					},
				},
			},
			{
				name: 'Get Snapshot Parts',
				value: 'getSnapshotParts',
				action: 'Get dataset snapshot delivery parts',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/snapshots/{{id}}/parts',
					},
				},
			},
			{
				name: 'List Datasets',
				value: 'listDatasets',
				action: 'Retrieve a list of available datasets',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/list',
					},
				},
			}
		],
		default: 'listDatasets'
	},
];

// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
const requestOperation: INodeProperties[] = [
	{
		displayName: 'Dataset',
		name: 'dataset_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['getMetadata', 'filterDataset'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a DataSet ...',
				typeOptions: {
					searchListMethod: 'getDataSets',
				},
			},
		],
		required: true,
		description: 'The ID of the dataset to operate on',
	},
	{
		displayName: 'Snapshot ID',
		name: 'id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['getSnapshotMetadata', 'getSnapshotParts', 'getSnapshotContent', 'deliverSnapshot'],
			},
		},
		required: true,
		description: 'The ID of the snapshot to operate on',
	},
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				operation: ['filterDataset'],
			},
		},
		required: true,
		description: 'The filter to apply to the dataset',
	},
	{
		displayName: 'Records Limit',
		name: 'records_limit',
		type: 'number',
		default: null,
		displayOptions: {
			show: {
				operation: ['filterDataset'],
			},
		},
		description: 'The maximum number of records to include in the snapshot',
	},
	{
		displayName: 'Deliver',
		name: 'deliver',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
			},
		},
		required: true,
		description: 'Whether to deliver the snapshot',
	},
	{
		displayName: 'Compress',
		name: 'compress',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
			},
		},
		description: 'Whether to compress the snapshot',
	},

];

export const marketplaceDatasetFields: INodeProperties[] = [...requestOperation];
