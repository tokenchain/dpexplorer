import React, { Component } from 'react';
import { MsgType, MsgDarkpooContent, Vote } from './MsgType.jsx';
import { Container, Row, Col, Card, CardBody, Alert, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import Account from '../components/Account.jsx';
import { DPMessageBlock } from '../components/DPMessage.jsx';
import i18n from 'meteor/universe:i18n';
import Coin from '/both/utils/coins.js'
import _ from 'lodash';

const T = i18n.createComponent ();

const MultiSend = (props) => {
    return <div>
        <p><T>activities.single</T> <MsgType type={props.msg.type}/> <T>activities.happened</T></p>
        <p><T>activities.senders</T>
            <ul>
                {props.msg.value.inputs.map ((data, i) => {
                    return <li key={i}><Account address={data.address}/>
                        <T>activities.sent</T> {data.coins.map ((coin, j) => {
                            return <em key={j}
                                       className="text-success">{new Coin (coin.amount, coin.denom).toString ()}</em>
                        })}
                    </li>
                })}
            </ul>
            <T>activities.receivers</T>
            <ul>
                {props.msg.value.outputs.map ((data, i) => {
                    return <li key={i}><Account address={data.address}/>
                        <T>activities.received</T> {data.coins.map ((coin, j) => {
                            return <em key={j}
                                       className="text-success">{new Coin (coin.amount, coin.denom).toString ()}</em>
                        })}</li>
                })}
            </ul>
        </p>
    </div>
}

const send_fund = (type, amount, from, to, invalid) => {
    return <p><MsgType type={type}/> <span
        className="text-success">{amount}</span> <T>activities.from</T> <Account address={from}/> {invalid ?
        <T>activities.failedTo</T> : ''} <T>activities.to</T> <span className="address"><Account
        address={to}/></span><T>common.fullStop</T></p>
}
const createValidator = (type, amount, validator_address, desc, r) => {
    return <p><MsgType type={type}/> <span
        className="text-success">{amount}</span> was cosumed to established <Account address={validator_address}/>. To
        get to know more about {desc.moniker}. Check out the website: {desc.website}. {desc.details}. GPG
        Id: {desc.identity}<T>common.fullStop</T>
    </p>
}
const editValidator = (type, value) => {
    return <p><MsgType type={type}/> Modified data on - Moniker address: {value.address} <Account
        address={value.address}/></p>
}
const unjailVailator = (type, value) => {
    return <p><MsgType type={type}/> Just unjailed <Account address={value.address}/></p>
}
const setDelegation = (type, delegation, validation, coinInfo) => {
    let coindisplay = new Coin (coinInfo.amount, coinInfo.denom).toString ()
    return <p><MsgType type={type}/> <span className="text-success">{coindisplay}</span> is used to delegate <Account
        address={validation}/> by validator <Account address={delegation}/><T>common.fullStop</T></p>
}

/*{"type":"cosmos-sdk/MsgBeginRedelegate","value":{"delegator_address":"dx01yjj7e4qm9aatn0jtfhs45mzzzr48778e2frspx","validator_src_address":"dx0valoper1r4x99kjh6uytghm26d3lwv4c4yguqvvd0k3z25","validator_dst_address":"dx0valoper1c3yw8ysmpmerrld3gq3dyaaahhruzaapswpyy8","amount":{"denom":"mdap","amount":"100000"}}}*/
const redelegation = (type, value) => {
    let validamount = new Coin (value.amount.amount, value.amount.denom).toString ()
    return <p><MsgType type={type}/> <span className="text-success">{validamount}</span> was
        moved <T>activities.from</T> <Account address={value.validator_src_address}/> <T>activities.to</T> <Account
            address={value.validator_dst_address}/> by <Account
            address={value.delegator_address}/><T>common.fullStop</T></p>
}

/*{"type":"cosmos-sdk/MsgUndelegate","value":{"delegator_address":"dx01s3eg45gllzke625eqlmrlc2gfj2j3xxpwjvjmw","validator_address":"dx0valoper1r4x99kjh6uytghm26d3lwv4c4yguqvvd0k3z25","amount":{"denom":"mdap","amount":"100000"}}}*/
const unbond = (type, value) => {
    let validamount = new Coin (value.amount.amount, value.amount.denom).toString ()
    return <p><MsgType type={type}/> <Account address={value.validator_address}/> was undelegated by <span
        className="text-success">{validamount}</span> for <Account
        address={value.delegator_address}/><T>common.fullStop</T></p>
}
/*{"type":"cosmos-sdk/MsgWithdrawDelegationReward","value":{"delegator_address":"dx01s3eg45gllzke625eqlmrlc2gfj2j3xxpwjvjmw","validator_address":"dx0valoper1s3eg45gllzke625eqlmrlc2gfj2j3xxpz5ke7w"}}*/
const withdrawReward = (type, value) => {
    return <p><MsgType type={type}/> <Account address={value.delegator_address}/> withdraw rewards from <Account
        address={value.validator_address}/><T>common.fullStop</T></p>
}
const withdrawCommission = (type, value) => {
    return <p><MsgType type={type}/> <Account address={value.delegator_address}/> withdraw rewards from <Account
        address={value.validator_address}/><T>common.fullStop</T></p>
}
/*{"type":"cosmos-sdk/MsgModifyWithdrawAddress","value":{"delegator_address":"dx01s3eg45gllzke625eqlmrlc2gfj2j3xxpwjvjmw","withdraw_address":"dx0155fds64s33le8s5xjwk63ky6aqq80s0cksckqz"}}*/
const changeWithdrawAddress = (type, value) => {
    return <p><MsgType type={type}/> Delegator <Account address={value.delegator_address}/> changed the withdrawal
        address to <Account
            address={value.withdraw_address}/><T>common.fullStop</T></p>
}
/* {"type":"cosmos-sdk/MsgSubmitProposal",
 "value":{"content":{"type":"cosmos-sdk/TextProposal","value":{"title":"The","description":"thedescription"}},
 "initial_deposit":[{"denom":"mdap","amount":"5000000"}],
 "proposer":"dx01s3eg45gllzke625eqlmrlc2gfj2j3xxpwjvjmw"}}*/
const submissionProposal = (type, value) =>{
    let amount = value.initial_deposit.map ((coin) => new Coin (coin.amount, coin.denom).toString ()).join (', ');
    return <p><MsgType type={type}/> Proposed Topic: {value.content.value.title} <br/>Content: {value.content.value.description} <br/> Deposite: <span className="text-success">{amount}</span><br/>Proposed by: <Account address={value.proposer}/><T>common.fullStop</T></p>
}
/*{"type":"cosmos-sdk/MsgDeposit","value":{"proposal_id":"1","depositor":"dx01s3eg45gllzke625eqlmrlc2gfj2j3xxpwjvjmw","amount":[{"denom":"mdap","amount":"99000"}]}}*/
const makeDeposit = (type, value)=>{
    let amount = value.amount.map ((coin) => new Coin (coin.amount, coin.denom).toString ()).join (', ');
    return <p><MsgType type={type}/> Made deposit to proposal ID: {value.proposal_id} by <Account address={value.depositor}/><T>common.fullStop</T></p>
}
/*{"type":"cosmos-sdk/MsgVote","value":{"proposal_id":"2","voter":"dx0155fds64s33le8s5xjwk63ky6aqq80s0cksckqz","option":"Yes"}} */
const commitVote = (type, value) =>{
    return <p><MsgType type={type}/> Voter <Account address={value.voter}/> voted <Vote option={value.option}/> to the proposal-id {value.proposal_id}<T>common.fullStop</T></p>
}
/** <p>{JSON.stringify (r)}</p> **/
const createBond = (type, amount) => {

}

export class Activities extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        // console.log(this.props);
        const mg = this.props.msg;
        // const events = [];
        const invalid = this.props.invalid;
        // console.log ("invalid", this.props.invalid);
        if (invalid) {
            return <p>🛑 INVALID TRANSACTION: {JSON.stringify (mg)}</p>
        } else {

            switch (mg.type) {
                // bank
                case "cosmos-sdk/MsgSend":
                    if (mg.value.amount.length > 0) {
                        let amount = '';
                        amount = mg.value.amount.map ((coin) => new Coin (coin.amount, coin.denom).toString ()).join (', ');
                        return send_fund (mg.type, amount, mg.value.from_address, mg.value.to_address, invalid);
                    }
                case "cosmos-sdk/MsgMultiSend":
                    return MultiSend(mg)
                //staking
                case "cosmos-sdk/MsgCreateValidator":
                    let validamount = new Coin (mg.value.value.amount, mg.value.value.denom).toString ()
                    return createValidator (mg.type, validamount, mg.value.delegator_address, mg.value.description, mg)
                case "cosmos-sdk/MsgEditValidator":
                    return editValidator (mg.type, mg.value)
                case "cosmos-sdk/MsgDelegate":
                    return setDelegation (mg.type, mg.value.delegator_address, mg.value.validator_address, mg.value.amount)
                case "cosmos-sdk/MsgUndelegate":
                    return unbond (mg.type, mg.value)
                case "cosmos-sdk/MsgBeginRedelegate":
                    return redelegation (mg.type, mg.value)
                // gov
                case "cosmos-sdk/MsgSubmitProposal":
                    return submissionProposal(mg.type, mg.value)
                case "cosmos-sdk/MsgDeposit":
                    return makeDeposit(mg.type, mg.value)
                case "cosmos-sdk/MsgVote":
                    return commitVote(mg.type, mg.value)
                // distribution
                case "cosmos-sdk/MsgWithdrawValidatorCommission":
                    return <p>{JSON.stringify (mg)}</p>
                case "cosmos-sdk/MsgWithdrawDelegationReward":
                    return withdrawReward (mg.type, mg.value)
                case "cosmos-sdk/MsgModifyWithdrawAddress":
                    return changeWithdrawAddress (mg.type, mg.value)
                // slashing
                case "cosmos-sdk/MsgUnjail":
                    return unjailVailator (mg.type, mg.value)
                // ibc
                case "cosmos-sdk/IBCTransferMsg":
                    return <p>{JSON.stringify (mg)}</p>
                case "cosmos-sdk/IBCReceiveMsg":
                    return <p>{JSON.stringify (mg)}</p>
                case "treasury/MsgSend":
                    return <p>{JSON.stringify (mg)}</p>
                case "bonds/MsgCreateBond":
                    return <p><MsgType type={mg.type}/> <MsgDarkpooContent type={mg.type} payload={mg}/></p>
                default:
                    return <p>{JSON.stringify (mg)}</p>
            }

        }
    }
}

const darkpool_rnd = (invalid, payload_msg) => {
    if (payload_msg.type == "bonds/MsgCreateBond") {
        return <p><MsgType type={payload_msg.type}/> <MsgDarkpooContent type={payload_msg.type} payload={payload_msg}/>
        </p>
    } else {
        return <p>{invalid ? <T>activities.failedTo</T> : ''} <MsgType
            type={payload_msg.type}/> <DPMessageBlock type={payload_msg.type} payload={payload_msg}/></p>
    }
}


const bonds = () => {
    return <p>bond works here</p>
}


export class DxpActivities extends Component {
    constructor (props) {
        super (props);
    }

    render () {

        const msm = this.props.msg;
        const invalid = this.props.invalid;
        const type = msm.type;


        //  console.log ("-- DxpActivities 1")
        // console.log(this.props);


        if (invalid) {
            return <p>{JSON.stringify (invalid)}</p>
        }


        return darkpool_rnd (invalid, msm);
    }
}
