const errors = {
    "sdk" : {
        1 : "Internal Error",
        2 : "Tx Decode Error",
        3 : "Invalid Sequence Number",
        4 : "Unauthorized",
        5 : "Insufficient Funds",
        6 : "Unknown Request",
        7 : "Invalid Address",
        8 : "Invalid PubKey",
        9 : "Unknown Address",
        10 : "Insufficient Coins",
        11 : "Invalid Coins",
        12 : "Out Of Gas",
        13 : "Memo Too Large",
        14 : "Insufficient Fee",
        15 : "Too Many Signatures",
        16 : "Gas Overflow",
        17 : "No Signatures"
    },
    "staking" : {
        101 : "Invalid Validator",
        102 : "Invalid Delegation",
        103 : "Invalid Input",
        104 : "Validator Jailed"
    },
    "gov" : {
        1 : "Unknown Proposal",
        2 : "Inactive Proposal",
        3 : "Already Active Proposal",
        4 : "Already Finished Proposal",
        5 : "Address Not Staked",
        6 : "Invalid Title",
        7 : "Invalid Description",
        8 : "Invalid Proposal Type",
        9 : "Invalid Vote",
        10 : "Invalid Genesis",
        11 : "Invalid Proposal Status"
    },
    "distr" : {
        103 : "Invalid Input",
        104 : "No Distribution Info",
        105 : "No Validator Commission",
        106 : "Set Withdraw Addrress Disabled"
    },
    "bank" : {
        101 : "Send Disabled",
        102 : "Invalid Inputs Outputs"
    },
    "slashing" : {
        101 : "Invalid Validator",
        102 : "Validator Jailed",
        103 : "Validator Not Jailed",
        104 : "Missing Self Delegation",
        105 : "Self Delegation Too Low"
    }
}
import numbro from 'numbro';

export default class ErrorCheck {
    constructor (code, codespace, payload) {
        this.code = code;
        this.space = codespace;
        this.message = "Unknown error";
        this.payload = payload;
        this.process ();
    }

    foundError () {
        return errors.hasOwnProperty (this.space);
    }

    GetMessage () {
        return this.message;
    }

    process () {
        if (this.foundError ()) {
            if (errors[this.space].hasOwnProperty (this.code)) {
                this.message = errors[this.space][this.code];
            }


            if (this.space == "sdk" && this.code == 12) {
                const { gas_used, gas_wanted } = this.payload;
                this.message = this.message + "gas uses (" + numbro (gas_used).format ("0,0") + ") > gas wanted (" + numbro (gas_wanted).format ("0,0") + ")";

            }
        }


    }
}
