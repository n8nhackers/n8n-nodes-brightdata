import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';

import { brightdataApiRequest } from './GenericFunctions';

type ZoneSearchItem = {
	name: string;
	type: string;
};

type ZoneSearchResponse = ZoneSearchItem[];

export async function getActiveZones(
	this: ILoadOptionsFunctions,
): Promise<INodeListSearchResult> {
	const responseData: ZoneSearchResponse = await brightdataApiRequest.call(
		this,
		'GET',
		'/zone/get_active_zones',
		{},
		{},
	);

	const results: INodeListSearchItems[] = responseData.map((item: ZoneSearchItem) => ({
		name: item.name,
		value: item.name,
		type: item.type,
	}));

	return { results };
}

type CountrySearchItem = {
	DC_shared: {
		country_codes: string[];
	};
	DC_dedicated_ip: {
		country_codes: string[];
	};
	DC_dedicated_host: {
		country_codes: string[];
	};
	ISP_shared: {
		country_codes: string[];
	};
	ISP_dedicated_ip: {
		country_codes: string[];
	};
	ISP_dedicated_host: {
		country_codes: string[];
	};
};

type CountrySearchResponse = CountrySearchItem;

export async function getCountries(
	this: ILoadOptionsFunctions,
): Promise<INodeListSearchResult> {
	const responseData: CountrySearchResponse = await brightdataApiRequest.call(
		this,
		'GET',
		'/countrieslist',
		{},
		{},
	);

	console.log(responseData);

	const results: INodeListSearchItems[] = [];

	for (const country of responseData.DC_shared.country_codes) {
		results.push({
			name: country,
			value: country,
		});
	}

	return { results };
}
