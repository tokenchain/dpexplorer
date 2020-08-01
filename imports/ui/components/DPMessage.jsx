import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import numbro from "numbro";
import moment from "moment/moment";
import { Container, Row, Col, Card, CardBody, Alert, Spinner } from 'reactstrap';
import Account, { DXPAccount } from '../components/Account.jsx';
import Coin from "../../../both/utils/coins";

const T = i18n.createComponent ();


export class DPMessageBlock extends Component {
    constructor (props) {
        super (props);
        this.state = {
            type : props.type,
            payval : props.payload.value,
            raw : props.payload
        }
    }

    getFromToAmount () {
        let amount = "", from = "", to = "";
        const valid_amount = this.state.payval.hasOwnProperty ("amount") && this.state.payval.amount.length > 0;
        if (valid_amount) {
            amount = this.state.payval.amount.map ((coin) => new Coin (coin.amount, coin.denom).toString ()).join (', ');
        }

        if (this.state.type == "treasury/MsgOracleMint") {
            from = this.state.payval.oracle_did;
            to = this.state.payval.to_did;
        } else {
            from = this.state.payval.from_did;
            to = this.state.payval.to_did;
        }

        from = this.state.payval.from_did;
        to = this.state.payval.to_did;

        return { from, to, amount }
    }

    render () {
        const { from, to, amount } = this.getFromToAmount ();

        switch (this.state.type) {
            case "did/MsgAddDid":
                return <span><span className="address">{this.state.payval.didDoc.did}</span> by <span
                    className="address">{this.state.payval.didDoc.pubKey}</span> <T>common.fullStop</T></span>
            case "bonds/MsgEditBond":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/FunctionParam":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/MsgBuy":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/MsgSell":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/MsgSwap":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/SwapOrder":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/SellOrder":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/Batch":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/BuyOrder":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "bonds/Bond":
                return <span className="address">{this.state.payval.creator_did}</span>
            case "treasury/MsgSend":
                /*

                 {"type":"treasury/MsgSend","value":{"from_did":"did:dxp:G2CRh3ezo8PyyHQkQB1Pur","to_did":"did:dxp:6sfePrsqYBKUSxQkWRgDXW","amount":[{"denom":"mdap","amount":"20000"}]}}
                  <span>{JSON.stringify(props.payload)}</span>

                 */

                return <span><span
                    className="text-success">{amount}</span> <T>activities.from</T> <DXPAccount address={from}/>
                    <T>activities.to</T> <span className="address"><DXPAccount
                        address={to}/></span><T>common.fullStop</T>
                </span>
            case "treasury/MsgOracleMint":

                /*

                {"type":"treasury/MsgOracleMint","value":{"oracle_did":"did:dxp:Hx4USpQFPVJy7acXLkcULb","to_did":"did:dxp:W7cq8LVSYvLAWgJWQZsqWr","amount":[{"denom":"mdap","amount":"100000881"}],"proof":"japanx"}}

                 */
                const hasProof = this.state.payval.proof != "";
                let proof_msg = "";
                if (hasProof) {
                    proof_msg = " with proof \"" + this.state.payval.proof + "\"";
                }
                return <span>
                    <span className="text-success">{amount}</span> <T>activities.to</T> <span
                    className="address"><DXPAccount
                    address={to}/></span> {proof_msg} <T>common.fullStop</T>
                </span>

            default:
                return <span className="address">[ {JSON.stringify (this.state.raw)} ]</span>
        }
    }

}
