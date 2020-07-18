import React, { Component } from 'react';
import { MsgType, MsgDarkpooContent } from './MsgType.jsx';
import { Container, Row, Col, Card, CardBody, Alert, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import Account from '../components/Account.jsx';
import i18n from 'meteor/universe:i18n';
import Coin from '/both/utils/coins.js'
import _ from 'lodash';

const T = i18n.createComponent ();

MultiSend = (props) => {
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

const send_fund = (amount, type, from, to, invalid) => {
    return <p><MsgType type={type}/> <span
        className="text-success">{amount}</span> <T>activities.from</T> <Account address={from}/> {invalid ?
        <T>activities.failedTo</T> : ''} <T>activities.to</T> <span className="address"><Account
        address={to}/></span><T>common.fullStop</T></p>
}

export class Activities extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        // console.log(this.props);
        const singleMsg = this.props.msg;
        // const events = [];
        const invalid = this.props.invalid;
        // console.log ("invalid", this.props.invalid);
        if (invalid) {
            return <p>🛑 INVALID TRANSACTION: {JSON.stringify (singleMsg)}</p>
        } else {
            /* for (let i in this.props.events) {
                 events[this.props.events[i].type] = this.props.events[i].attributes
             }*/

            if (singleMsg.value.amount.length > 0) {
                let amount = '';
                amount = singleMsg.value.amount.map ((coin) => new Coin (coin.amount, coin.denom).toString ()).join (', ');
                return send_fund (amount, singleMsg.type, singleMsg.value.from_address, singleMsg.value.to_address, invalid);

            } else {
                return <p>{JSON.stringify (singleMsg)}</p>
            }

        }
    }
}

const darkpool_rnd = (invalid, payload_msg) => {
    if (payload_msg.type == "bonds/MsgCreateBond") {
        return <MsgDarkpooContent type={payload_msg.type} payload={payload_msg}/>
    } else {
        return <p>{invalid ? <T>activities.failedTo</T> : ''} <MsgType
            type={payload_msg.type}/> <MsgDarkpooContent type={payload_msg.type} payload={payload_msg}/></p>
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
