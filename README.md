![Banner image](images/n8n-and-n8nhackers.png)

# n8n-nodes-brightdata

This is an n8n community node. It helps you to use [Bright Data APIs](https://docs.brightdata.com/scraping-automation/introduction) from n8n.

If you have any questions or remarks please [contact me](mailto:support@n8nhackers.com).

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Compatibility

This node was developed and tested with n8n version 1.81.4

## Resources

This node currently supports the next Resources:

### Marketplace Dataset

Bright Data’s Marketplace DataSet API allows access to a centralized platform providing regularly updated, ethically sourced datasets from multiple domains, offering flexible solutions for data customization and acquisition.

The next operations are available:

- Deliver Snapshot
- Filter Dataset
- Get Dataset Metadata
- Get Snapshot Content
- Get Snapshot Metadata
- Get Snapshot Parts
- List Datasets

Ideal for:

- Access to datasets across 120+ domains.
- High-quality, ethically sourced data ensuring accuracy and compliance.
- Regular updates from publicly available information.
- Ready-to-use and on-demand solutions.
- Flexible purchase options with comprehensive customization.
- Suitable for various fields like social media, real estate, B2B data, and AI training.

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

### TL;DR - WebUnlocker

![Get deals of the day](images/workflow-sample.png?raw=true "Get deals of the day")

Don't want to read? Install n8n-nodes-brightdata in your n8n from Settings / Community nodes. Copy the URL of [Get deals of the day](https://raw.githubusercontent.com/n8nhackers/n8n-nodes-brightdata/refs/heads/main/use-cases/workflow-sample.json "Get deals of the day") and paste into "Import for URL" submenu at n8n.

This n8n workflow automates the process of collecting and delivering the "Deals of the Day" from MediaMarkt, specifically tailored to user preferences, and sends those deals via email.

This workflow is useful for automating product deal recommendations based on user input and sending personalized emails with the best deals available.

#### Workflow Overview:

1. **User Interaction via Form**:
   - The user submits a form where they can select categories (such as appliances, cell phones, etc.) and provide their email address. This triggers the workflow to gather personalized deals based on their input.
2. **Data Extraction**:
   - Once the form is submitted, the workflow calls **Bright Data** community node to scrape data from the MediaMarkt website (`https://www.mediamarkt.es/es/campaign/campanas-y-ofertas`) using a proxy service. The data is retrieved in JSON format.
3. **HTML Content Extraction**:
   - The raw HTML content from the website is extracted, focusing on the title and body, which are key to processing the content for recommendation.
4. **Recommendation Generation using OpenAI**:
   - The extracted data is processed through **OpenAI** (GPT-4o-mini) to generate a list of recommended deals. This involves categorizing deals based on the user-selected categories, and filtering or translating content if necessary. The deal list includes properties like name, description, price, and a link.
5. **Data Structuring**:
   - The generated list of deals is split into individual deal items using **SplitOut**.
6. **Document Creation**:
   - Using **[Document Generator](https://www.npmjs.com/package/n8n-nodes-document-generator)** community node, an HTML template is populated with the recommended deals and structured into a user-friendly format.
7. **Email Delivery**:
   - The document containing the recommended deals is sent to the user's email via **SMTP email send** with a personalized message that includes the list of deals.

#### Workflow Connections:

1. **Form Submission** → **Bright Data (Scrape Deals)**: The form triggers the request to scrape the MediaMarkt deals page.
2. **Bright Data** → **HTML Extraction**: The scraped content is processed to extract key page data.
3. **HTML Extraction** → **OpenAI (Deal Generation)**: The extracted content is used as input for GPT-4o-mini to generate deal recommendations.
4. **OpenAI** → **SplitOut**: The results are split into individual deal items.
5. **SplitOut** → **DocumentGenerator**: The items are formatted into an HTML document.
6. **DocumentGenerator** → **Send Email**: The document is emailed to the user.

#### Final Output:

- The user receives an email with a personalized list of the best deals based on their selected categories.

#### Credentials Used:

- **Bright Data API**: For scraping data from MediaMarkt.
- **OpenAI API**: To generate the list of recommended deals using GPT-4o-mini.
- **SMTP**: For sending the email with the deals.

#### External nodes Used:

- **[Bright Data](https://www.npmjs.com/package/n8n-nodes-brightdata)**: For scrapping data from MediaMarkt.
- **[Document Generator](https://www.npmjs.com/package/n8n-nodes-document-generator)**: For generating html output using templates.

### TL;DR - Marketplace Dataset

![Marketplace Datasets](images/marketplace-dataset-workflow-sample.png?raw=true "Marketplace Datasets")

New Marketplace Dataset API allows to create custom snapshots by filtering existing Bright Data datasets (more than [160 datasets](https://docs.brightdata.com/datasets/introduction)).

Datasets are updated by Bright Data, so you don't have to scrape anything.

Your can get a list of records from the full dataset without scrapping the records by yourself. This is faster and cheaper than adquiring data from zero.
You can use datasets to build custom AI Agents like:

- Real Estate Agent to search houses to buy
- Candidates Agent to search future workers

Current existing datasets allow to get data from:

- LinkedIn
- Instagram
- Facebook
- Airbnb
- Crunchbase
- And many more (use operation 'List Datasets' to get all)

Install n8n-nodes-brightdata in your n8n from Settings / Community nodes. Copy the URL of [Get Marketplace Functions](https://raw.githubusercontent.com/n8nhackers/n8n-nodes-brightdata/refs/heads/main/use-cases/marketplace-dataset-workflow-sample.json) and paste into "Import for URL" submenu at n8n.

### TL;DR - More samples

You can also use the next ready-to-use samples for your n8n (self-hosted version):

- [Update LinkedIn Profiles one by one with Bright Data and Google Sheets with no scrapping](https://raw.githubusercontent.com/n8nhackers/n8n-nodes-brightdata/refs/heads/main/use-cases/Update_LinkedIn_Profiles_one_by_one_with_Bright_Data_and_Google_Sheets_with_no_scrapping.json)![Update LinkedIn Profiles](images/Update_LinkedIn_Profiles_one_by_one_with_Bright_Data_and_Google_Sheets_with_no_scrapping.png?raw=true "Update LinkedIn Profiles")
- [Create a Prospect list for Commercial purposes with Google Search and Bright Data on-demand](https://raw.githubusercontent.com/n8nhackers/n8n-nodes-brightdata/refs/heads/main/use-cases/Create_a_Prospect_list_for_Commercial_purposes_with_Google_Search_and_Bright_Data_on_demand.json)![Create a Prospect List](images/Create_a_Prospect_list_for_Commercial_purposes_with_Google_Search_and_Bright_Data_on_demand.png?raw=true "Create a Prospect List")

# Changelog

Here you can find the list of changes applied to this node:

- 0.1.33: Add samples for WebScrapper/Scrape By URL and WebScrapper/Create Snapshot
- 0.1.32: Fix equals on MarketplaceDataset/filterSnapshot
- 0.1.31: Add webScrapper/downloadSnapshot
- 0.1.30: Add webScrapper/deliverSnapshot + Fix webScrapper/getSnapshots
- 0.1.29: Fix error on Marketplace/Get Snapshot Content
- 0.1.28: Fix errors on webScrapper resource
- 0.1.25: Create Resource for WebScrapper API
- 0.1.24: Return listDatasets in items output property
- 0.1.23: Add notify webhook to "Marketplace Dataset API/Trigger Snapshot by URL"
- 0.1.22: Return clear messages on API errors + improve filter Dataset
- 0.1.21: Add getSnapshots + Trigger snapshots to generate snapshots on demand
- 0.1.20: Added support to use Bright Data as an AI Agent tool
- 0.1.19: Added support for Marketplace DataSet endpoints
- 0.1.11: Added support for using this node as tool from an Agent

# Contribution

To make this node even better, please let us know, [how you use it](mailto:support@n8nhackers.com). Commits are always welcome.

You can test this node following the next instructions:

```sh
git clone git@github.com:n8nhackers/n8n-nodes-brightdata.git
cd n8n-nodes-brightdata
nvm use
npm install -g n8n
yarn install
npm run build
npm link
mkdir ~/.n8n/custom/
cd ~/.n8n/custom/
npm link n8n-nodes-brightdata
cd ..
n8n start
```

# Issues

If you have any issues, please [let us know on GitHub](https://github.com/n8nhackers/n8n-nodes-brightdata/issues).

# About

Nodes by [n8nhackers.com](https://n8nhackers.com). For productive use and consulting on this, [contact us please](mailto:support@n8nhackers.com).

Special thanks to [N8n nodemation](https://n8n.io) workflow automation by Jan Oberhauser.

# License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
