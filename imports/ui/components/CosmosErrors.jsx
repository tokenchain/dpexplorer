import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Row, Col, Card, Alert, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import numbro from 'numbro';
import PropTypes from 'prop-types';
import Check from '/both/utils/erros.js'
import {
    ErrHashRen,
    TimeStampRen,
    BlockHeightRen,
    TxIconRender,
    Fee,
    FeeCast,
} from '/imports/ui/transactions/ListElements.js';

export default class CosmosErrors extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        const { code, raw_log, codespace, txhash } = this.props.errors;
        const checker = new Check (code, codespace, this.props.errors);
        const content = this.props.errors;
        return <Row className="tx-info invalid">
            <Col xs={12} lg={7} className="error activity">
                <Alert color="danger">
                    <div><Badge color="dark">{checker.GetMessage ()}</Badge> {raw_log} </div>
                </Alert>
            </Col>
            <ErrHashRen blockList={false} txhash={txhash}/>
            <TimeStampRen blockList={false} content={content}/>
            <BlockHeightRen blockList={false} content={content}/>
            <Col xs={2} md={1}><TxIconRender valid={false}/></Col>
            <Col xs={6} md={9} lg={2} className="fee">
                <i className="material-icons d-lg-none">monetization_on</i> <FeeCast content={content}/>
            </Col>
        </Row>
    }
}

CosmosErrors.propTypes = { errors : PropTypes.object.isRequired }

export class DPErrorsBadge extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        const { code, raw_log, codespace, txhash } = this.props.errors;
        const checker = new Check (code, codespace, this.props.errors);
        const content = this.props.errors;
        return <Row>
            <Col xs={{ size : 12, order : "last" }} className="error">
                <Alert color="danger">
                    <div><Badge color="dark">{checker.GetMessage ()}</Badge> {raw_log} </div>
                </Alert>
            </Col>
        </Row>
    }
}

DPErrorsBadge.propTypes = { errors : PropTypes.object.isRequired }
