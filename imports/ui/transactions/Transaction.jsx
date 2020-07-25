import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Alert, Spinner } from 'reactstrap';
import { TxIcon } from '../components/Icons.jsx';
import { Activites } from '../components/Activities.jsx';
import { BondIssuranceDetail } from '../components/MsgType.jsx';
import CosmosErrors, { DPErrorsBadge } from '../components/CosmosErrors.jsx';
import { Link } from 'react-router-dom';
import { Markdown } from 'react-showdown';
import numbro from 'numbro';
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import Coin from '/both/utils/coins.js';
import TimeStamp from '../components/TimeStamp.jsx';
import { StaticLoad, LoadSilver } from '../components/LoadMore.jsx';
import { toast } from "react-toastify";
import { Activities, DxpActivities } from "../components/Activities";

const T = i18n.createComponent ();
export default class Transaction extends Component {
    constructor (props) {
        super (props);
        let showdown = require ('showdown');
        showdown.setFlavor ('github');
    }

    handleCopy = (e) => {
        const el = document.createElement ('textarea');
        el.value = e.target.dataset.address;
        el.setAttribute ('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        e.target.appendChild (el);
        el.select ();
        document.execCommand ('copy');
        e.target.removeChild (el);

        toast ("👌🏼 Block hash copied.");
    }

    render () {
        // let denom = this.props.denom;
        if (this.props.loading) {
            return <Container id="transaction">
                <LoadSilver/>
            </Container>
        } else {
            if (this.props.transactionExist) {
                let content = this.props.transaction;
                let display = JSON.stringify (content);
                return <Container id="transaction">
                    {Title (content)}
                    {Topic (content)}
                    {ErrorTrans (content)}
                    {detail (content, this.handleCopy)}
                    {activity (content)}
                </Container>
            } else {
                return <Container id="transaction">
                    <div><T>transactions.noTxFound</T></div>
                </Container>
            }
        }
    }
}

const Title = (tx) => {
    return <Helmet>
        <title>Transaction {tx.txhash} on Darkpool Hub</title>
        <meta name="description" content={"Details of transaction " + tx.txhash}/>
    </Helmet>
}
const Topic = (tx) => {
    return <h4><T>transactions.transaction</T> {(!tx.code) ? <TxIcon valid/> : <TxIcon/>}</h4>
}

const ErrorTrans = (tx) => {
    return (tx.code) ? <DPErrorsBadge errors={tx}/> : ''
}
const detail = (tx, copyfunction) => {
    return <Card>
        <div className="card-header"><T>common.information</T></div>
        <CardBody>
            <Row>
                <Col md={2} className="label"><T>common.hash</T></Col>
                <Col md={10} className="value text-nowrap overflow-auto address" data-address={tx.txhash}
                     onClick={copyfunction}>{tx.txhash}<i className="material-icons copy-button">file_copy</i></Col>
                <Col md={2} className="label"><T>common.height</T></Col>
                <Col md={10} className="value">
                    <Link to={"/blocks/" + tx.height}>{numbro (tx.height).format ("0,0")}</Link>
                    {tx.timestamp ? <span> <TimeStamp time={tx.timestamp}/></span> : null}
                </Col>

                <Col md={2} className="label"><T>transactions.fee</T></Col>
                {feeWrapper (tx)}
                <Col md={2} className="label"><T>transactions.gasUsedWanted</T></Col>
                <Col md={10}
                     className="value">{numbro (tx.gas_used).format ("0,0")} / {numbro (tx.gas_wanted).format ("0,0")}</Col>
                <Col md={2} className="label"><T>transactions.memo</T></Col>
                <Col md={10} className="value"><Markdown markup={tx.tx.value.memo}/></Col>

            </Row>
        </CardBody>
    </Card>
}


const feeWrapper = (tx) => {
    return <Col md={10} className="value">{(tx.tx.value.fee.amount.length > 0) ? tx.tx.value.fee.amount.map ((fee, i) => {
        return <span className="text-nowrap"
                     key={i}> {((fee.amount / Meteor.settings.public.stakingFraction) >= 1) ? (new Coin (parseFloat (fee.amount), fee.denom)).stakeString () : (new Coin (parseFloat (fee.amount), fee.denom)).mintString ()} </span>
    }) : <span><T>transactions.noFee</T></span>}</Col>
}
const activity = (content) => {

    const valid_trans = content.hasOwnProperty ("logs") && content.logs.length > 0;
    const has_cosmos_msg = content.tx.value.hasOwnProperty ("msg") && content.tx.value.msg.length > 0;
    const has_did_base_msg = content.tx.value.hasOwnProperty ("payload") && content.tx.value.payload.length > 0;

    const booleans = {
        has_cosmos_msg,
        has_did_base_msg,
        valid_trans
    }
    /* if (has_did_base_msg && content.tx.value.type == "bonds/MsgCreateBond") {
         return <Card>
             <div className="card-header"><T>transactions.activities</T></div>
             <CardBody>{

                 content.tx.value.payload.map ((m, i) => {
                     return <Row key={i}>
                         <BondIssuranceDetail bondAttrs={m.value}/>
                     </Row>
                 })


             }</CardBody>
         </Card>
     } else */

    if (has_did_base_msg) {
        return <Card>
            <div className="card-header"><T>transactions.activities</T></div>
            <CardBody>{

                content.tx.value.payload.map ((m, i) => {
                    return <Row key={i}>
                        <DxpActivities msg={m} invalid={!valid_trans}/>
                    </Row>
                })


            }</CardBody>
        </Card>

    }
    if (has_cosmos_msg) {
        return <Card>
            <div className="card-header"><T>transactions.activities</T></div>
            <CardBody>{
                content.tx.value.msg.map ((m, i) => {
                    return <Row key={i}>
                        <Activities msg={m} invalid={!valid_trans}/>
                    </Row>

                })

            }</CardBody>
        </Card>
    }


    return <Card>
        <div className="card-header"><T>transactions.activities</T></div>
        <CardBody> N/A </CardBody>
    </Card>
}

function card_wrapper (elements) {
    return <Card>
        <div className="card-header"><T>transactions.activities</T></div>
        <CardBody>{elements}</CardBody></Card>
}

const activity_detail = (content) => {

    const valid_trans = content.hasOwnProperty ("logs") && content.logs.length > 0;
    const has_msg = content.tx.value.hasOwnProperty ("msg") && content.tx.value.msg.length > 0;
    const has_docdid = content.tx.hasOwnProperty ("payload") && content.tx.payload.length > 0;

    const booleans = {
        has_msg,
        has_docdid,
        valid_trans
    }

    return has_msg ? content.tx.value.msg.map ((m, i) => {
        return <Row key={i}>


        </Row>
    }) : ""
}

function blockheightelement (listed, content) {
    if (listed) return "";
    return <Col xs={4} md={2} lg={1}><i className="fas fa-database d-lg-none"></i><Link
        to={"/blocks/" + content.height}>{numbro (content.height).format ("0,0")}</Link></Col>
}


/*







   <Activities msg={msg} invalid={valid_trans}/>


export default class Transaction extends Component{
    constructor(props){
        super(props);
        let showdown  = require('showdown');
        showdown.setFlavor('github');
        let denom = this.props.denom;
    }

    render(){


        if (this.props.loading){
            return <Container id="transaction">
                <Spinner type="grow" color="primary" />
            </Container>
        }
        else{
            if (this.props.transactionExist){
                let tx = this.props.transaction;
                return <Container id="transaction">
                    <Helmet>
                        <title>Transaction {tx.txhash} on Cosmos Hub | The DP Hub</title>
                        <meta name="description" content={"Details of transaction "+tx.txhash} />
                    </Helmet>
                    <h4><T>transactions.transaction</T> {(!tx.code)?<TxIcon valid />:<TxIcon />}</h4>
                    {(tx.code)?<Row><Col xs={{size:12, order:"last"}} className="error">
                        <Alert color="danger">
                            <CosmosErrors
                                code={tx.code}
                                logs={tx.logs}
                                gasWanted={tx.gas_wanted}
                                gasUses={tx.gas_used}
                            />
                        </Alert>
                    </Col></Row>:''}
                    <Card>
                        <div className="card-header"><T>common.information</T></div>
                        <CardBody>
                            <Row>
                                <Col md={4} className="label"><T>common.hash</T></Col>
                                <Col md={8} className="value text-nowrap overflow-auto address">{tx.txhash}</Col>
                                <Col md={4} className="label"><T>common.height</T></Col>
                                <Col md={8} className="value">
                                    <Link to={"/blocks/"+tx.height}>{numbro(tx.height).format("0,0")}</Link>
                                    {tx.block()?<span> <TimeStamp time={tx.block().time}/></span>:null}
                                </Col>


                                <Col md={4} className="label"><T>transactions.fee</T></Col>
                                <Col md={8} className="value">{(tx.tx.value.fee.amount.length > 0)?tx.tx.value.fee.amount.map((fee,i) => {
                                    return <span className="text-nowrap" key={i}> {((fee.amount/Meteor.settings.public.stakingFraction)>=1)?(new Coin(parseFloat(fee.amount), fee.denom)).stakeString():(new Coin(parseFloat(fee.amount), fee.denom)).mintString()} </span>
                                }):<span><T>transactions.noFee</T></span>}</Col>
                                <Col md={4} className="label"><T>transactions.gasUsedWanted</T></Col>
                                <Col md={8} className="value">{numbro(tx.gas_used).format("0,0")} / {numbro(tx.gas_wanted).format("0,0")}</Col>
                                <Col md={4} className="label"><T>transactions.memo</T></Col>
                                <Col md={8} className="value"><Markdown markup={ tx.tx.value.memo } /></Col>

                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <div className="card-header"><T>transactions.activities</T></div>
                    </Card>
                    {(tx.tx.value.msg && tx.tx.value.msg.length >0)?tx.tx.value.msg.map((msg,i) => {
                        return <Card body key={i}><Activities msg={msg} invalid={(!!tx.code)} events={tx.events} denom ={this.denom}/></Card>
                    }):''}
                </Container>
            }
            else{
                return <Container id="transaction"><div><T>transactions.noTxFound</T></div></Container>
            }
        }
    }
}








*/
