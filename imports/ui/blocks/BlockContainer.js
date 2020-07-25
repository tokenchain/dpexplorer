import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Blockscon } from '/imports/api/blocks/blocks.js';
import { Transactions } from '/imports/api/transactions/transactions.js';
import Block from './Block.jsx';

export default BlockContainer = withTracker ((props) => {
    let blockHandle, transactionHandle;
    let loading = true;

    if (Meteor.isClient) {
        blockHandle = Meteor.subscribe ('blocks.findOne', parseInt (props.match.params.blockId));
        transactionHandle = Meteor.subscribe ('transactions.height', parseInt (props.match.params.blockId));
        loading = !blockHandle.ready () && !transactionHandle.ready ();
    }

    let block, txs, transactionsExist, blockExist;

    if (Meteor.isServer || !loading) {
        block = Blockscon.findOne ({ height : parseInt (props.match.params.blockId) });
        txs = Transactions.find ({ height : parseInt (props.match.params.blockId) });
        if (Meteor.isServer) {
            loading = false;
            transactionsExist = !!txs;
            blockExist = !!block;
        } else {
            transactionsExist = !loading && !!txs;
            blockExist = !loading && !!block;
        }
        /*     console.log ("=================");
             console.log ("find transactions", transactionsExist);
             console.log ("=================");
             console.log (Transactions.find ({}).fetch ());*/
    }
    return {
        loading,
        blockExist,
        transactionsExist,
        block : blockExist ? block : {},
        didTxs : transactionsExist ? Transactions.find ({
            $or : [
                // { "tx.type" : "darkpool/IxoTx" },
                { "tx.value.payload.type" : "did/MsgAddDid" },
                { "tx.value.payload.type" : "did/MsgAddCredential" }
            ]
        }).fetch () : {},
        transferTxs : transactionsExist ? Transactions.find ({
            $or : [
                { "tx.value.payload.type" : "treasury/MsgSend" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgSend" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgMultiSend" }
            ]
        }).fetch () : {},
        bondTxs : transactionsExist ? Transactions.find ({
            $or : [
                { "tx.value.payload.type" : "bonds/Bond" },
                { "tx.value.payload.type" : "bonds/FunctionParam" },
                { "tx.value.payload.type" : "bonds/Batch" },
                { "tx.value.payload.type" : "bonds/BaseOrder" },
                { "tx.value.payload.type" : "bonds/BuyOrder" },
                { "tx.value.payload.type" : "bonds/SellOrder" },
                { "tx.value.payload.type" : "bonds/SwapOrder" },
                { "tx.value.payload.type" : "bonds/MsgCreateBond" },
                { "tx.value.payload.type" : "bonds/MsgEditBond" },
                { "tx.value.payload.type" : "bonds/MsgBuy" },
                { "tx.value.payload.type" : "bonds/MsgSell" },
                { "tx.value.payload.type" : "bonds/MsgSwap" }
            ]
        }).fetch () : {},
        stakingTxs : transactionsExist ? Transactions.find ({
            $or : [
                { "tx.value.msg.type" : "cosmos-sdk/MsgCreateValidator" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgEditValidator" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgDelegate" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgUndelegate" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgBeginRedelegate" }
            ]
        }).fetch () : {},
        distributionTxs : transactionsExist ? Transactions.find ({
            $or : [
                { "tx.value.msg.type" : "cosmos-sdk/MsgWithdrawValidatorCommission" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgWithdrawDelegationReward" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgModifyWithdrawAddress" }
            ]
        }).fetch () : {},
        governanceTxs : transactionsExist ? Transactions.find ({
            $or : [
                { "tx.value.msg.type" : "cosmos-sdk/MsgSubmitProposal" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgDeposit" },
                { "tx.value.msg.type" : "cosmos-sdk/MsgVote" }
            ]
        }).fetch () : {},
        slashingTxs : transactionsExist ? Transactions.find ({
            $or : [
                { "tx.value.msg.type" : "cosmos-sdk/MsgUnjail" }
            ]
        }).fetch () : {},
        IBCTxs : transactionsExist ? Transactions.find ({
            $or : [
                { "tx.value.msg.type" : "cosmos-sdk/IBCTransferMsg" },
                { "tx.value.msg.type" : "cosmos-sdk/IBCReceiveMsg" }
            ]
        }).fetch () : {},
    };
}) (Block);
