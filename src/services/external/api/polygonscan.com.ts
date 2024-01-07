import { EthMaticUrlBuilder } from "../builder";

class Polygonscan extends EthMaticUrlBuilder {

    constructor() {
        super("https://api.polygonscan.com/api");
    }

}

export {
    Polygonscan
}