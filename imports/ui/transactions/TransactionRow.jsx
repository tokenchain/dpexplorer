import React, { Component } from 'react';

import CosmosErrors from '../components/CosmosErrors.jsx';

import {
    RenderRow,
} from './ListElements.js';

export const TransactionRow = (props) => {
    let content = props.tx;

    const valid_trans = content.hasOwnProperty ("logs") && content.logs.length > 0;
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
        return <RenderRow content={content} bools={booleans}/>;
    } else {
        return <CosmosErrors errors={content}/>;
    }

    // return { items };
}
