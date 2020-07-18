import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Spinner } from 'reactstrap';
import { Link, } from 'react-router-dom';
import numbro from 'numbro';
import moment from 'moment';
import Avatar from '../components/Avatar.jsx';
import TranactionTabs from '../transactions/TransactionTabs.jsx';
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import TimeStamp from '../components/TimeStamp.jsx';
import { StaticLoad } from '../components/LoadMore.jsx';
import { toast } from "react-toastify";

const T = i18n.createComponent ();
export default class Block extends Component {
    constructor (props) {
        super (props);

        this.state = {
            transferTxs : {},
            stakingTxs : {},
            distributionTxs : {},
            governanceTxs : {},
            slashingTxs : {},
            bondTxs : {},
            didTxs : {}
        };
    }

    componentDidUpdate (prevProps) {
        if (this.props != prevProps) {
            if (this.props.transactionsExist) {
                // console.log("have txs.");
                this.setState ({
                    transferTxs : this.props.transferTxs,
                    stakingTxs : this.props.stakingTxs,
                    distributionTxs : this.props.distributionTxs,
                    governanceTxs : this.props.governanceTxs,
                    slashingTxs : this.props.slashingTxs,
                    didTxs : this.props.didTxs,
                    bondTxs : this.props.bondTxs
                })
            }
        }
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
        if (this.props.loading) {
            return <Container id="block">
                <StaticLoad/>
            </Container>
            /* return <Spinner type="glow" color="primary"/>*/
        } else {
            if (this.props.blockExist) {
                // console.log(this.props.block);
                let block = this.props.block;
                let proposer = block.proposer ();
                let moniker = proposer ? proposer.description.moniker : '';
                let profileUrl = proposer ? proposer.profile_url : '';

                return <Container id="block">
                    <Helmet>
                        <title>Block {numbro (block.height).format ("0,0")} on Darkpool Hub</title>
                        <meta name="description" content={"Block details of height " + numbro (block.height).format ("0,0")}/>
                    </Helmet>
                    <h4><T>blocks.block</T> {numbro (block.height).format ("0,0")}</h4>
                    <Card>
                        <div className="card-header"><T>common.information</T></div>
                        <CardBody>
                            <Row>
                                <Col md={2} className="label"><T>common.hash</T></Col>
                                <Col md={10} className="value text-nowrap overflow-auto address">{block.hash} <i className="material-icons copy-button" data-address={block.hash} onClick={this.handleCopy}>file_copy</i></Col>
                                <Col md={2} className="label"><T>blocks.proposer</T></Col>
                                <Col md={10} className="value"><Link
                                    to={"/validator/" + ((proposer) ? proposer.operator_address : '')}><Avatar
                                    moniker={moniker} profileUrl={profileUrl} address={block.proposerAddress}
                                    list={true}/> {moniker}</Link></Col>
                                <Col md={2} className="label"><T>blocks.numOfTransactions</T></Col>
                                <Col md={10} className="value">{numbro (block.transNum).format ("0,0")}</Col>
                                <Col md={2} className="label"><T>common.time</T></Col>
                                <Col md={10} className="value"><TimeStamp time={block.time}/> ({moment (block.time).fromNow ()})</Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <TranactionTabs
                        didTxs={this.state.didTxs}
                        bondTxs={this.state.bondTxs}
                        transferTxs={this.state.transferTxs}
                        stakingTxs={this.state.stakingTxs}
                        distributionTxs={this.state.distributionTxs}
                        governanceTxs={this.state.governanceTxs}
                        slashingTxs={this.state.slashingTxs}
                    />
                </Container>
            } else {
                return <Container id="block">
                    <div><T>blocks.notFound</T></div>
                </Container>
            }
        }
    }
}
