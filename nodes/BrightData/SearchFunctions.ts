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

type ZoneSearchResponse = {
	items: ZoneSearchItem[];
	total_count: number;
};

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

	const results: INodeListSearchItems[] = responseData.items.map((item: ZoneSearchItem) => ({
		name: item.name,
		value: item.name,
		type: item.type,
	}));

	return { results };
}
