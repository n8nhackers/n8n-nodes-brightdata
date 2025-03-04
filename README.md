![Banner image](images/n8n-and-n8nhackers.png)

# n8n-nodes-brightdata

This is an n8n community node. It helps you to use [BrightData APIs](https://docs.brightdata.com/scraping-automation/introduction) from n8n.

If you have any questions or remarks please [contact me](mailto:contact@n8nhackers.com).

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Compatibility

This node was developed and tested with n8n version 1.81.4

## Resources

### Web Unlocker

Bright Data’s Web Unlocker API makes data collection easy by managing proxies and avoiding blocks. 

Just send an API request with the target website, and get clean HTML/JSON responses.

The Web Unlocker handles:
- Optimal proxy selection
- Custom headers
- Fingerprinting
- CAPTCHAs

Ideal for:
- Scraping any website without blocks
- Emulating real-user behavior
- Teams without proxy infrastructure
- Paying only for successful requests

Please, follow [specification](https://docs.brightdata.com/scraping-automation/web-unlocker/introduction) to setup this API.

#### Usage

##### TL;DR
Don't want to read? Import the sample workflow () to test this node with random samples.
![Generate dynamic contents for EMAILS or HTML pages](images/workflow-sample.png?raw=true "Generate dynamic contents for EMAILS or HTML pages")

##### Operation
This resource exposes the operation "Send a Request" to call the API.

##### Properties
The next properties are included:
- zone: You can choose between your existing zone names.
- url: The target URL you wish to access via Web Unlocker API.
- method: The method to call the target URL.
- format: Defines the response format. Use raw to receive the raw response from the target site. JSON is simpler for managing the output.
- country: The country you will use to access the target URL.

# Contribution

To make this node even better, please let us know, [how you use it](mailto:contact@n8nhackers.com). Commits are always welcome.

# Issues

If you have any issues, please [let us know on GitHub](https://github.com/n8nhackers/n8n-nodes-document-generator/issues).

# About

Nodes by [n8nhackers.com](https://n8nhackers.com). For productive use and consulting on this, [contact us please](mailto:contact@n8nhackers.com).

Special thanks to [N8n nodemation](https://n8n.io) workflow automation by Jan Oberhauser.

# License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
