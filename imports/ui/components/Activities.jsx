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
                            return <span key={j}
                                         className="text-success">{new Coin (coin.amount, coin.denom).toString ()}</span>
                        })}
                    </li>
                })}
            </ul>
            <T>activities.receivers</T>
            <ul>
                {props.msg.value.outputs.map ((data, i) => {
                    return <li key={i}><Account address={data.address}/>
                        <T>activities.received</T> {data.coins.map ((coin, j) => {
                            return <span key={j}
                                         className="text-success">{new Coin (coin.amount, coin.denom).toString ()}</span>
                        })}</li>
                })}
            </ul>
        </p>
    </div>
}

export class Activites extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        // console.log(this.props);
        const msg = this.props.msg;
        const events = [];
       // console.log ("invalid", this.props.invalid);
        if (this.props.invalid) {
            return <p>{JSON.stringify (msg)}</p>
        } else {

            for (let i in this.props.events) {
                events[this.props.events[i].type] = this.props.events[i].attributes
            }


            if (msg.amount.length > 0) {
                let amount = '';
                amount = msg.amount.map ((coin) => new Coin (coin.amount, coin.denom).toString ()).join (', ');

                return <p><Account address={msg.from_address}/> {(this.props.invalid) ?
                    <T>activities.failedTo</T> : ''}<MsgType type="cosmos-sdk/MsgSend"/> <span
                    className="text-success">{amount}</span> <T>activities.to</T> <span className="address"><Account
                    address={msg.to_address}/></span><T>common.fullStop</T></p>

            } else {
                return <p>{JSON.stringify (msg)}</p>
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
