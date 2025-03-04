import { INodeProperties } from 'n8n-workflow';

// When the resource `` is selected, this `operation` parameter will be shown.
export const webUnlockerOperations: INodeProperties[] = [
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
						body: {
							zone: '{{$json["zone"]}}',
							url: '{{$json["url"]}}',
							format: '{{$json["format"]}}',
							method: '{{$json["method"]}}',
							country: '{{$json["country"]}}',
						},
					},
				},
			},
		],
		default: 'request',
	},
];

// Here we define what to show when the `get` operation is selected.
// We do that by adding `operation: ["get"]` to `displayOptions.show`
const requestOperation: INodeProperties[] = [
	// {
	// 	displayName: 'Zone',
	// 	name: 'zone',
	// 	type: 'options',
	// 	options: [
	// 		{
	// 			name: 'Zone 1',
	// 			value: 'zone1',
	// 		},
	// 		{
	// 			name: 'Zone 2',
	// 			value: 'zone2',
	// 		},
	// 	],
	// 	default: 'zone1',
	// 	required: true,
	// 	description: 'Select the zone',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['webUnlocker'],
	// 			operation: ['request'],
	// 		},
	// 	},
	// },
	{
		displayName: 'Zone',
		name: 'zone',
		type: 'resourceLocator',
		default: {
			mode: 'list',
			value: ''
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
			}
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
			value: 'us'
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
			}
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


];

export const webUnlockerFields: INodeProperties[] = [...requestOperation];
