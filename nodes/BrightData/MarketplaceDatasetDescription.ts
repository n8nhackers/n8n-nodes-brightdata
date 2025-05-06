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
						url: '/datasets/snapshots/{{$parameter["snapshot_id"]}}/deliver',
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
							records_limit: '={{$parameter["records_limit"]}}',
							filter: '={{$parameter["filter"]}}',
							dataset_id: '={{$parameter["dataset_id"]}}',
						}
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
						url: '=/datasets/{{$parameter["dataset_id"]}}/metadata',
					},
				}
			},

			{
				name: 'Get Snapshot Content',
				value: 'getSnapshotContent',
				action: 'Get dataset snapshot content',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets/snapshots/{{$parameter["snapshot_id"]}}/content',
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
						url: '/datasets/snapshots/{{$parameter["snapshot_id"]}}/metadata',
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
						url: '/datasets/snapshots/{{$parameter["snapshot_id"]}}/parts',
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
				resource: ['marketplaceDataset'],
				operation: ['getDatasetMetadata', 'filterDataset'],
			},
		},
	},

	{
		displayName: 'Snapshot ID',
		name: 'snapshot_id',
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
		displayName: 'Records Limit',
		name: 'records_limit',
		type: 'number',
		default: 100,
		displayOptions: {
			show: {
				operation: ['filterDataset'],
			},
		},
		description: 'The maximum number of records to include in the snapshot'
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
					compress: '={{$value}}',
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
					batch_size: '={{$value}}',
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
					part: '={{$value}}',
				},
			}
		},
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
		}
	},

	// {
	// 	displayName: 'Filter',
	// 	name: 'filter',
	// 	type: 'json',
	// 	placeholder: 'Enter filter JSON. E.g.: {"name": "name", "operator": "=", "value": "John"} or {"operator": "and", "filters": [ {"name": "name", "operator": "=", "value": "John"}, {"name": "age", "operator": ">", "value": "30"} ] }',
	// 	default: '{"operator":"and","filters":[{"name":"id","value":"510864778","case_sensitive":true,"operator":"="}]}}',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['filterDataset'],
	// 		},
	// 	},
	// 	description: 'JSON filter. Supports a simple filter or a composite filter (using "and" with filters array).',
	// },

	{
		displayName: 'Filter Type',
		name: 'filter_type',
		type: 'options',
		options: [
			{
				name: 'Group Filters',
				value: 'filters_group',
			},
			{
				name: 'Single Filter',
				value: 'filter_single',
			},

		],
		default: 'filter_single',
		displayOptions: {
			show: {
				operation: ['filterDataset'],
			},
		},
		description: 'Type of filter to apply. Simple filter or multiple filter (using "and" with filters array).',
	},

	{
		displayName: 'Field Name',
		name: 'field_name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['filterDataset'],
				filter_type: ['filter_single'],
			},
		},
		description: 'Field name to filter on',
		routing: {
			request: {
				body: {
					filter: {
						name: '={{$parameter["field_name"]}}',
					},
				},
			},
		},
	},

	{
		displayName: 'Operator',
		name: 'field_operator',
		type: 'options',
		options: [
			{
				name: 'Array Includes',
				value: 'array_includes',
			},
			{
				name: 'Equals',
				value: '=',
			},
			{
				name: 'Greater Than',
				value: '>',
			},
			{
				name: 'Greater Than or Equal To',
				value: '>=',
			},
			{
				name: 'In',
				value: 'in',
			},
			{
				name: 'Includes',
				value: 'includes',
			},
			{
				name: 'Less Than',
				value: '<',
			},
			{
				name: 'Less Than or Equal To',
				value: '<=',
			},
			{
				name: 'Not Array Includes',
				value: 'not_array_includes',
			},
			{
				name: 'Not Equals',
				value: '!=',
			},
			{
				name: 'Not In',
				value: 'not_in',
			},
			{
				name: 'Not Includes',
				value: 'not_includes',
			},
		],
		default: '=',
		noDataExpression: true,
		displayOptions: {
			show: {
				operation: ['filterDataset'],
				filter_type: ['filter_single'],
			},
		},
		description: 'Operator to use for the filter',
		routing: {
			request: {
				body: {
					filter: {
						operator: '={{$parameter["field_operator"]}}',
					},
				},
			},
		},
	},

	{
		displayName: 'Field Value',
		name: 'field_value',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['filterDataset'],
				filter_type: ['filter_single'],
			},
		},
		description: 'Value to filter on',
		routing: {
			request: {
				body: {
					filter: {
						value: '={{$parameter["field_value"]}}',
					},
				},
			},
		},
	},

	{
		displayName: 'Filters Group',
		name: 'filters_group',
		type: 'json',
		placeholder: 'Enter filter JSON. E.g.: {"name": "name", "operator": "=", "value": "John"} or {"operator": "and", "filters": [ {"name": "name", "operator": "=", "value": "John"}, {"name": "age", "operator": ">", "value": "30"} ] }',
		default: '{"operator":"","filters":[{"name":"","operator":"","value":""}]}',
		displayOptions: {
			show: {
				operation: ['filterDataset'],
				filter_type: ['filters_group'],
			},
		},
		description: 'JSON filter. Supports a simple filter or a composite filter (using "and" with filters array).',
		routing: {
			request: {
				body: {
					filter_type: '={{$value}}',
				},
			},
		},
	},



	// {
	// 	displayName: 'Deliver Type',
	// 	name: 'deliver_type',
	// 	type: 'options',
	// 	options: [
	// 		{
	// 			name: 'Aliyun Object Storage Service',
	// 			value: 'ali_oss',
	// 		},
	// 		{
	// 			name: 'Amazon S3',
	// 			value: 's3',
	// 		},
	// 		{
	// 			name: 'Google Cloud PubSub',
	// 			value: 'pubsub',
	// 		},
	// 		{
	// 			name: 'Google Cloud Storage',
	// 			value: 'gcs',
	// 		},
	// 		{
	// 			name: 'Microsoft Azure',
	// 			value: 'azure',
	// 		},
	// 		{
	// 			name: 'SFTP',
	// 			value: 'sftp',
	// 		},
	// 		{
	// 			name: 'Snowflake',
	// 			value: 'snowflake',
	// 		},
	// 		{
	// 			name: 'Webhook',
	// 			value: 'webhook',
	// 		},
	// 	],
	// 	default: 'webhook',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 		},
	// 	},
	// 	routing: {
	// 		send: {
	// 			type: 'body',
	// 			property: 'deliver.type'
	// 		}
	// 	}
	// },

	// {
	// 	displayName: 'Webhook Parameters',
	// 	name: 'webhook_parameters',
	// 	type: 'collection',
	// 	placeholder: 'Add Webhook Options',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 			deliver_type: ['webhook'],
	// 		},
	// 	},
	// 	default: {},
	// 	options: [
	// 		{
	// 			displayName: 'Endpoint',
	// 			name: 'endpoint',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Webhook URL to send the data to',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.endpoint'
	// 				}
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Filename Template',
	// 			name: 'template',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Template for the filename, including placeholders',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.template'
	// 				}
	// 			}
	// 		},
	// 		{
	// 			displayName: 'Filename Extension',
	// 			name: 'extension',
	// 			type: 'options',
	// 			options: [
	// 				{
	// 					name: 'JSON',
	// 					value: 'json',
	// 				},
	// 				{
	// 					name: 'JSONL',
	// 					value: 'jsonl',
	// 				},
	// 				{
	// 					name: 'CSV',
	// 					value: 'csv',
	// 				},
	// 			],
	// 			default: 'json',
	// 			required: true,
	// 			description: 'Available options: JSON, JSONL, CSV',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.extension'
	// 				}
	// 			}
	// 		}
	// 	],
	// },

	// {
	// 	displayName: 'GCS Parameters',
	// 	name: 'gcs_parameters',
	// 	type: 'collection',
	// 	placeholder: 'Add GCS Options',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 			deliver_type: ['gcs'],
	// 		},
	// 	},
	// 	default: {},
	// 	options: [
	// 		{
	// 			displayName: 'Bucket',
	// 			name: 'bucket',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Name of the bucket',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.bucket',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Credentials',
	// 			name: 'credentials',
	// 			type: 'fixedCollection',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Credential',
	// 					name: 'credential',
	// 					values: [
	// 						{
	// 							displayName: 'Client Email',
	// 							name: 'client_email',
	// 							type: 'string',
	// 							default: '',
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.client_email',
	// 								},
	// 							},
	// 						},
	// 						{
	// 							displayName: 'Private Key',
	// 							name: 'private_key',
	// 							type: 'string',
	// 							typeOptions: {
	// 								password: true,
	// 							},
	// 							default: '',
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.private_key',
	// 								},
	// 							},
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Directory',
	// 			name: 'directory',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Target path',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.directory',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Filename Extension',
	// 			name: 'extension',
	// 			type: 'options',
	// 			options: [
	// 				{
	// 					name: 'JSON',
	// 					value: 'json',
	// 				},
	// 				{
	// 					name: 'JSONL',
	// 					value: 'jsonl',
	// 				},
	// 				{
	// 					name: 'CSV',
	// 					value: 'csv',
	// 				},
	// 			],
	// 			default: 'json',
	// 			description: 'Available options: JSON, jsonl, csv',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.filename.extension',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Filename Template',
	// 			name: 'template',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Template for the filename, including placeholders',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.filename.template',
	// 				},
	// 			},
	// 		},
	// 	],
	// },

	// {
	// 	displayName: 'Google Cloud PubSub Parameters',
	// 	name: 'pubsub_parameters',
	// 	type: 'collection',
	// 	placeholder: 'Add Google Cloud PubSub Options',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 			deliver_type: ['pubsub'],
	// 		},
	// 	},
	// 	default: {},
	// 	options: [
	// 		{
	// 			displayName: 'Filename',
	// 			name: 'filename',
	// 			type: 'fixedCollection',
	// 			default: {},
	// 			typeOptions: {
	// 				multipleValues: false,
	// 			},
	// 			options: [
	// 				{
	// 					displayName: 'Filename Properties',
	// 					name: 'filenameProperties',
	// 					values: [
	// 						{
	// 							displayName: 'Template',
	// 							name: 'template',
	// 							type: 'string',
	// 							default: '',
	// 							description: 'Template for the filename, including placeholders',
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.filename.template',
	// 								},
	// 							},
	// 							required: true,
	// 						},
	// 						{
	// 							displayName: 'Extension',
	// 							name: 'extension',
	// 							type: 'options',
	// 							options: [
	// 								{
	// 									name: 'JSON',
	// 									value: 'json',
	// 								},
	// 								{
	// 									name: 'JSONL',
	// 									value: 'jsonl',
	// 								},
	// 								{
	// 									name: 'CSV',
	// 									value: 'csv',
	// 								},
	// 							],
	// 							default: 'json',
	// 							description: 'Available options: JSON, JSONL, CSV',
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.filename.extension',
	// 								},
	// 							},
	// 							required: true,
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Topic ID',
	// 			name: 'topic_id',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'The ID of the topic to publish to',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.topic_id',
	// 				},
	// 			},
	// 			required: true,
	// 		},
	// 		{
	// 			displayName: 'Credentials',
	// 			name: 'credentials',
	// 			type: 'fixedCollection',
	// 			default: {},
	// 			typeOptions: {
	// 				multipleValues: false,
	// 			},
	// 			options: [
	// 				{
	// 					displayName: 'Credential',
	// 					name: 'credential',
	// 					values: [
	// 						{
	// 							displayName: 'Client Email',
	// 							name: 'client_email',
	// 							type: 'string',
	// 							default: '',
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.client_email',
	// 								},
	// 							},
	// 							required: true,
	// 						},
	// 						{
	// 							displayName: 'Private Key',
	// 							name: 'private_key',
	// 							type: 'string',
	// 							typeOptions: {
	// 								password: true,
	// 							},
	// 							default: '',
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.private_key',
	// 								},
	// 							},
	// 							required: true,
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Attributes',
	// 			name: 'attributes',
	// 			type: 'collection',
	// 			typeOptions: {
	// 				multipleValues: true,
	// 			},
	// 			placeholder: 'Add Attribute',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Key',
	// 					name: 'key',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Attribute key',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.attributes[].key',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Value',
	// 					name: 'value',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Attribute value',
	// 					required: true,
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.attributes[].value',
	// 						},
	// 					},
	// 				},
	// 			],
	// 		},
	// 	],
	// },

	// {
	// 	displayName: 'S3 Parameters',
	// 	name: 's3_parameters',
	// 	type: 'collection',
	// 	placeholder: 'Add S3 Options',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 			deliver_type: ['s3'],
	// 		},
	// 	},
	// 	default: {},
	// 	options: [
	// 		{
	// 			displayName: 'Bucket',
	// 			name: 'bucket',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Name of the bucket',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.bucket',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Credentials',
	// 			name: 'credentials',
	// 			type: 'collection',
	// 			placeholder: 'Add AWS Credentials',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'AWS Access Key',
	// 					name: 'aws-access-key',
	// 					type: 'string',
	// 					default: '',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.aws-access-key',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'AWS Secret Key',
	// 					name: 'aws-secret-key',
	// 					type: 'string',
	// 					typeOptions: {
	// 						password: true,
	// 					},
	// 					default: '',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.aws-secret-key',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Role ARN',
	// 					name: 'role_arn',
	// 					type: 'string',
	// 					default: '',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.role_arn',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'External ID',
	// 					name: 'external_id',
	// 					type: 'string',
	// 					default: '',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.external_id',
	// 						},
	// 					},
	// 				},
	// 			],
	// 			required: true,
	// 		},
	// 		{
	// 			displayName: 'Directory',
	// 			name: 'directory',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Target path',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.directory',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Filename',
	// 			name: 'filename',
	// 			type: 'collection',
	// 			placeholder: 'Add Filename Options',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Template',
	// 					name: 'template',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Template for the filename, including placeholders',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.template',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Extension',
	// 					name: 'extension',
	// 					type: 'options',
	// 					options: [
	// 						{
	// 							name: 'JSON',
	// 							value: 'json',
	// 						},
	// 						{
	// 							name: 'JSONL',
	// 							value: 'jsonl',
	// 						},
	// 						{
	// 							name: 'CSV',
	// 							value: 'csv',
	// 						},
	// 					],
	// 					default: 'json',
	// 					description: 'Available options: JSON, jsonl, csv',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.extension',
	// 						},
	// 					},
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Region',
	// 			name: 'region',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'AWS Region',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.region',
	// 				},
	// 			},
	// 		},
	// 	],
	// },

	// {
	// 	displayName: 'Snowflake Parameters',
	// 	name: 'snowflake_parameters',
	// 	type: 'collection',
	// 	placeholder: 'Add Snowflake Options',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 			deliver_type: ['snowflake'],
	// 		},
	// 	},
	// 	default: {},
	// 	options: [
	// 		{
	// 			displayName: 'Credentials',
	// 			name: 'credentials',
	// 			type: 'collection',
	// 			placeholder: 'Add Snowflake Credentials',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Account',
	// 					name: 'account',
	// 					type: 'string',
	// 					default: '',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.account',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'User',
	// 					name: 'user',
	// 					type: 'string',
	// 					default: '',
	// 					required: true,
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.user',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Password',
	// 					name: 'password',
	// 					type: 'string',
	// 					typeOptions: {
	// 						password: true,
	// 					},
	// 					default: '',
	// 					required: true,
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.password',
	// 						},
	// 					},
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Database',
	// 			name: 'database',
	// 			type: 'string',
	// 			default: '',
	// 			required: true,
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.database',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Filename',
	// 			name: 'filename',
	// 			type: 'collection',
	// 			placeholder: 'Add Filename Options',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Template',
	// 					name: 'template',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Template for the filename, including placeholders',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.template',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Extension',
	// 					name: 'extension',
	// 					type: 'options',
	// 					options: [
	// 						{
	// 							name: 'JSON',
	// 							value: 'json',
	// 						},
	// 						{
	// 							name: 'JSONL',
	// 							value: 'jsonl',
	// 						},
	// 						{
	// 							name: 'CSV',
	// 							value: 'csv',
	// 						},
	// 					],
	// 					default: 'json',
	// 					description: 'Available options: JSON, JSONL, CSV',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.extension',
	// 						},
	// 					},
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Role',
	// 			name: 'role',
	// 			type: 'string',
	// 			default: '',
	// 			required: true,
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.role',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Schema',
	// 			name: 'schema',
	// 			type: 'string',
	// 			default: '',
	// 			required: true,
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.schema',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Stage',
	// 			name: 'stage',
	// 			type: 'string',
	// 			default: '',
	// 			required: true,
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.stage',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Warehouse',
	// 			name: 'warehouse',
	// 			type: 'string',
	// 			default: '',
	// 			required: true,
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.warehouse',
	// 				},
	// 			},
	// 		},
	// 	],
	// },

	// {
	// 	displayName: 'Aliyun OSS Parameters',
	// 	name: 'ali_oss_parameters',
	// 	type: 'collection',
	// 	placeholder: 'Add Aliyun OSS Options',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 			deliver_type: ['ali_oss'],
	// 		},
	// 	},
	// 	default: {},
	// 	options: [
	// 		{
	// 			displayName: 'Bucket',
	// 			name: 'bucket',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Name of the bucket',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.bucket',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Credentials',
	// 			name: 'credentials',
	// 			type: 'fixedCollection',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Credential',
	// 					name: 'credential',
	// 					values: [
	// 						{
	// 							displayName: 'Access Key',
	// 							name: 'access-key',
	// 							type: 'string',
	// 							default: '',
	// 							required: true,
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.access-key',
	// 								},
	// 							},
	// 						},
	// 						{
	// 							displayName: 'Secret Key',
	// 							name: 'secret-key',
	// 							type: 'string',
	// 							typeOptions: {
	// 								password: true,
	// 							},
	// 							default: '',
	// 							required: true,
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.secret-key',
	// 								},
	// 							},
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Directory',
	// 			name: 'directory',
	// 			type: 'string',
	// 			default: '',
	// 			description: 'Target path',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.directory',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Filename',
	// 			name: 'filename',
	// 			type: 'collection',
	// 			placeholder: 'Add Filename Options',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Extension',
	// 					name: 'extension',
	// 					type: 'options',
	// 					options: [
	// 						{
	// 							name: 'JSON',
	// 							value: 'json',
	// 						},
	// 						{
	// 							name: 'JSONL',
	// 							value: 'jsonl',
	// 						},
	// 						{
	// 							name: 'CSV',
	// 							value: 'csv',
	// 						},
	// 					],
	// 					default: 'json',
	// 					description: 'Available options: JSON, JSONL, CSV',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.extension',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Template',
	// 					name: 'template',
	// 					type: 'string',
	// 					default: '',
	// 					required: true,
	// 					description: 'Template for the filename, including placeholders',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.template',
	// 						},
	// 					},
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Region',
	// 			name: 'region',
	// 			type: 'string',
	// 			default: '',
	// 			required: true,
	// 			description: 'Region for the OSS',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.region',
	// 				},
	// 			},
	// 		},
	// 	],
	// },

	// {
	// 	displayName: 'SFTP Parameters',
	// 	name: 'sftp_parameters',
	// 	type: 'collection',
	// 	placeholder: 'Add SFTP Options',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 			deliver_type: ['sftp'],
	// 		},
	// 	},
	// 	default: {},
	// 	options: [
	// 		{
	// 			displayName: 'Credentials',
	// 			name: 'credentials',
	// 			type: 'collection',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Password',
	// 					name: 'password',
	// 					type: 'string',
	// 					typeOptions: {
	// 						password: true,
	// 					},
	// 					default: '',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.password',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Passphrase',
	// 					name: 'passphrase',
	// 					type: 'string',
	// 					default: '',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.passphrase',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'SSH Key',
	// 					name: 'ssh_key',
	// 					type: 'string',
	// 					default: '',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.ssh_key',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Username',
	// 					name: 'username',
	// 					type: 'string',
	// 					default: '',
	// 					required: true,
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.credentials.username',
	// 						},
	// 					},
	// 				},
	// 			],
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.credentials',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Directory',
	// 			name: 'directory',
	// 			type: 'string',
	// 			default: '',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.directory',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Filename',
	// 			name: 'filename',
	// 			type: 'collection',
	// 			placeholder: 'Add Filename Options',
	// 			default: {},
	// 			options: [
	// 				{
	// 					displayName: 'Extension',
	// 					name: 'extension',
	// 					type: 'options',
	// 					options: [
	// 						{
	// 							name: 'JSON',
	// 							value: 'json',
	// 						},
	// 						{
	// 							name: 'JSONL',
	// 							value: 'jsonl',
	// 						},
	// 						{
	// 							name: 'CSV',
	// 							value: 'csv',
	// 						},
	// 					],
	// 					default: 'json',
	// 					description: 'Available options: JSON, JSONL, CSV',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.extension',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Template',
	// 					name: 'template',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Template for the filename, including placeholders',
	// 					required: true,
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.template',
	// 						},
	// 					},
	// 				},
	// 			],
	// 			required: true,
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.filename',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Path',
	// 			name: 'path',
	// 			type: 'string',
	// 			default: '',
	// 			required: true,
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.path',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Port',
	// 			name: 'port',
	// 			type: 'number',
	// 			default: 22,
	// 			typeOptions: {
	// 				minValue: 0,
	// 				maxValue: 65535,
	// 			},
	// 			required: true,
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.port',
	// 				},
	// 			},
	// 		},
	// 	],
	// },

	// {
	// 	displayName: 'Microsoft Azure Parameters',
	// 	name: 'azure_parameters',
	// 	type: 'collection',
	// 	placeholder: 'Add Azure Options',
	// 	default: {},
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['deliverSnapshot'],
	// 			deliver_type: ['azure'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			displayName: 'Container',
	// 			name: 'container',
	// 			type: 'string',
	// 			default: '',
	// 			typeOptions: {
	// 				minLength: 3,
	// 			},
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.container',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Credentials',
	// 			name: 'credentials',
	// 			type: 'fixedCollection',
	// 			default: {},
	// 			typeOptions: {
	// 				multipleValues: false,
	// 			},
	// 			options: [
	// 				{
	// 					displayName: 'Credential',
	// 					name: 'credential',
	// 					values: [
	// 						{
	// 							displayName: 'Account',
	// 							name: 'account',
	// 							type: 'string',
	// 							default: '',
	// 							required: true,
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.account',
	// 								},
	// 							},
	// 						},
	// 						{
	// 							displayName: 'SAS Token',
	// 							name: 'sas_token',
	// 							type: 'string',
	// 							typeOptions: {
	// 								password: true,
	// 							},
	// 							default: '',
	// 							required: true,
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.sas_token',
	// 								},
	// 							},
	// 						},
	// 						{
	// 							displayName: 'Key',
	// 							name: 'key',
	// 							type: 'string',
	// 							default: '',
	// 							routing: {
	// 								send: {
	// 									type: 'body',
	// 									property: 'deliver.credentials.key',
	// 								},
	// 							},
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 		{
	// 			displayName: 'Directory',
	// 			name: 'directory',
	// 			type: 'string',
	// 			default: '',
	// 			routing: {
	// 				send: {
	// 					type: 'body',
	// 					property: 'deliver.directory',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'Filename',
	// 			name: 'filename',
	// 			type: 'collection',
	// 			default: {},
	// 			required: true,
	// 			options: [
	// 				{
	// 					displayName: 'Template',
	// 					name: 'template',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Template for the filename, including placeholders',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.template',
	// 						},
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Extension',
	// 					name: 'extension',
	// 					type: 'options',
	// 					options: [
	// 						{
	// 							name: 'JSON',
	// 							value: 'json',
	// 						},
	// 						{
	// 							name: 'JSONL',
	// 							value: 'jsonl',
	// 						},
	// 						{
	// 							name: 'CSV',
	// 							value: 'csv',
	// 						},
	// 					],
	// 					default: 'json',
	// 					required: true,
	// 					description: 'Available options: JSON, JSONL, CSV',
	// 					routing: {
	// 						send: {
	// 							type: 'body',
	// 							property: 'deliver.filename.extension',
	// 						},
	// 					},
	// 				},
	// 			],
	// 		},
	// 	],
	// },



];

export const marketplaceDatasetFields: INodeProperties[] = [...marketplaceDatasetParameters];
