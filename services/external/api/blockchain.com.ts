import { BlockchainUrlBuilder } from "../builder";

class Blockchain extends BlockchainUrlBuilder {

    constructor() {
        super("https://blockchain.info");
    }

}

export {
    Blockchain
}