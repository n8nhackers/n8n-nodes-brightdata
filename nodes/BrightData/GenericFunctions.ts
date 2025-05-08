import type {
	IExecuteFunctions,
	IHookFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	JsonObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * Make an API request to Github
 *
 */
export async function brightdataApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: object,
	query?: IDataObject,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('brightdataApi')

	const options: IHttpRequestOptions = {
		method,
		headers: {
			'User-Agent': 'n8n',
			Authorization: `Bearer ${credentials.token}`,
			'Content-Type': 'application/json',
		},
		body,
		qs: query,
		url: 'https://api.brightdata.com',
		json: true,
	};

	if (Object.keys(option).length !== 0) {
		Object.assign(options, option);
	}

	options.url += endpoint;

	console.log('Request Options:', options);

	try {
		//return await this.helpers.requestWithAuthentication.call(this, 'brightdataApi', options);
		return await this.helpers.request(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
