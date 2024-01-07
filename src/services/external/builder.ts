class EthMaticUrlBuilder {
    private __origin: string;
    private __module: string;
    private __action: string;
    private __contractAddress: string;
    private __address: string;
    private __apiKey: string;
    private __tag: string;

    constructor(origin: string) {
        this.__origin = origin;
        return this;
    }

    addModule(module: "account"): EthMaticUrlBuilder {
        this.__module = `module=${module}`;
        return this;
    }

    addAction(action: "tokenbalance" | "balancemulti"): EthMaticUrlBuilder {
        this.__action = `&action=${action}`;
        return this;
    }

    addContractAddress(contractAddress: string): EthMaticUrlBuilder {
        this.__contractAddress = `&contractaddress=${contractAddress}`;
        return this;
    }

    addAddress(address: string): EthMaticUrlBuilder {
        this.__address = `&address=${address}`;
        return this;
    }

    addApiKey(apiKey: string): EthMaticUrlBuilder {
        this.__apiKey = `&apikey=${apiKey}`;
        return this;
    }

    addTag(tag: "latest" | "earliest" | "pending"): EthMaticUrlBuilder {
        this.__tag = `&tag=${tag}`;
        return this;
    }

    buildUrl(): string {
        return `${this.__origin}?${this.__module || ''}${this.__action || ''}${this.__address || ''}${this.__contractAddress || ''}${this.__tag || ''}${this.__apiKey || ''}`
    }

}

class BlockchainUrlBuilder {
    private __origin: string;
    private __address: string;

    constructor(origin: string) {
        this.__origin = origin;
        return this;
    }

    addAddress(address: string): BlockchainUrlBuilder {
        this.__address = `active=${address}`;
        return this;
    }

    setMultiAddrPath(): BlockchainUrlBuilder {
        this.__origin += "/multiaddr";
        return this;
    }

    buildUrl(): string {
        return `${this.__origin}?${this.__address || ''}`
    }

}

class XrpUrlBuilder {
    private __origin: string;

    constructor(origin: string) {
        this.__origin = origin;
        return this;
    }

    setAccountPath(): XrpUrlBuilder {
        this.__origin += "/account";
        return this;
    }

    setVersionPath(version: number = 1): XrpUrlBuilder {
        this.__origin += `/v${version}`;
        return this;
    }

    setAddressPath(address: string): XrpUrlBuilder {
        this.__origin += `/${address}`;
        return this;
    }

    buildUrl(): string {
        return this.__origin;
    }

}

class TerraClassicUrlBuilder {
    private __origin: string;

    constructor(origin: string) {
        this.__origin = origin;
        return this;
    }

    setCosmosPath(): TerraClassicUrlBuilder {
        this.__origin += "/cosmos";
        return this;
    }
    
    setBankPath(): TerraClassicUrlBuilder {
        this.__origin += "/bank";
        return this;
    }

    setVersionPath(version: string = "1beta1"): TerraClassicUrlBuilder {
        this.__origin += `/v${version}`;
        return this;
    }

    setBalancesPath(): TerraClassicUrlBuilder {
        this.__origin += "/balances";
        return this;
    }

    setAddressPath(address: string): TerraClassicUrlBuilder {
        this.__origin += `/${address}`;
        return this;
    }

    buildUrl(): string {
        return this.__origin
    }
}

export {
    EthMaticUrlBuilder,
    BlockchainUrlBuilder,
    XrpUrlBuilder,
    TerraClassicUrlBuilder
}
