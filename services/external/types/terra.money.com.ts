type Pagination = {
    next_key: string
    total: number
}

type Balance = {
    denom: string
    amount: string
}

type TerraMoneyComBankBalance = {
    balances: Balance[]
    pagination: Pagination
}

export {
    TerraMoneyComBankBalance
}