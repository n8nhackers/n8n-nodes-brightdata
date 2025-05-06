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



	{
		displayName: 'Deliver Type',
		name: 'deliver_type',
		type: 'options',
		options: [
			// {
			// 	name: 'Aliyun Object Storage Service',
			// 	value: 'ali_oss',
			// },
			{
				name: 'Amazon S3',
				value: 's3',
			},
			// {
			// 	name: 'Google Cloud PubSub',
			// 	value: 'pubsub',
			// },
			// {
			// 	name: 'Google Cloud Storage',
			// 	value: 'gcs',
			// },
			// {
			// 	name: 'Microsoft Azure',
			// 	value: 'azure',
			// },
			// {
			// 	name: 'SFTP',
			// 	value: 'sftp',
			// },
			// {
			// 	name: 'Snowflake',
			// 	value: 'snowflake',
			// },
			{
				name: 'Webhook',
				value: 'webhook',
			},
		],
		default: 's3',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
			},
		},
	},

	{
		displayName: 'Webhook Endpoint',
		name: 'endpoint',
		type: 'string',
		default: '',
		description: 'Webhook URL to deliver the snapshot',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['webhook'],
			},
		},
		routing: {
			request: {
				body: {
					deliver: {
						type: 'webhook',
						endpoint: '={{$parameter["endpoint"]}}',
					},
				},
			},
		},
		required: true,
	},

  {
		displayName: 'Filename Template',
		name: 'filename_template',
		type: 'string',
		default: '',
		description: 'Template for the filename, including placeholders',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['webhook'],
			},
		},
		routing: {
			request: {
				body: {
					deliver: {
						type: 'webhook',
						filename: {
							template: '={{$parameter["filename_template"]}}',
						}
					},
				},
			},
		},
		required: true,
	},

	{
		displayName: 'File Extension',
		name: 'filename_extension',
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
		description: 'Extension for the delivered file (JSON, JSONL, CSV)',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['webhook'],
			},
		},
		routing: {
			request: {
				body: {
					deliver: {
						type: 'webhook',
						filename: {
							extension: '={{$parameter["filename_extension"]}}',
						},
					},
				},
			},
		},
		required: true,
	},


	{
		displayName: 'Bucket',
		name: 'bucket',
		type: 'string',
		default: '',
		description: 'Name of the bucket',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
		routing: {
			request: {
				body: {
					deliver: {
						type: 's3',
						bucket: '={{$parameter["bucket"]}}',
					},
				},
			},
		},
		required: true,
	},
	{
		displayName: 'AWS Access Key',
		name: 'aws-access-key',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
		description: 'AWS Access Key ID',
		routing: {
			request: {
				body: {
					deliver: {
						type: 's3',
						credentials: {
							'aws-access-key': '={{$parameter["aws-access-key"]}}',
						}
					},
				},
			},
		},
		required: true,
	},
	{
		displayName: 'AWS Secret Key',
		name: 'aws-secret-key',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
		description: 'AWS Secret Access Key',
		routing: {
			request: {
				body: {
					deliver: {
						type: 's3',
						credentials: {
							'aws-secret-key': '={{$parameter["aws-secret-key"]}}',
						}
					},
				},
			},
		},
		required: true,
	},
	{
		displayName: 'Role ARN',
		name: 'role_arn',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
		routing: {
			request: {
				body: {
					deliver: {
						type: 's3',
						credentials: {
							'role_arn': '={{$parameter["role_arn"]}}',
						}
					},
				},
			},
		},
	},
	{
		displayName: 'External ID',
		name: 'external_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
		routing: {
			request: {
				body: {
					deliver: {
						type: 's3',
						credentials: {
							'external_id': '={{$parameter["external_id"]}}',
						}
					},
				},
			},
		},
	},

	{
		displayName: 'Region',
		name: 'region',
		type: 'string',
		default: '',
		description: 'AWS Region',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
		routing: {
			request: {
				body: {
					deliver: {
						type: 's3',
						region: '={{$parameter["region"]}}',
					},
				},
			},
		},
	},

	{
		displayName: 'Directory',
		name: 'directory',
		type: 'string',
		default: '',
		description: 'Target path',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
		routing: {
			request: {
				body: {
					deliver: {
						type: 's3',
						directory: '={{$parameter["directory"]}}',
					},
				},
			},
		},
	},

	{
		displayName: 'Template',
		name: 'template',
		type: 'string',
		default: '',
		description: 'Template for the filename, including placeholders',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
	},
	{
		displayName: 'Extension',
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
		description: 'Available options: JSON, JSONL, CSV',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
			},
		},
		required: true,
	},
	{
		displayName: 'Region',
		name: 'region',
		type: 'string',
		default: '',
		description: 'AWS Region',
		displayOptions: {
			show: {
				operation: ['deliverSnapshot'],
				deliver_type: ['s3'],
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
				operation: ['deliverSnapshot'],
			},
		},
		routing: {
			request: {
				body: {
					compress: '={{$parameter["compress"]}}',
				},
			}
		},
	},


];

export const marketplaceDatasetFields: INodeProperties[] = [...marketplaceDatasetParameters];
