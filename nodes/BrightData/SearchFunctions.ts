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

type CountrySearchResponse = {
	zone_type: {
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
	}
};

// type Country = {
// 	name: string;
// 	code: string;
// };

// const countries: Country[] = [
// 	{ name: "Georgia", code: "ge" },
// 	{ name: "Uzbekistan", code: "uz" },
// 	{ name: "Latvia", code: "lv" },
// 	{ name: "Singapore", code: "sg" },
// 	{ name: "Panama", code: "pa" },
// 	{ name: "United States", code: "us" },
// 	{ name: "United Arab Emirates", code: "ae" },
// 	{ name: "Japan", code: "jp" },
// 	{ name: "Moldova", code: "md" },
// 	{ name: "Spain", code: "es" },
// 	{ name: "Netherlands", code: "nl" },
// 	{ name: "Czech Republic", code: "cz" },
// 	{ name: "Finland", code: "fi" },
// 	{ name: "United Kingdom", code: "gb" },
// 	{ name: "Germany", code: "de" },
// 	{ name: "Italy", code: "it" },
// 	{ name: "Vietnam", code: "vn" },
// 	{ name: "Austria", code: "at" },
// 	{ name: "Slovakia", code: "sk" },
// 	{ name: "Armenia", code: "am" },
// 	{ name: "Portugal", code: "pt" },
// 	{ name: "Israel", code: "il" },
// 	{ name: "Poland", code: "pl" },
// 	{ name: "Greece", code: "gr" },
// 	{ name: "Hungary", code: "hu" },
// 	{ name: "Bosnia and Herzegovina", code: "ba" },
// 	{ name: "Estonia", code: "ee" },
// 	{ name: "Ecuador", code: "ec" },
// 	{ name: "Thailand", code: "th" },
// 	{ name: "Bangladesh", code: "bd" },
// 	{ name: "Argentina", code: "ar" },
// 	{ name: "Brazil", code: "br" },
// 	{ name: "Slovenia", code: "si" },
// 	{ name: "Norway", code: "no" },
// 	{ name: "Sri Lanka", code: "lk" },
// 	{ name: "Morocco", code: "ma" },
// 	{ name: "Turkey", code: "tr" },
// 	{ name: "Switzerland", code: "ch" },
// 	{ name: "Bolivia", code: "bo" },
// 	{ name: "Laos", code: "la" },
// 	{ name: "Egypt", code: "eg" },
// 	{ name: "Saudi Arabia", code: "sa" },
// 	{ name: "Philippines", code: "ph" },
// 	{ name: "Peru", code: "pe" },
// 	{ name: "Cambodia", code: "kh" },
// 	{ name: "Albania", code: "al" },
// 	{ name: "Kuwait", code: "kw" },
// 	{ name: "Kazakhstan", code: "kz" },
// 	{ name: "Bulgaria", code: "bg" },
// 	{ name: "Denmark", code: "dk" },
// 	{ name: "Azerbaijan", code: "az" },
// 	{ name: "New Zealand", code: "nz" },
// 	{ name: "Australia", code: "au" },
// 	{ name: "Turkmenistan", code: "tm" },
// 	{ name: "India", code: "in" },
// 	{ name: "Tajikistan", code: "tj" },
// 	{ name: "Pakistan", code: "pk" },
// 	{ name: "Kyrgyzstan", code: "kg" },
// 	{ name: "Ireland", code: "ie" },
// 	{ name: "Luxembourg", code: "lu" },
// 	{ name: "Canada", code: "ca" },
// 	{ name: "Russia", code: "ru" },
// 	{ name: "Sweden", code: "se" },
// 	{ name: "Hong Kong", code: "hk" },
// 	{ name: "Belarus", code: "by" },
// 	{ name: "Lithuania", code: "lt" },
// 	{ name: "France", code: "fr" },
// 	{ name: "Iraq", code: "iq" },
// 	{ name: "Romania", code: "ro" },
// 	{ name: "Ukraine", code: "ua" },
// 	{ name: "Colombia", code: "co" },
// 	{ name: "South Africa", code: "za" },
// 	{ name: "China", code: "cn" },
// 	{ name: "Indonesia", code: "id" },
// 	{ name: "Jamaica", code: "jm" },
// 	{ name: "Jordan", code: "jo" },
// 	{ name: "Dominican Republic", code: "do" },
// 	{ name: "Tunisia", code: "tn" },
// 	{ name: "Isle of Man", code: "im" },
// 	{ name: "Oman", code: "om" },
// 	{ name: "Serbia", code: "rs" },
// 	{ name: "Nigeria", code: "ng" },
// 	{ name: "Kenya", code: "ke" },
// 	{ name: "Croatia", code: "hr" },
// 	{ name: "Cyprus", code: "cy" },
// 	{ name: "North Macedonia", code: "mk" },
// 	{ name: "Malaysia", code: "my" },
// 	{ name: "Mexico", code: "mx" },
// 	{ name: "Belgium", code: "be" },
// 	{ name: "Costa Rica", code: "cr" },
// 	{ name: "Sierra Leone", code: "sl" },
// 	{ name: "Iceland", code: "is" },
// 	{ name: "South Korea", code: "kr" },
// 	{ name: "Taiwan", code: "tw" },
// 	{ name: "Qatar", code: "qa" },
// 	{ name: "Zambia", code: "zm" },
// 	{ name: "Uruguay", code: "uy" },
// 	{ name: "Tanzania", code: "tz" },
// 	{ name: "Macau", code: "mo" },
// 	{ name: "Chile", code: "cl" },
// 	{ name: "Ghana", code: "gh" },
// 	{ name: "Cameroon", code: "cm" },
// 	{ name: "Botswana", code: "bw" },
// 	{ name: "Mozambique", code: "mz" },
// 	{ name: "Malawi", code: "mw" },
// 	{ name: "Myanmar", code: "mm" },
// 	{ name: "Brunei", code: "bn" },
// 	{ name: "Venezuela", code: "ve" }
// ].sort((a, b) => a.name.localeCompare(b.name));

// function getCountryNameByCode(code: string): string | undefined {
// 	const country = countries.find(country => country.code === code);
// 	return country ? country.name : undefined;
// }

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

	const results: INodeListSearchItems[] = responseData.zone_type.DC_shared.country_codes.map((code: string) => ({
		name: code,
		value: code,
		type: 'DC_shared',
	}));

	// sort by name
	results.sort((a, b) => a.name.localeCompare(b.name));

	return { results };
}
