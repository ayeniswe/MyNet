import express from 'express';
import { Explorer } from './explorer';
import { Bitcoin, Ethereum, Polygon, TerraClassic, Xrp, Solana } from './external/explorer';

const app = express();
// Dependencies
require('dotenv').config();
app.use(require('cors')());
app.use(express.json());
// Add your routes here
app.get('/api/v1/crypto/:explorer/wallet', async (request, response) => {
  const { explorer } = request.params;
  const { address, contractaddress, tokenid } = request.query as { address: string, contractaddress?: string, tokenid?: string };
  try {
    let currentExplorer;
    switch (explorer) {
      case 'bitcoin':
        currentExplorer = new Bitcoin(address);
        break;
      case 'solana':
        currentExplorer = new Solana(address);
        break;
      case 'terra-classic':
        currentExplorer = new TerraClassic(address);
        break;
      case 'xrp':
        currentExplorer = new Xrp(address);
        break;
      case 'ethereum':
        currentExplorer = new Ethereum(address, process.env.ETHERSCAN_API_KEY, contractaddress, tokenid);
        break;
      case 'polygon':
        currentExplorer = new Polygon(address, process.env.POLYGONSCAN_API_KEY, contractaddress, tokenid);
        break;
      default:
        response.status(500).json({ error: 'Invalid explorer' });
        break;
    }
    let wallet;
    if (contractaddress && tokenid) {
      wallet = await new Explorer(currentExplorer).getTokenWalletInfo();
    }
    else if (!contractaddress && !tokenid) {
      wallet = await new Explorer(currentExplorer).getNativeWalletInfo();
    }
    else {
      response.status(500).json({ error: 'Contract address and token ID are required' });
    }
    response.status(200).json(wallet);
  } catch (error) {
    // Handle errors
    console.error('Proxy error:', error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});