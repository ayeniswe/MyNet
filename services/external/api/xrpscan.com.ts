import { XrpUrlBuilder } from "../builder";

class Xrpscan extends XrpUrlBuilder {

    constructor() {
        super(`https://api.xrpscan.com/api`);
    }

}

export {
    Xrpscan
}