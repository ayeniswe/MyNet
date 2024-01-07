<h1 align="center">
MyNet
</h1>

<p align="center">
  <img src="https://github.com/ayeniswe/MyNet/blob/main/public/logo.png?raw=true" alt="App logo"/>
</p>

## Features

- [x] **Consolidated View:** Get a consolidated view of your current net worth.
- [ ] **Multiple Sources:** Connect and monitor assets and liabilities from various sources seamlessly.
      
    **Assets**
    - [x] Cryptocurrency
    - [ ] Stocks
    - [ ] Real-Estate
    - [ ] Banking
    - [ ] Jewelry
    - [ ] Artwork
    - [ ] Collectibles
    - [ ] Vehicles
     
    **Liabilities**
    - [ ] Credit
    - [ ] Loans
    - [ ] Tax Obligations (possibly)
     
- [ ] **Real-time Updates:** Enjoy daily updates and insights into your current net worth
- [ ] **Customizable Alerts:** Set customizable alerts to stay informed about changes in your financial status.

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Obtain an API key for Ethereum explorer from [Etherscan Developer Portal](https://etherscan.io/myapikey).
- Obtain an API key for Polyscan explorer from [Polygonscan Developer Portal](https://polygonscan.com/myapikey).
- Add all neccessary data to json files

#### API Keys

- Add the following lines to the project root `services\.env` file, replacing `YOUR_SERVICE_API_KEY` with the actual API key:

  ```env
  ETHERSCAN_API_KEY=YOUR_SERVICE_API_KEY
  POLYGONSCAN_API_KEY=YOUR_SERVICE_API_KEY
   ```

Repeat this process for any additional services that require API keys.

#### Adding Data

To include your cryptocurrency information in the project, follow these steps:

1. Open the `data/crypto.json` file located at the root of your project.

2. Add your cryptocurrency data in the following format:

```json
{
    "assets": [
        {
            "blockchain": "ethereum",
            "addresses": [
                "0x3A0112245229012437f6Aaa8485a412",
                // Add more addresses if needed
            ],
            "tokens": [
                {
                    "contract": "0xF17e65822b568B3903685a7c9F496CF7656Cc6C2",
                    "name": "bico-biconomy"
                },
                // Add more tokens if needed (tokens can be empty)
            ]
        },
        // Add more assets if needed
    ]
}
```

### Usage

Step 1: Install dependencies

```bash
$ npm install
```

Step 2: Change directory to services

```bash
$ cd services
```

Step 3: Run server

```bash
$ ts-node server.ts
```

Step 4: Change back to the root directory

```bash
$ cd ..
```

Step 5: Start application :)

```bash
$ npm start
```
