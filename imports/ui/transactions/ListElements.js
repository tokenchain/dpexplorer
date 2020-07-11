import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import TimeAgo from '../components/TimeAgo.jsx';
import { TxIcon } from '../components/Icons.jsx';

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



function hasFee (content) {
    return content.tx.hasOwnProperty ("fee") && content.tx.fee.hasOwnProperty ("amount");
}

function fee_cast (content) {
    return hasFee (content) ? Fee (content.tx.fee.amount) : <em><T>transactions.noFee</T></em>;
}


function list_msg_rnd (messages, isValidTrans, events) {
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

export const RenderRow = (props) => {
    const content = props.content;
    const booleans = props.bools;
    return <Row className={booleans.valid_trans ? "tx-info" : "tx-info invalid"}>
        <Col xs={12} lg={7}
             className="activity">{booleans.has_msg ? list_msg_rnd (content.tx.value.msg, booleans.valid_trans, content.events) : booleans.has_docdid ? ListPayloads (content.tx.payload) : ''}</Col>
        {txHashRender (props.blockList, content)}
        {timestamprender (props.blockList, content)}
        {blockheightelement (props.blockList, content)}
        <Col xs={(!props.blockList) ? 2 : 4} md={1}>{iconrender (booleans.valid_trans)}</Col>
        <Col xs={(!props.blockList) ? 6 : 8} md={(!props.blockList) ? 9 : 4} lg={2} className="fee">
            <i className="material-icons d-lg-none">monetization_on</i>
            {fee_cast (content)}
        </Col>
    </Row>
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
