import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import i18n from 'meteor/universe:i18n';
import numbro from "numbro";
import moment from "moment/moment";
import { Container, Row, Col, Card, CardBody, Alert, Spinner } from 'reactstrap';
import Account, { DXPAccount } from '../components/Account.jsx';
import Coin from "../../../both/utils/coins";

const T = i18n.createComponent ();

const isTresuryValid = /^([treasury])+/g

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
        let amount = "", from = "", to = "", oracle = "";
        const valid_amount = this.state.payval.hasOwnProperty ("amount") && this.state.payval.amount.length > 0;
        if (valid_amount) {
            amount = this.state.payval.amount.map ((coin) => new Coin (coin.amount, coin.denom).toString ()).join (', ');
        }

        if (this.state.type.match (isTresuryValid)) {
            oracle = this.state.payval.oracle_did;
            to = this.state.payval.to_did;
        } else {
            from = this.state.payval.from_did;
            to = this.state.payval.to_did;
        }

        from = this.state.payval.from_did;
        to = this.state.payval.to_did;

        return { from, to, amount, oracle }
    }

    getOracle (did) {
        return <span className="badge badge-dark">Oracle ID: {did}</span>
    }

    getProof (proof_msg) {
        return <span className="badge badge-warning encrypted-block">{proof_msg}</span>
    }

    getPubkey (key_msg) {
        return <span className="badge badge-pub encrypted-block">{key_msg}</span>
    }

    render () {
        const { from, to, amount, oracle } = this.getFromToAmount ();

        const hasProof = this.state.payval.proof != "";
        let proof_msg = "";
        if (hasProof) {
            proof_msg = "codec: " + this.state.payval.proof;
        }

        switch (this.state.type) {
            case "did/MsgAddDid":
                return <span><span class="address">{this.state.payval.didDoc.did}</span> by <span
                    class="address">{this.getPubkey (this.state.payval.didDoc.pubKey)}</span><T>common.fullStop</T></span>
            case "bonds/MsgEditBond":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/FunctionParam":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/MsgBuy":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/MsgSell":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/MsgSwap":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/SwapOrder":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/SellOrder":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/Batch":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/BuyOrder":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "bonds/Bond":
                return <span class="address">{this.state.payval.creator_did}</span>
            case "treasury/MsgSend":
                /*

                 {"type":"treasury/MsgSend","value":{"from_did":"did:dxp:G2CRh3ezo8PyyHQkQB1Pur","to_did":"did:dxp:6sfePrsqYBKUSxQkWRgDXW","amount":[{"denom":"mdap","amount":"20000"}]}}
                  <span>{JSON.stringify(props.payload)}</span>

                 */

                return <span>
                    <span class="text-success">{amount}</span> <T>activities.from</T> <DXPAccount address={from}/>
                    <T>activities.to</T> <span class="address"><DXPAccount
                    address={to}/></span> {this.getOracle (oracle)}<T>common.fullStop</T>
                </span>
            case "treasury/MsgOracleMint":

                /*

                {"type":"treasury/MsgOracleMint","value":{"oracle_did":"did:dxp:Hx4USpQFPVJy7acXLkcULb","to_did":"did:dxp:W7cq8LVSYvLAWgJWQZsqWr","amount":[{"denom":"mdap","amount":"100000881"}],"proof":"japanx"}}

                 */

                return <span>
                    <span class="text-success">{amount}</span> <T>activities.to</T> <span
                    class="address"><DXPAccount
                    address={to}/></span> {this.getProof (proof_msg)} {this.getOracle (oracle)}<T>common.fullStop</T>
                </span>

            case "treasury/MsgOracleTransfer":
                /*
                [ {"type":"treasury/MsgOracleTransfer","value":{"oracle_did":"did:dxp:Hx4USpQFPVJy7acXLkcULb","from_did":"did:dxp:W7cq8LVSYvLAWgJWQZsqWr","to_did":"did:dxp:Huue4uqnJr8AR49eeqEtG","amount":[{"denom":"mdap","amount":"33300"}],"proof":"japanx"}} ]
                 */
                return <span>
                    <span class="text-success">{amount}</span> <T>activities.from</T> <DXPAccount
                    address={from}/> <T>activities.to</T> <span class="address"><DXPAccount
                    address={to}/></span> {this.getProof (proof_msg)} {this.getOracle (oracle)}<T>common.fullStop</T>
                </span>
            default:
                return <span class="address">[ {JSON.stringify (this.state.raw)} ]</span>
        }
    }

}
