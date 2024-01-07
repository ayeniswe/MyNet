type EtherscanComAddress = {
    account: string,
    balance: string,
    address: string,
}
type PolygonscanComAddress = & EtherscanComAddress;{
}

export {
    EtherscanComAddress,
    PolygonscanComAddress
}