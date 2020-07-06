import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import numbro from 'numbro';
import PropTypes from 'prop-types';
import E from '/both/utils/erros.js'
/*


export default class CosmosErrors extends Component {
    constructor (props) {
        super (props);
        this.state = {
            error : errors.sdk[1],
            message : ""
        }
        if (props.logs) {
            if (props.logs.length > 0) {
                for (let i in props.logs) {
                    if (!props.logs[i].success) {
                        let error = {};
                        try {
                            error = JSON.parse (props.logs[i].log);
                        }
                        catch (e) {
                            debug (e);
                            error = {
                                code : 1,
                                message : "Unknown error"
                            }
                        }

                        this.state = {
                            error : (error.codespace && error.code && errors[error.codespace] && errors[error.codespace][error.code]) || "Unknown error",
                            message : error.message || ""
                        }
                    }
                }
            }
        }
        else {
            if (props.code == 12) {
                this.state = {
                    error : errors.sdk[12],
                    message : "gas uses (" + numbro (props.gasUses).format ("0,0") + ") > gas wanted (" + numbro (props.gasWanted).format ("0,0") + ")"
                }
            }
        }
    }

    render () {
        return <div>{this.state.error}: <Badge color="dark">{this.state.message}</Badge></div>
    }
}
*/
export default class CosmosErrors extends Component {
    constructor (props) {
        super (props);
    }

    render () {
        return <div>{this.props.code}: <Badge color="dark">{this.props}</Badge></div>
    }
}

CosmosErrors.propTypes = {
    code : PropTypes.number.isRequired,
    log : PropTypes.string.isRequired
}

