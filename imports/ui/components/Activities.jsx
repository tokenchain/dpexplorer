import React, { Component } from 'react';
import { MsgType } from './MsgType.jsx';
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
    return <p>
        <MsgType type={type}/> <span
        className="text-success">{amount}</span> <T>activities.from</T> <Account address={from}/> {invalid ?
        <T>activities.failedTo</T> : ''} <T>activities.to</T> <span className="address"><Account
        address={to}/></span><T>common.fullStop</T></p>
}

export class Activites extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        // console.log(this.props);
        const singleMsg = this.props.msg;
        const events = [];
        const invalid = this.props.invalid;
        // console.log ("invalid", this.props.invalid);
        if (invalid) {
            return <p>{JSON.stringify (singleMsg)}</p>
        } else {
            for (let i in this.props.events) {
                events[this.props.events[i].type] = this.props.events[i].attributes
            }

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


export class Payload extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        // console.log(this.props);
        const msg = this.props.msg;
        const sign = JSON.parse (msg.signBytes);
        return <p>{(this.props.invalid) ? <T>activities.failedTo</T> : ''}<MsgType type="ixo/didDoc"/> {msg.didDoc.did}
            <span className="address">{msg.didDoc.pubKey}</span><T>common.fullStop</T></p>

    }
}
