import axios from "axios";
import { getCryptoMarketPrice } from "./cryptocurrency";
import { convertLunaToActual, convertSatoshisToBitcoin, convertSolanaToActual, convertWeiToEthereum } from "../cryptocurrency";
import { Wallet } from "../types/cryptocurrency";
import { XrpscanComAccount } from "./types/xrpscan.com";
import { BlockchainComAddress } from "./types/blockchain.com";
import { EtherscanComAddress, PolygonscanComAddress } from "./types/etherscan.com";
import { Etherscan } from "./api/etherscan.com";
import { Polygonscan } from "./api/polygonscan.com";
import { Blockchain } from "./api/blockchain.com";
import { Xrpscan } from "./api//xrpscan.com";
import { TerraClassiclcd } from "./api/terra.money.com";
import { TerraMoneyComBankBalance } from "./types/terra.money.com";
import { SolanaApi } from "./api/solana.com";
import { SolanaComBalance } from "./types/solana.com";

class Solana {
    private __publicAddress: string;
    private __tokenId: string = "sol-solana";

    constructor(publicAddress: string) {
        this.__publicAddress = publicAddress;
    }

    get publicAddress(): string {
        return this.__publicAddress;
    }

    set publicAddress(address: string) {
        this.__publicAddress = address;
    }
    
    getNativeWalletInfo = async (): Promise<Wallet> => {
        const solana = new SolanaApi();
        const account: SolanaComBalance = (await solana.getBalance(this.__publicAddress)).data.result;
        let nativeAmount = Number(account.value);
        nativeAmount = convertSolanaToActual(nativeAmount);
        const marketPrice = await getCryptoMarketPrice(this.__tokenId);
        return {
            amount: nativeAmount,
            balance: nativeAmount * marketPrice,
            address: this.__publicAddress
        }
    }

    getTokenWalletInfo = () => {
        throw new Error("This object does not support the 'getTokenWalletInfo' function.");
    }
}

class TerraClassic {
    private __publicAddress: string;
    private __tokenId: string = "luna-terra";

    constructor(publicAddress: string) {
        this.__publicAddress = publicAddress;
    }

    get publicAddress(): string {
        return this.__publicAddress;
    }

    set publicAddress(address: string) {
        this.__publicAddress = address;
    }
    
    getNativeWalletInfo = async (): Promise<Wallet> => {
        const url = new TerraClassiclcd()
        .setCosmosPath()
        .setBankPath()
        .setVersionPath()
        .setBalancesPath()
        .setAddressPath(this.__publicAddress)
        .buildUrl();
        const account: TerraMoneyComBankBalance = (await axios.get(url)).data;
        let nativeAmount = 0;
        for (const balance of account.balances) {
            nativeAmount += Number(balance.amount);
        }
        nativeAmount = convertLunaToActual(nativeAmount);
        const marketPrice = await getCryptoMarketPrice(this.__tokenId);
        return {
            amount: nativeAmount,
            balance: nativeAmount * marketPrice,
            address: this.__publicAddress
        }
    }

    getTokenWalletInfo = () => {
        throw new Error("This object does not support the 'getTokenWalletInfo' function.");
    }
}

class Xrp {
    private __publicAddress: string;
    private __tokenId: string = "xrp-xrp";

    constructor(publicAddress: string) {
        this.__publicAddress = publicAddress;
    }

    get publicAddress(): string {
        return this.__publicAddress;
    }

    set publicAddress(address: string) {
        this.__publicAddress = address;
    }
    
    getNativeWalletInfo = async (): Promise<Wallet> => {
        const url = new Xrpscan()
        .setVersionPath()
        .setAccountPath()
        .setAddressPath(this.__publicAddress)
        .buildUrl();
        const account: XrpscanComAccount = (await axios.get(url)).data;
        const nativeAmount = Number(account.xrpBalance);
        const marketPrice = await getCryptoMarketPrice(this.__tokenId);
        return {
            amount: nativeAmount,
            balance: nativeAmount * marketPrice,
            address: this.__publicAddress
        }
    }

    getTokenWalletInfo = () => {
        throw new Error("This object does not support the 'getTokenWalletInfo' function.");
    }
}

class Bitcoin {
    private __publicAddress: string;
    private __tokenId: string = "btc-bitcoin";

    constructor(publicAddress: string) {
        this.__publicAddress = publicAddress;
    }

    get publicAddress(): string {
        return this.__publicAddress;
    }

    set publicAddress(address: string) {
        this.__publicAddress = address;
    }
    
    getNativeWalletInfo = async (): Promise<Wallet> => {
        const url = new Blockchain()
        .setMultiAddrPath()
        .addAddress(this.__publicAddress)
        .buildUrl();
        const addresses: BlockchainComAddress[] = (await axios.get(url)).data.addresses;
        let nativeAmount = 0;
        for (const address of addresses) {
            nativeAmount += Number(address.final_balance);
        }
        nativeAmount = convertSatoshisToBitcoin(nativeAmount);
        const marketPrice = await getCryptoMarketPrice(this.__tokenId);
        return {
            amount: nativeAmount,
            balance: nativeAmount * marketPrice,
            address: this.__publicAddress
        }
    }

    getTokenWalletInfo = () => {
        throw new Error("This object does not support the 'getTokenWalletInfo' function.");
    }
}

class Ethereum {
    private __publicAddress: string;
    private __explorerApiKey: string;
    private __contractAddress: string = "";
    private __tokenId: string = "eth-ethereum";

    constructor(publicAddress: string, explorerApiKey: string, contractAddress?: string, tokenId?: string) {
        this.__publicAddress = publicAddress;
        this.__explorerApiKey = explorerApiKey;
        this.__contractAddress = contractAddress || this.__contractAddress;
        this.__tokenId = tokenId || this.__tokenId;
    }

    get publicAddresses(): string {
        return this.__publicAddress;
    }

    set publicAddress(address: string) {
        this.__publicAddress = address;
    }

    getWallet = async (amount: number): Promise<Wallet> => {
        amount = convertWeiToEthereum(amount);
        const marketPrice = await getCryptoMarketPrice(this.__tokenId);
        return {
            amount: amount,
            balance: amount * marketPrice,
            address: this.__publicAddress
        }
    }

    getNativeWalletInfo = async (): Promise<Wallet> => {
        const url = new Etherscan()
        .addModule("account")
        .addAction("balancemulti")
        .addAddress(this.__publicAddress)
        .addApiKey(this.__explorerApiKey)
        .addTag("latest")
        .buildUrl();
        const addresses: EtherscanComAddress[] = (await axios.get(url)).data.result;
        let nativeAmount = 0;
        for (const address of addresses) {
            nativeAmount += Number(address.balance);
        }
        return await this.getWallet(nativeAmount);
    }

    getTokenWalletInfo = async (): Promise<Wallet> => {
        const url = new Etherscan()
        .addModule("account")
        .addAction("tokenbalance")
        .addAddress(this.__publicAddress)
        .addApiKey(this.__explorerApiKey)
        .addContractAddress(this.__contractAddress)
        .addTag("latest")
        .buildUrl();
        const tokenAmount = (await axios.get(url)).data.result;
        return await this.getWallet(Number(tokenAmount));
    }
}

class Polygon {
    private __publicAddress: string;
    private __contractAddress: string;
    private __explorerApiKey: string;
    private __tokenId: string = "matic-polygon";

    constructor(publicAddress: string, explorerApiKey: string, contractAddress?: string, tokenId?: string) {
        this.__publicAddress = publicAddress;
        this.__explorerApiKey = explorerApiKey;
        this.__contractAddress = contractAddress || this.__contractAddress;
        this.__tokenId = tokenId || this.__tokenId;
    }

    get publicAddresses(): string {
        return this.__publicAddress;
    }

    set publicAddress(address: string) {
        this.__publicAddress = address;
    }

    getWallet = async (amount: number): Promise<Wallet> => {
        amount = convertWeiToEthereum(amount);
        const marketPrice = await getCryptoMarketPrice(this.__tokenId);
        return {
            amount: amount,
            balance: amount * marketPrice,
            address: this.__publicAddress
        }
    }

    getNativeWalletInfo = async (): Promise<Wallet> => {
        const url = new Polygonscan()
        .addModule("account")
        .addAction("balancemulti")
        .addAddress(this.__publicAddress)
        .addApiKey(this.__explorerApiKey)
        .addTag("latest")
        .buildUrl();
        const addresses: PolygonscanComAddress[] = (await axios.get(url)).data.result;
        let nativeAmount = 0;
        for (const address of addresses) {
            nativeAmount += Number(address.balance);
        }
        return await this.getWallet(nativeAmount);
    }

    getTokenWalletInfo = async (): Promise<Wallet> => {
        const url = new Polygonscan()
        .addModule("account")
        .addAction("tokenbalance")
        .addAddress(this.__publicAddress)
        .addApiKey(this.__explorerApiKey)
        .addContractAddress(this.__contractAddress)
        .addTag("latest")
        .buildUrl();
        const tokenAmount = (await axios.get(url)).data.result;
        return await this.getWallet(Number(tokenAmount));
    }
}

export {
    Bitcoin,
    Ethereum,
    Polygon,
    Xrp,
    TerraClassic,
    Solana
}