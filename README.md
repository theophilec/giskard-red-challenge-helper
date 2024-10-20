# Giskard RED Challenge Helper

The Giskard RED Challenge Helper is a Chrome extension designed to assist users participating in the Giskard RED LLM red-teaming challenge. It logs prompts and outputs from the challenge, allowing users to easily review and export their interaction data.

## Key Features

- Automatically captures prompts and responses from the Giskard RED challenge
- Popup interface to view attempted prompts and responses, filtered by challenge
- Stores data locally using IndexedDB for persistent logging
- Supports exporting all captured data as a JSON file

## Installation

To install the Giskard RED Helper Extension as an unpacked extension:

1. Clone or download this repository
2. Open Google Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension should now appear in your Chrome toolbar

## How does it work?

The extension watches for changes to the DOM and captures prompts and responses using IndexedDB local storage. The database is then queried to display the history. One tricky part is that the challenge website is a SPA (try to go back when you [click here](https://red.giskard.ai/)) and so we need to also handle navigation on the site (I opted for watching the URL in addition to the page contents).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

Since I did not know any Javascript before this project, I relied heavily on Anthropic's Claude Sonnet.

Special thanks to Giskard for creating the [Giskard RED challenge](https://red.giskard.ai/).
