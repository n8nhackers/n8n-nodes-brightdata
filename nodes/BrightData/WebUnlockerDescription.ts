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
					//searchFilterRequired: true,
					//searchable: true,
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
		type: 'options',
		options: [
			{
				name: 'Albania',
				value: 'al',
			},
			{
				name: 'Argentina',
				value: 'ar',
			},
			{
				name: 'Armenia',
				value: 'am',
			},
			{
				name: 'Australia',
				value: 'au',
			},
			{
				name: 'Austria',
				value: 'at',
			},
			{
				name: 'Azerbaijan',
				value: 'az',
			},
			{
				name: 'Bangladesh',
				value: 'bd',
			},
			{
				name: 'Belarus',
				value: 'by',
			},
			{
				name: 'Belgium',
				value: 'be',
			},
			{
				name: 'Bolivia',
				value: 'bo',
			},
			{
				name: 'Bosnia and Herzegovina',
				value: 'ba',
			},
			{
				name: 'Botswana',
				value: 'bw',
			},
			{
				name: 'Brazil',
				value: 'br',
			},
			{
				name: 'Brunei',
				value: 'bn',
			},
			{
				name: 'Bulgaria',
				value: 'bg',
			},
			{
				name: 'Cambodia',
				value: 'kh',
			},
			{
				name: 'Cameroon',
				value: 'cm',
			},
			{
				name: 'Canada',
				value: 'ca',
			},
			{
				name: 'Chile',
				value: 'cl',
			},
			{
				name: 'China',
				value: 'cn',
			},
			{
				name: 'Colombia',
				value: 'co',
			},
			{
				name: 'Costa Rica',
				value: 'cr',
			},
			{
				name: 'Croatia',
				value: 'hr',
			},
			{
				name: 'Cyprus',
				value: 'cy',
			},
			{
				name: 'Czech Republic',
				value: 'cz',
			},
			{
				name: 'Denmark',
				value: 'dk',
			},
			{
				name: 'Dominican Republic',
				value: 'do',
			},
			{
				name: 'Ecuador',
				value: 'ec',
			},
			{
				name: 'Egypt',
				value: 'eg',
			},
			{
				name: 'Estonia',
				value: 'ee',
			},
			{
				name: 'Finland',
				value: 'fi',
			},
			{
				name: 'France',
				value: 'fr',
			},
			{
				name: 'Georgia',
				value: 'ge',
			},
			{
				name: 'Germany',
				value: 'de',
			},
			{
				name: 'Ghana',
				value: 'gh',
			},
			{
				name: 'Greece',
				value: 'gr',
			},
			{
				name: 'Hong Kong',
				value: 'hk',
			},
			{
				name: 'Hungary',
				value: 'hu',
			},
			{
				name: 'Iceland',
				value: 'is',
			},
			{
				name: 'India',
				value: 'in',
			},
			{
				name: 'Indonesia',
				value: 'id',
			},
			{
				name: 'Iraq',
				value: 'iq',
			},
			{
				name: 'Ireland',
				value: 'ie',
			},
			{
				name: 'Isle of Man',
				value: 'im',
			},
			{
				name: 'Israel',
				value: 'il',
			},
			{
				name: 'Italy',
				value: 'it',
			},
			{
				name: 'Jamaica',
				value: 'jm',
			},
			{
				name: 'Japan',
				value: 'jp',
			},
			{
				name: 'Jordan',
				value: 'jo',
			},
			{
				name: 'Kazakhstan',
				value: 'kz',
			},
			{
				name: 'Kenya',
				value: 'ke',
			},
			{
				name: 'Kuwait',
				value: 'kw',
			},
			{
				name: 'Kyrgyzstan',
				value: 'kg',
			},
			{
				name: 'Laos',
				value: 'la',
			},
			{
				name: 'Latvia',
				value: 'lv',
			},
			{
				name: 'Lithuania',
				value: 'lt',
			},
			{
				name: 'Luxembourg',
				value: 'lu',
			},
			{
				name: 'Macau',
				value: 'mo',
			},
			{
				name: 'Malawi',
				value: 'mw',
			},
			{
				name: 'Malaysia',
				value: 'my',
			},
			{
				name: 'Mexico',
				value: 'mx',
			},
			{
				name: 'Moldova',
				value: 'md',
			},
			{
				name: 'Morocco',
				value: 'ma',
			},
			{
				name: 'Mozambique',
				value: 'mz',
			},
			{
				name: 'Myanmar',
				value: 'mm',
			},
			{
				name: 'Netherlands',
				value: 'nl',
			},
			{
				name: 'New Zealand',
				value: 'nz',
			},
			{
				name: 'Nigeria',
				value: 'ng',
			},
			{
				name: 'North Macedonia',
				value: 'mk',
			},
			{
				name: 'Norway',
				value: 'no',
			},
			{
				name: 'Oman',
				value: 'om',
			},
			{
				name: 'Pakistan',
				value: 'pk',
			},
			{
				name: 'Panama',
				value: 'pa',
			},
			{
				name: 'Peru',
				value: 'pe',
			},
			{
				name: 'Philippines',
				value: 'ph',
			},
			{
				name: 'Poland',
				value: 'pl',
			},
			{
				name: 'Portugal',
				value: 'pt',
			},
			{
				name: 'Qatar',
				value: 'qa',
			},
			{
				name: 'Romania',
				value: 'ro',
			},
			{
				name: 'Russia',
				value: 'ru',
			},
			{
				name: 'Saudi Arabia',
				value: 'sa',
			},
			{
				name: 'Serbia',
				value: 'rs',
			},
			{
				name: 'Sierra Leone',
				value: 'sl',
			},
			{
				name: 'Singapore',
				value: 'sg',
			},
			{
				name: 'Slovakia',
				value: 'sk',
			},
			{
				name: 'Slovenia',
				value: 'si',
			},
			{
				name: 'South Africa',
				value: 'za',
			},
			{
				name: 'South Korea',
				value: 'kr',
			},
			{
				name: 'Spain',
				value: 'es',
			},
			{
				name: 'Sri Lanka',
				value: 'lk',
			},
			{
				name: 'Sweden',
				value: 'se',
			},
			{
				name: 'Switzerland',
				value: 'ch',
			},
			{
				name: 'Taiwan',
				value: 'tw',
			},
			{
				name: 'Tajikistan',
				value: 'tj',
			},
			{
				name: 'Tanzania',
				value: 'tz',
			},
			{
				name: 'Thailand',
				value: 'th',
			},
			{
				name: 'Tunisia',
				value: 'tn',
			},
			{
				name: 'Turkey',
				value: 'tr',
			},
			{
				name: 'Turkmenistan',
				value: 'tm',
			},
			{
				name: 'Ukraine',
				value: 'ua',
			},
			{
				name: 'United Arab Emirates',
				value: 'ae',
			},
			{
				name: 'United Kingdom',
				value: 'gb',
			},
			{
				name: 'United States',
				value: 'us',
			},
			{
				name: 'Uruguay',
				value: 'uy',
			},
			{
				name: 'Uzbekistan',
				value: 'uz',
			},
			{
				name: 'Venezuela',
				value: 've',
			},
			{
				name: 'Vietnam',
				value: 'vn',
			},
			{
				name: 'Zambia',
				value: 'zm',
			},
		],
		default: 'us',
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
