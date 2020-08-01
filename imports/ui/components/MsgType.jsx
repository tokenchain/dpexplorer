import React from 'react';
import { Badge } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import numbro from "numbro";
import moment from "moment/moment";
import { Container, Row, Col, Card, CardBody, Alert, Spinner } from 'reactstrap';
import Account, { DXPAccount } from '../components/Account.jsx';
import Coin from "../../../both/utils/coins";

const T = i18n.createComponent ();
/*
	cdc.RegisterConcrete(&Bond{}, "bonds/Bond", nil)
	cdc.RegisterConcrete(&FunctionParam{}, "bonds/FunctionParam", nil)
	cdc.RegisterConcrete(&Batch{}, "bonds/Batch", nil)
	cdc.RegisterConcrete(&BaseOrder{}, "bonds/BaseOrder", nil)
	cdc.RegisterConcrete(&BuyOrder{}, "bonds/BuyOrder", nil)
	cdc.RegisterConcrete(&SellOrder{}, "bonds/SellOrder", nil)
	cdc.RegisterConcrete(&SwapOrder{}, "bonds/SwapOrder", nil)
	cdc.RegisterConcrete(MsgCreateBond{}, "bonds/MsgCreateBond", nil)
	cdc.RegisterConcrete(MsgEditBond{}, "bonds/MsgEditBond", nil)
	cdc.RegisterConcrete(MsgBuy{}, "bonds/MsgBuy", nil)
	cdc.RegisterConcrete(MsgSell{}, "bonds/MsgSell", nil)
	cdc.RegisterConcrete(MsgSwap{}, "bonds/MsgSwap", nil)
 */
export const MsgType = (props) => {
    switch (props.type) {
        case "treasury/MsgOracleMint":
            return <Badge color="mint">Mint Coin</Badge>;
        //did
        case "did/MsgAddDid":
            return <Badge color="did">Cert Activation</Badge>;
        case "bonds/MsgCreateBond":
            return <Badge color="bondissue">New Bond</Badge>;
        case "bonds/MsgEditBond":
            return <Badge color="success">Edit Bond</Badge>;
        case "bonds/FunctionParam":
            return <Badge color="success">Bond Function</Badge>;
        case "bonds/MsgBuy":
            return <Badge color="bondexchange">Buy</Badge>;
        case "bonds/MsgSell":
            return <Badge color="bondexchange">Sell</Badge>;
        case "bonds/MsgSwap":
            return <Badge color="bondexchange">Swap</Badge>;
        case "bonds/SwapOrder":
            return <Badge color="success">Swap Order</Badge>;
        case "bonds/SellOrder":
            return <Badge color="success">Ask Order</Badge>;
        case "bonds/Batch":
            return <Badge color="warning">Batch</Badge>;
        case "bonds/BuyOrder":
            return <Badge color="success">Bid Order</Badge>;
        case "bonds/Bond":
            return <Badge color="success">Bond</Badge>;
        // bank
        case "cosmos-sdk/MsgSend":
            return <Badge color="success"><T>messageTypes.send</T></Badge>
        case "cosmos-sdk/MsgMultiSend":
            return <Badge color="success"><T>messageTypes.multiSend</T></Badge>

        //staking
        case "cosmos-sdk/MsgCreateValidator":
            return <Badge color="warning"><T>messageTypes.createValidator</T></Badge>;
        case "cosmos-sdk/MsgEditValidator":
            return <Badge color="warning"><T>messageTypes.editValidator</T></Badge>;
        case "cosmos-sdk/MsgDelegate":
            return <Badge color="warning"><T>messageTypes.delegate</T></Badge>;
        case "cosmos-sdk/MsgUndelegate":
            return <Badge color="warning"><T>messageTypes.undelegate</T></Badge>;
        case "cosmos-sdk/MsgBeginRedelegate":
            return <Badge color="warning"><T>messageTypes.redelegate</T></Badge>;

        // gov
        case "cosmos-sdk/MsgSubmitProposal":
            return <Badge color="info"><T>messageTypes.submitProposal</T></Badge>
        case "cosmos-sdk/MsgDeposit":
            return <Badge color="info"><T>messageTypes.deposit</T></Badge>
        case "cosmos-sdk/MsgVote":
            return <Badge color="info"><T>messageTypes.vote</T></Badge>;

        // distribution
        case "cosmos-sdk/MsgWithdrawValidatorCommission":
            return <Badge color="secondary"><T>messageTypes.withdrawComission</T></Badge>;
        case "cosmos-sdk/MsgWithdrawDelegationReward":
            return <Badge color="secondary"><T>messageTypes.withdrawReward</T></Badge>;
        case "cosmos-sdk/MsgModifyWithdrawAddress":
            return <Badge color="secondary"><T>messgeTypes.modifyWithdrawAddress</T></Badge>;

        // slashing
        case "cosmos-sdk/MsgUnjail":
            return <Badge color="danger"><T>messageTypes.unjail</T></Badge>;

        // ibc
        case "cosmos-sdk/IBCTransferMsg":
            return <Badge color="dark"><T>messageTypes.IBCTransfer</T></Badge>;
        case "cosmos-sdk/IBCReceiveMsg":
            return <Badge color="dark"><T>messageTypes.IBCReceive</T></Badge>;
        case "treasury/MsgSend":
            return <Badge color="success">Send DXP Fund</Badge>;
        default:
            return <Badge color="primary">{props.type}</Badge>;
    }
}

function bondFunction (t) {
    if (t == "swapper_function") {
        return <span>SWAP</span>
    }
    if (t == "power_function") {
        return <span>POWER</span>
    }
    if (t == "sigmoid_function") {
        return <span>SIGMOID</span>
    }

    return <span>UNKNOWN FUNCTION</span>
}

const BondIssurance = (props) => {
    const b = props.bondAttrs;
    return <Row className="overflow-hidden">

        <Col lg={3} md={4} className="label"><MsgType type="bonds/MsgCreateBond"/></Col>
        <Col lg={9} md={8} className="value text-nowrap">

        </Col>

        <Col lg={3} md={4} className="label">Token Name</Col>
        <Col lg={9} md={8} className="value text-nowrap">
            {b.name} ({b.token})
        </Col>

        <Col lg={3} md={4} className="label text-nowrap">Bond Description</Col>
        <Col lg={9} md={8} className="value">{b.description}</Col>

        <Col lg={3} md={4} className="label text-nowrap">Reserves</Col>
        <Col lg={9} md={8} className="value">{b.reserve_tokens.map ((t, i) => {
            return new String (t).toUpperCase () + ", "
        })}</Col>

        <Col lg={3} md={4} className="label text-nowrap">Max. Supply</Col>
        <Col lg={9} md={8} className="value">{b.max_supply.amount} {b.max_supply.denom}</Col>

        <Col lg={3} md={4} className="label text-nowrap">Exchange Func.</Col>
        <Col lg={9} md={8} className="value">{bondFunction (b.function_type)}</Col>

        <Col lg={3} md={4} className="label text-nowrap">Mining Pool</Col>
        <Col lg={9} md={8} className="value"><span className="address"><Account
            address={b.fee_address}/></span></Col>

        <Col lg={3} md={4} className="label text-nowrap">Bond Contract</Col>
        <Col lg={9} md={8} className="value text-nowrap address">
            {b.bond_did}
        </Col>

        <Col lg={3} md={4} className="label text-nowrap">Issurer</Col>
        <Col lg={9} md={8} className="value">{b.creator_did}</Col>
    </Row>
}

export const BondIssuranceDetail = (props) => {
    const b = props.bondAttrs;
    return <Row className="overflow-hidden">
        <Col lg={3} md={4} className="label"><MsgType type="bonds/MsgCreateBond"/></Col>
        <Col lg={9} md={8} className="value text-nowrap">

        </Col>
        <Col lg={3} md={4} className="label">Token Name</Col>
        <Col lg={9} md={8} className="value text-nowrap">
            {b.name} ({b.token})
        </Col>

        <Col lg={3} md={4} className="label text-nowrap">Bond Description</Col>
        <Col lg={9} md={8} className="value">{b.description}</Col>

        <Col lg={3} md={4} className="label text-nowrap">Reserves</Col>
        <Col lg={9} md={8} className="value">{b.reserve_tokens.map ((t, i) => {
            return new String (t).toUpperCase () + ", "
        })}</Col>

        <Col lg={3} md={4} className="label text-nowrap">Max. Supply</Col>
        <Col lg={9} md={8} className="value">{b.max_supply.amount} {b.max_supply.denom}</Col>

        <Col lg={3} md={4} className="label text-nowrap">Exchange Func.</Col>
        <Col lg={9} md={8} className="value">{bondFunction (b.function_type)}</Col>

        <Col lg={3} md={4} className="label text-nowrap">Mining Pool</Col>
        <Col lg={9} md={8} className="value"><span className="address"><Account
            address={b.fee_address}/></span></Col>

        <Col lg={3} md={4} className="label text-nowrap">Bond Contract</Col>
        <Col lg={9} md={8} className="value text-nowrap address">
            {b.bond_did}
        </Col>

        <Col lg={3} md={4} className="label text-nowrap">Issurer</Col>
        <Col lg={9} md={8} className="value">{b.creator_did}</Col>


        <Col lg={3} md={4} className="label text-nowrap">Limits</Col>
        <Col lg={9} md={8} className="value">{b.order_quantity_limits.map ((t, i) => {
            return new Coin (coin.amount, coin.denom).toString () + ", "
        })}</Col>
        <Col lg={3} md={4} className="label text-nowrap">Tx Fee</Col>
        <Col lg={9} md={8} className="value">{b.tx_fee_percentage} / {b.exit_fee_percentage}</Col>
        <Col lg={3} md={4} className="label text-nowrap">Sanity Rate</Col>
        <Col lg={9} md={8} className="value">{b.sanity_rate} </Col>
        <Col lg={3} md={4} className="label text-nowrap">Sanity Margin</Col>
        <Col lg={9} md={8} className="value">{b.sanity_margin_percentage} </Col>
        <Col lg={3} md={4} className="label text-nowrap">Batch Block</Col>
        <Col lg={9} md={8} className="value">{b.batch_blocks} </Col>
        <Col lg={3} md={4} className="label text-nowrap">Status Operation</Col>
        <Col lg={9} md={8} className="value">{b.allow_sells} </Col>
    </Row>
}


export const MsgDarkpooContent = (props) => {
    const p = props.payload.value;
    return <BondIssurance bondAttrs={p}/>
}


const send_fund = (amount, type, from, to, invalid) => {
    return <p><MsgType type={type}/> <span
        className="text-success">{amount}</span> <T>activities.from</T> <Account address={from}/> {invalid ?
        <T>activities.failedTo</T> : ''} <T>activities.to</T> <span className="address"><Account
        address={to}/></span><T>common.fullStop</T></p>
}
