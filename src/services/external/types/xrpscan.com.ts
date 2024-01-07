type XrpscanComAccount = {
    sequence: number;
    xrpBalance: string;
    ownerCount: number;
    previousAffectingTransactionID: string;
    previousAffectingTransactionLedgerVersion: number;
    Account: string;
    Balance: string;
    Flags: number;
    LedgerEntryType: string;
    OwnerCount: number;
    PreviousTxnID: string;
    PreviousTxnLgrSeq: number;
    Sequence: number;
    index: string;
    settings: Record<string, any>;
    account: string;
    parent: string;
    initial_balance: number;
    inception: string;
    ledger_index: number;
    tx_hash: string;
    accountName: {
      name: string;
      desc: string;
      account: string;
      domain: string;
      twitter: string;
    };
    parentName: {
      name: string;
      desc: string;
      account: string;
      domain: string;
      twitter: string;
      verified: boolean;
    };
}

export {
    XrpscanComAccount
}