import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import TimeAgo from '../components/TimeAgo.jsx';
import { TxIcon } from '../components/Icons.jsx';

import numbro from 'numbro';
import Coin from '/both/utils/coins.js'
import SentryBoundary from '../components/SentryBoundary.jsx';
import { Markdown } from 'react-showdown';
import { Activities, DxpActivities } from "../components/Activities";
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

let showdown = require ('showdown');
showdown.setFlavor ('github');
const T = i18n.createComponent ();


function hasFee (content) {
    return content.tx.hasOwnProperty ("fee") && content.tx.fee.hasOwnProperty ("amount");
}

function fee_cast (content) {
    return hasFee (content) ? Fee (content.tx.fee.amount) : <em><T>transactions.noFee</T></em>;
}


function list_msg_rnd (messages, isValidTrans, events) {
    if (messages.length == 0) return "";
    return messages.map ((msg, i) => {
        return <Card body key={i}><Activities msg={msg} invalid={!isValidTrans}/></Card>
    })
}


function list_payload_rnd (items, valid_trans, events) {
    if (items.length == 0) return "";
    return items.map ((p, i) => {
        return <Card body key={i} className="overflow-hidden"><DxpActivities msg={p} invalid={!valid_trans}/></Card>
    })
}


function txHashRender (blockList, content) {
    return <Col xs={(!blockList) ? { size : 6, order : "last" } : { size : 12, order : "last" }}
                md={(!blockList) ? { size : 3, order : "last" } : { size : 7, order : "last" }}
                lg={(!blockList) ? { size : 1, order : "last" } : { size : 2, order : "last" }}
                className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link
        to={"/transactions/" + content.txhash}>{content.txhash}</Link>
    </Col>
}

function timestamprender (listed, content) {
    if (listed) return "";
    return <Col xs={6} md={9} lg={{ size : 2, order : "last" }} className="text-nowrap"><i
        className="material-icons">schedule</i> <span>{content.timestamp ?
        <TimeAgo time={content.timestamp}/> : ''}</span></Col>
}


function blockheightelement (listed, content) {
    if (listed) return "";
    return <Col xs={4} md={2} lg={1}><i className="fas fa-database d-lg-none"></i><Link
        to={"/blocks/" + content.height}>{numbro (content.height).format ("0,0")}</Link></Col>
}

function iconrender (isValid) {
    return isValid ? <TxIcon valid/> : <TxIcon/>
}

function Fee (fees) {
    if (fees.length == 0) return "";
    return fees.map ((fee, i) => {
        const coin_render = new Coin (parseFloat (fee.amount), (fee) ? fee.denom : null).stakeString ();
        return <span className="text-nowrap" key={i}>{coin_render}</span>
    })
}

export const TxIconRender = (props) => {
    return iconrender (props.valid);
}

export const FeeCast = (props) => {
    return fee_cast (props.content);
}


export const ErrHashRen = (props) => {
    const txhash = props.txhash;
    return <Col xs={{ size : 6, order : "last" }}
                md={{ size : 3, order : "last" }}
                lg={{ size : 1, order : "last" }}
                className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link
        to={"/transactions/" + txhash}>{txhash}</Link>
    </Col>
}
export const RenderRow = (props) => {
    const content = props.content;
    const {
        has_msg,
        has_msg_did,
        valid_trans
    } = props.bools;

    // console.log ("tx content :", JSON.stringify (content));

    var elements = ""

    if (has_msg) {
        elements = list_msg_rnd (content.tx.value.msg, valid_trans, content.events)
    }
    if (has_msg_did) {
        elements = list_payload_rnd (content.tx.value.payload, valid_trans, content.events)
    }
    return <Row className={valid_trans ? "tx-info" : "tx-info invalid"}>
        <Col xs={12} lg={7} className="activity">{elements}</Col>
        {txHashRender (props.blockList, content)}
        {timestamprender (props.blockList, content)}
        {blockheightelement (props.blockList, content)}
        <Col xs={(!props.blockList) ? 2 : 4} md={1}>{iconrender (valid_trans)}</Col>
        <Col xs={(!props.blockList) ? 6 : 2} md={(!props.blockList) ? 9 : 2} lg={2} className="fee">
            <i className="material-icons d-lg-none">monetization_on</i>
            {fee_cast (content)}
        </Col>

    </Row>
}


export const TxHashRen = (props) => {
    const block_list = props.blockList;
    const content = props.content;
    return txHashRender (block_list, content);
}


export const TimeStampRen = (props) => {
    const block_list = props.blockList;
    const content = props.content;
    return timestamprender (block_list, content);
}

export const BlockHeightRen = (props) => {
    const block_list = props.blockList;
    const content = props.content;
    return blockheightelement (block_list, content);
}
