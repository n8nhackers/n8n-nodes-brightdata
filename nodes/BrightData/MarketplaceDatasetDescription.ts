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
				name: 'Get Snapshot Content',
				value: 'getSnapshotContent',
				action: 'Get dataset snapshot content',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/snapshots/{{id}}/download',
						qs: {
							format: '={{$parameter["format"]}}',
							compress: '={{$parameter["compress"] || false}}',
							batch_size: '={{$parameter["batch_size"]}}',
							part: '={{$parameter["part"]}}',
						},
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
					}
				},
			}
		],
		default: 'listDatasets'
	},
];

// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
const marketplaceDatasetParameters: INodeProperties[] = [
	{
		displayName: 'Dataset',
		name: 'dataset_id',
		type: 'resourceLocator',
		default: {
			mode: 'list',
			value: '',
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
		routing: {
			send: {
				type: 'body'
			},
		},
		required: true,
		description: 'Select the DataSet',
		displayOptions: {
			show: {
				resource: ['marketplaceDataset'],
				operation: ['filterDataset', 'getDatasetMetadata'],
			},
		},
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
		default: 100,
		displayOptions: {
			show: {
				operation: ['filterDataset'],
			},
		},
		description: 'The maximum number of records to include in the snapshot',
	},

	{
		displayName: 'Deliver Type',
		name: 'deliver_type',
		type: 'options',
		options: [
			{
				name: 'Aliyun Object Storage Service',
				value: 'ali_oss',
			},
			{
				name: 'Amazon S3',
				value: 's3',
			},
			{
				name: 'Google Cloud PubSub',
				value: 'pubsub',
			},
			{
				name: 'Google Cloud Storage',
				value: 'gcs',
			},
			{
				name: 'Microsoft Azure',
				value: 'azure',
			},
			{
				name: 'SFTP',
				value: 'sftp',
			},
			{
				name: 'Snowflake',
				value: 'snowflake',
			},
			{
				name: 'Webhook',
				value: 'webhook',
			},
		],
		default: 'webhook',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'deliver.type'
			}
		}
	},

	{
		displayName: 'Parameters',
		name: 'webhook_parameters',
		type: 'collection',
		placeholder: 'Add Webhook Options',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['webhook'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Filename Template',
				name: 'template',
				type: 'string',
				default: '',
				description: 'Template for the filename, including placeholders',
				routing: {
					send: {
						type: 'body',
						property: 'deliver.template'
					}
				}
			},
			{
				displayName: 'Filename Extension',
				name: 'extension',
				type: 'options',
				options: [
					{
						name: 'JSON',
						value: 'json',
					},
					{
						name: 'JSONL',
						value: 'jsonl',
					},
					{
						name: 'CSV',
						value: 'csv',
					},
				],
				default: 'json',
				required: true,
				description: 'Available options: JSON, JSONL, CSV',
				routing: {
					send: {
						type: 'body',
						property: 'deliver.extension'
					}
				}
			}
		],
	},

	{
		displayName: 'GCS Parameters',
		name: 'gcs_parameters',
		type: 'collection',
		placeholder: 'Add GCS Options',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['gcs'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Bucket',
				name: 'bucket',
				type: 'string',
				default: '',
				description: 'Name of the bucket',
				routing: {
					send: {
						type: 'body',
						property: 'deliver.bucket',
					},
				},
			},
			{
				displayName: 'Credentials',
				name: 'credentials',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						displayName: 'Credential',
						name: 'credential',
						values: [
							{
								displayName: 'Client Email',
								name: 'client_email',
								type: 'string',
								default: '',
								routing: {
									send: {
										type: 'body',
										property: 'deliver.credentials.client_email',
									},
								},
							},
							{
								displayName: 'Private Key',
								name: 'private_key',
								type: 'string',
								typeOptions: {
									password: true,
								},
								default: '',
								routing: {
									send: {
										type: 'body',
										property: 'deliver.credentials.private_key',
									},
								},
							},
						],
					},
				],
			},
			{
				displayName: 'Directory',
				name: 'directory',
				type: 'string',
				default: '',
				description: 'Target path',
				routing: {
					send: {
						type: 'body',
						property: 'deliver.directory',
					},
				},
			},
			{
				displayName: 'Filename Extension',
				name: 'extension',
				type: 'options',
				options: [
					{
						name: 'JSON',
						value: 'json',
					},
					{
						name: 'JSONL',
						value: 'jsonl',
					},
					{
						name: 'CSV',
						value: 'csv',
					},
				],
				default: 'json',
				description: 'Available options: JSON, jsonl, csv',
				routing: {
					send: {
						type: 'body',
						property: 'deliver.filename.extension',
					},
				},
			},
			{
				displayName: 'Filename Template',
				name: 'template',
				type: 'string',
				default: '',
				description: 'Template for the filename, including placeholders',
				routing: {
					send: {
						type: 'body',
						property: 'deliver.filename.template',
					},
				},
			},
		],
	},


	//properties for snapshopContent
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
				name: 'JSONL',
				value: 'jsonl',
			},
			{
				name: 'CSV',
				value: 'csv',
			},
		],
		default: 'json',
		description: 'Format of the response. Available options: JSON, JSONL, CSV.',
		displayOptions: {
			show: {
				operation: ['getSnapshotContent'],
			},
		},
		routing: {
			request: {
				qs: {
					format: '={{$parameter["format"]}}',
				},
			},
		},
	},
	{
		displayName: 'Compress',
		name: 'compress',
		type: 'boolean',
		default: false,
		description: 'Whether compress the response in gzip format',
		displayOptions: {
			show: {
				operation: ['getSnapshotContent'],
			},
		},
		routing: {
			request: {
				qs: {
					compress: '={{$parameter["compress"]}}',
				},
			}
		},
	},
	{
		displayName: 'Batch Size',
		name: 'batch_size',
		type: 'number',
		default: 100,
		description: 'Number of records to include in each response batch',
		displayOptions: {
			show: {
				operation: ['getSnapshotContent'],
			},
		},
		routing: {
			request: {
				qs: {
					batch_size: '={{$parameter["batch_size"]}}',
				},
			}
		},
	},
	{
		displayName: 'Part',
		name: 'part',
		type: 'number',
		default: 1,
		description: 'Number of batch to return. The numbering starts from 1.',
		displayOptions: {
			show: {
				operation: ['getSnapshotContent'],
			},
		},
		routing: {
			request: {
				qs: {
					part: '={{$parameter["part"]}}',
				},
			}
		},
	}


	// {
	// 	displayName: 'Format',
	// 	name: 'format',
	// 	type: 'options',
	// 	options: [
	// 		{
	// 			name: 'JSON',
	// 			value: 'json',
	// 		},
	// 		{
	// 			name: 'JSONL',
	// 			value: 'jsonl',
	// 		},
	// 		{
	// 			name: 'CSV',
	// 			value: 'csv',
	// 		},
	// 	],
	// 	default: 'json',
	// 	description: 'Format of the response. Available options: JSON, JSONL, CSV.',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['getSnapshotContent'],
	// 		},
	// 	},
	// 	routing: {
	// 		send: {
	// 			type: 'query',
	// 		},
	// 	},
	// },

	// {
	// 	displayName: 'Compress',
	// 	name: 'compress',
	// 	type: 'boolean',
	// 	default: false,
	// 	description: 'Whether to compress the response in gzip format',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['getSnapshotContent'],
	// 		},
	// 	},
	// 	routing: {
	// 		send: {
	// 			type: 'query',
	// 		},
	// 	},
	// },
	// {
	// 	displayName: 'Batch Size',
	// 	name: 'batch_size',
	// 	type: 'number',
	// 	default: 100,
	// 	description: 'Number of records to include in each response batch',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['getSnapshotContent'],
	// 		},
	// 	},
	// 	routing: {
	// 		send: {
	// 			type: 'query',
	// 		},
	// 	},
	// },
	// {
	// 	displayName: 'Part',
	// 	name: 'part',
	// 	type: 'number',
	// 	default: 1,
	// 	description: 'Number of batch to return. The numbering starts from 1.',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['getSnapshotContent'],
	// 		},
	// 	},
	// 	routing: {
	// 		send: {
	// 			type: 'query',
	// 		},
	// 	},
	// },

];

export const marketplaceDatasetFields: INodeProperties[] = [...marketplaceDatasetParameters];
