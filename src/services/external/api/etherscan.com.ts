import { EthMaticUrlBuilder } from "../builder";

class Etherscan extends EthMaticUrlBuilder {

    constructor() {
        super("https://api.etherscan.com/api");
    }

}

export {
    Etherscan
}