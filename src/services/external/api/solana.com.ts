import axios from "axios";

class SolanaApi {
    url: string = "https://api.mainnet-beta.solana.com";

    async getBalance(address: string, commitment?: string, minContextSlot?: number) {
        const params = [];
        if (commitment && minContextSlot) {
            params.push({
                commitment: commitment,
                minContextSlot: minContextSlot
            });
        }

        const payload = {
            "jsonrpc": "2.0", "id": 1,
            "method": "getBalance",
            "params": [...params, address]
        };
        
        const headers = {
            'Content-Type': 'application/json'
        };

        return axios.post(this.url, payload, { headers });
    }

}

export {
    SolanaApi
}