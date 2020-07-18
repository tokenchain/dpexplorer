import React, { Component } from 'react';

import CosmosErrors from '../components/CosmosErrors.jsx';

import {
    RenderRow,
} from './ListElements.js';

export const TransactionRow = (props) => {
    let content = props.tx;

    const valid_trans = content.hasOwnProperty ("logs") && content.logs.length > 0;
    const has_msg = content.tx.value.hasOwnProperty ("msg") && content.tx.value.msg.length > 0;
    const has_msg_did = content.tx.value.hasOwnProperty ("payload") && content.tx.value.payload.length > 0;
    var booleans = {
        has_msg,
        has_msg_did,
        valid_trans
    }


    if (valid_trans) {
        return <RenderRow content={content} bools={booleans}/>;
    } else {
        return <CosmosErrors errors={content}/>;
    }

    // return { items };
}
