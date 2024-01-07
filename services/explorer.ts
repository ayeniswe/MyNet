import { Wallet } from "./types/cryptocurrency";

interface BlockchainExplorer {
    getNativeWalletInfo: () => Promise<Wallet>;
    getTokenWalletInfo: () => any;
    publicAddress: string;
}

class Explorer {
    private __explorer;

    constructor(explorer: BlockchainExplorer) {
        this.__explorer = explorer
    }

    get publicAddress(): string {
        return this.__explorer.publicAddress
    }

    set publicAddress(address: string) {
        this.__explorer.publicAddress = address
    }

    getNativeWalletInfo = () => {
        return this.__explorer.getNativeWalletInfo()
    }

    getTokenWalletInfo = () => {
        return this.__explorer.getTokenWalletInfo()
    }
}

export {
    Explorer,
}