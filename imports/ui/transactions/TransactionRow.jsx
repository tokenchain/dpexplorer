import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { TxIcon } from '../components/Icons.jsx';
import CosmosErrors from '../components/CosmosErrors.jsx';
import TimeAgo from '../components/TimeAgo.jsx';
import numbro from 'numbro';
import Coin from '/both/utils/coins.js'
import SentryBoundary from '../components/SentryBoundary.jsx';
import { Markdown } from 'react-showdown';
import { Activites, Payload } from "../components/Activities";
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

let showdown = require ('showdown');
showdown.setFlavor ('github');
const T = i18n.createComponent ();

export const TransactionRow = (props) => {
    let content = props.tx;
    /**v1
     return <SentryBoundary><Row className={(content.code) ? "tx-info invalid" : "tx-info"}>
     <Col xs={12} lg={7}
     className="activity">{(content.tx.value.msg && content.tx.value.msg.length > 0) ? content.tx.value.msg.map ((msg, i) => {
            return <Card body key={i}><Activities msg={msg} invalid={(!!content.code)} events={content.events}/></Card>
        }) : ''}</Col>
     <Col xs={(!props.blockList) ? { size : 6, order : "last" } : { size : 12, order : "last" }}
     md={(!props.blockList) ? { size : 3, order : "last" } : { size : 7, order : "last" }}
     lg={(!props.blockList) ? { size : 1, order : "last" } : { size : 2, order : "last" }}
     className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link
     to={"/transactions/" + content.txhash}>{content.txhash}</Link></Col>
     <Col xs={6} md={9} lg={{ size : 2, order : "last" }} className="text-nowrap"><i
     className="material-icons">schedule</i> <span>{content.block () ?
            <TimeAgo time={content.block ().time}/> : ''}</span>{(content.tx.value.memo && content.tx.value.memo != "") ? <span>
            <i className="material-icons ml-2 memo-button" id={"memo-" + content.txhash}>message</i>
            <UncontrolledPopover trigger="legacy" placement="top-start" target={"memo-" + content.txhash}>
                <PopoverBody><Markdown markup={content.tx.value.memo}/></PopoverBody>
            </UncontrolledPopover>
        </span> : ""}</Col>
     {(!props.blockList) ? <Col xs={4} md={2} lg={1}><i className="fas fa-database d-lg-none"></i> <Link
         to={"/blocks/" + content.height}>{numbro (content.height).format ("0,0")}</Link></Col> : ''}
     <Col xs={(!props.blockList) ? 2 : 4} md={1}>{(!content.code) ? <TxIcon valid/> : <TxIcon/>}</Col>
     <Col xs={(!props.blockList) ? 6 : 8} md={(!props.blockList) ? 9 : 4} lg={2} className="fee"><i
     className="material-icons d-lg-none">monetization_on</i> {(content.tx.value.fee.amount.length > 0) ? content.tx.value.fee.amount.map ((fee, i) => {
            return <span className="text-nowrap"
                         key={i}>{(new Coin (parseFloat (fee.amount), (fee) ? fee.denom : null)).stakeString ()}</span>
        }) : <span>No fee</span>}</Col>
     {(content.code) ? <Col xs={{ size : 12, order : "last" }} className="error">
         <Alert color="danger">
             <CosmosErrors
                 code={content.code}
                 logs={content.logs}
                 gasWanted={content.gas_wanted}
                 gasUses={content.gas_used}
             />
         </Alert>
     </Col> : ''}
     </Row></SentryBoundary>
     <p>{JSON.stringify (tx)}</p>
     **/

    /**v2



     const valid_trans = content.logs.length > 0 && content.logs[0].success && !content.hasOwnProperty ("code");
     const has_msg = content.tx.msg && content.tx.msg.length > 0;
     const has_docdid = content.tx.hasOwnProperty ("payload") && content.tx.payload.length > 0;
     return <Row className={valid_trans ? "tx-info" : "tx-info invalid"}>


     <Col xs={12} lg={7} className="activity">{has_msg ? content.tx.msg.map ((msg, i) => {
            return <Card body key={i}><Activites msg={msg} invalid={!valid_trans} events={content.events}/></Card>
        }) : has_docdid ? content.tx.payload.map ((p, i) => {
            return <Card body key={i}><Payload msg={p} invalid={!valid_trans}/></Card>
        }) : ''}</Col><Col xs={(!props.blockList) ? { size : 6, order : "last" } : { size : 12, order : "last" }}
     md={(!props.blockList) ? { size : 3, order : "last" } : { size : 7, order : "last" }}
     lg={(!props.blockList) ? { size : 1, order : "last" } : { size : 2, order : "last" }}
     className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link
     to={"/transactions/" + content.hash}>{content.txhash}</Link></Col>{(!props.blockList) ?
        <Col xs={6} md={9} lg={{ size : 2, order : "last" }} className="text-nowrap"><i
            className="material-icons">schedule</i> <span>{content.block () ? <TimeAgo time={content.block ().time}/> : ''}</span></Col> : ''}
     {(!props.blockList) ? <Col xs={4} md={2} lg={1}><i className="fas fa-database d-lg-none"></i><Link
         to={"/blocks/" + content.height}>{numbro (content.height).format ("0,0")}</Link></Col> : ''} <Col
     xs={(!props.blockList) ? 2 : 4} md={1}>{valid_trans ? <TxIcon valid/> : <TxIcon/>}</Col><Col
     xs={(!props.blockList) ? 6 : 8} md={(!props.blockList) ? 9 : 4} lg={2} className="fee"><i
     className="material-icons d-lg-none">monetization_on</i> {content.tx.hasOwnProperty ("fee") && content.tx.fee.hasOwnProperty ("amount") ? content.tx.fee.amount.map ((fee, i) => {
        return <span className="text-nowrap"
                     key={i}>{(new Coin (parseFloat (fee.amount), (fee) ? fee.denom : null)).stakeString ()}</span>
    }) : <span><T>transactions.noFee</T></span>}</Col>


     {!valid_trans ?
        <Col xs={{ size : 12, order : "last" }} className="error">
            <Alert color="danger">
                <CosmosErrors
                    code={content.code}
                    logs={content.logs}
                    gasWanted={content.gas_wanted}
                    gasUses={content.gas_used}
                />
            </Alert>
        </Col> : ''}
     </Row>


     **/

    /** sample json from here.. https://www.newdevtools.com/jsoneditor


     */


    const valid_trans = content.logs.length > 0;
    const has_msg = content.tx.value.hasOwnProperty ("msg") && content.tx.value.msg.length > 0;
    const has_docdid = content.tx.hasOwnProperty ("payload") && content.tx.payload.length > 0;
    var booleans = {
        has_msg,
        has_docdid,
        valid_trans
    }
    // console.log ("print content now", JSON.stringify (content));
    //var items = "--";
    if (valid_trans) {
        return RenderRow (props, content, booleans);
    } else {
        return RenderErro (props, content);
    }

    // return { items };
}

/*
TransactionRow.propTypes = {
    key : PropTypes.number.isRequired,
    index : PropTypes.number.isRequired,
    tx : PropTypes.string.isRequired
}*/

/*

 */

function RenderRow (props, content, booleans) {
    return <Row className={booleans.valid_trans ? "tx-info" : "tx-info invalid"}>
        <Col xs={12} lg={7}
             className="activity">{booleans.has_msg ? ListMsgsRender (content.tx.value.msg, booleans.valid_trans, content.events) : booleans.has_docdid ? ListPayloads (content.tx.payload) : ''}</Col>
        {TxHashRen (props.blockList, content)}
        {TimeStampRen (props.blockList, content)}
        {BlockHeightRen (props.blockList, content)}
        <Col xs={(!props.blockList) ? 2 : 4} md={1}>{TxIconRender (booleans.valid_trans)}</Col>
        <Col xs={(!props.blockList) ? 6 : 8} md={(!props.blockList) ? 9 : 4} lg={2} className="fee">
            <i className="material-icons d-lg-none">monetization_on</i>
            {FeeCast (content)}
        </Col>
    </Row>

}


function RenderErro (props, content) {
    return <Row className="tx-info invalid">
        <Col xs={{ size : 12, order : "last" }} className="error">
            <Alert color="danger">
                <CosmosErrors
                    code={content.code}
                    logs={content.logs}
                    gasWanted={content.gas_wanted}
                    gasUses={content.gas_used}
                />
            </Alert>
        </Col>
    </Row>
}

function ListMsgsRender (messages, isValidTrans, events) {
    if (messages.length == 0) return "";
    return messages.map ((msg, i) => {
        return <Card body key={i}><Activites msg={msg} invalid={!isValidTrans} events={events}/></Card>
    })
}

function ListPayloads (items) {
    if (items.length == 0) return "";
    items.map ((p, i) => {
        return <Card body key={i}><Payload msg={p} invalid={!valid_trans}/></Card>
    })
}

function TxHashRen (blockList, content) {
    return <Col xs={(!blockList) ? { size : 6, order : "last" } : { size : 12, order : "last" }}
                md={(!blockList) ? { size : 3, order : "last" } : { size : 7, order : "last" }}
                lg={(!blockList) ? { size : 1, order : "last" } : { size : 2, order : "last" }}
                className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link
        to={"/transactions/" + content.txhash}>{content.txhash}</Link>
    </Col>
}

function TimeStampRen (listed, content) {
    if (listed) return "";
    return <Col xs={6} md={9} lg={{ size : 2, order : "last" }} className="text-nowrap"><i
        className="material-icons">schedule</i> <span>{content.timestamp ?
        <TimeAgo time={content.timestamp}/> : ''}</span></Col>
}


function BlockHeightRen (listed, content) {
    if (listed) return "";
    return <Col xs={4} md={2} lg={1}><i className="fas fa-database d-lg-none"></i><Link
        to={"/blocks/" + content.height}>{numbro (content.height).format ("0,0")}</Link></Col>
}

function TxIconRender (isValid) {
    return isValid ? <TxIcon valid/> : <TxIcon/>
}

function Fee (fees) {
    if (fees.length == 0) return "";
    return fees.map ((fee, i) => {
        const coin_render = new Coin (parseFloat (fee.amount), (fee) ? fee.denom : null).stakeString ();
        return <span className="text-nowrap" key={i}>{coin_render}</span>
    })
}

function FeeCast (content) {
    return content.tx.hasOwnProperty ("fee") && content.tx.fee.hasOwnProperty ("amount") ? Fee (content.tx.fee.amount) :
        <em><T>transactions.noFee</T></em>
}

