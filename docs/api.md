# MyNet API

## Get Crypto Wallet Information

Get information about a cryptocurrency wallet on different blockchain explorers.

### Endpoint

**GET** /api/v1/crypto/:explorer/wallet

### Parameters

- `explorer` (string, required): The blockchain explorer to use (`bitcoin`, `solana`, `terra-classic`, `xrp`, `ethereum`, `polygon`).
- `address` (string, required): The cryptocurrency wallet address.
- `contractaddress` (string, optional): The contract address (required when querying for token information).
- `tokenid` (string, optional): The token ID (required when querying for token information).

### Request

```bash
curl -X GET "http://localhost:8000/api/v1/crypto/ethereum/wallet?address=<YourAddress>&contractaddress=<TokenContract>&tokenid=<YourTokenID>"
```

### Response
```json
{
  "amount": 1234,
  "balance": 1234.98 // USD denomination
}
```

### Error Response
- Code: 500
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
- Code: 400
    ```json
    {
        "error": "Contract address and token ID are required"
    }
    ```
    ```json
    {
        "error": "Invalid explorer"
    }
    ```