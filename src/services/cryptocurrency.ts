const convertSatoshisToBitcoin = (satoshis: number): number => {
    const bitcoin = satoshis / 100000000;
    return bitcoin;
}

const convertWeiToEthereum = (wei: number): number => {
    const ethereum = wei / 1000000000000000000;
    return ethereum;
}

const convertLunaToActual = (uluna: number): number => {
    const ethereum = uluna / 1000000;
    return ethereum;
}

const convertSolanaToActual = (uluna: number): number => {
    const ethereum = uluna / 1000000000;
    return ethereum;
}

export {
    convertSatoshisToBitcoin,
    convertWeiToEthereum,
    convertLunaToActual,
    convertSolanaToActual
}