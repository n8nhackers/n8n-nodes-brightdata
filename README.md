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
- [Premium domains](https://docs.brightdata.com/scraping-automation/web-unlocker/features#current-list-of-premium-domains) hard to be scraped (MediaMarkt, Hermes... )

Please, follow [documentation](https://docs.brightdata.com/scraping-automation/web-unlocker/introduction) to setup this API.

#### Usage

- Resource: choose Unlocker API
	- Operation: choose "Send a Request".
		- Properties:
			- zone: Choose between your existing zone names.
			- url: The target URL you wish to access via Web Unlocker API.
			- method: The method to call the target URL.
			- format: Defines the response format. Use raw to receive the raw response from the target site. JSON is simpler for managing the output.
			- country: The country you will use to access the target URL.

### TL;DR
Don't want to read? Import the [Get deals of the day](use-cases/workflow-sample.json?raw=true "Get deals of the day").
This n8n workflow automates the process of collecting and delivering the "Deals of the Day" from MediaMarkt, specifically tailored to user preferences, and sends those deals via email.

#### Workflow Overview:

1. **User Interaction via Form**:
    - The user submits a form where they can select categories (such as appliances, cell phones, etc.) and provide their email address. This triggers the workflow to gather personalized deals based on their input.
2. **Data Extraction**:
    - Once the form is submitted, the workflow calls **BrightData** to scrape data from the MediaMarkt website (`https://www.mediamarkt.es/es/campaign/campanas-y-ofertas`) using a proxy service. The data is retrieved in JSON format.
3. **HTML Content Extraction**:
    - The raw HTML content from the website is extracted, focusing on the title and body, which are key to processing the content for recommendation.
4. **Recommendation Generation using OpenAI**:
    - The extracted data is processed through **OpenAI** (GPT-4o-mini) to generate a list of recommended deals. This involves categorizing deals based on the user-selected categories, and filtering or translating content if necessary. The deal list includes properties like name, description, price, and a link.
5. **Data Structuring**:
    - The generated list of deals is split into individual deal items using **SplitOut**.
6. **Document Creation**:
    - Using **Document Generator** community node, an HTML template is populated with the recommended deals and structured into a user-friendly format.
7. **Email Delivery**:
    - The document containing the recommended deals is sent to the user's email via **SMTP email send** with a personalized message that includes the list of deals.
![Get deals of the day](images/workflow-sample.png?raw=true "Get deals of the day")


# Contribution

To make this node even better, please let us know, [how you use it](mailto:contact@n8nhackers.com). Commits are always welcome.

# Issues

If you have any issues, please [let us know on GitHub](https://github.com/n8nhackers/n8n-nodes-document-generator/issues).

# About

Nodes by [n8nhackers.com](https://n8nhackers.com). For productive use and consulting on this, [contact us please](mailto:contact@n8nhackers.com).

Special thanks to [N8n nodemation](https://n8n.io) workflow automation by Jan Oberhauser.

# License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
