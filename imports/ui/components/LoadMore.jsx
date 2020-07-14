import React from 'react';
import { Card, CardHeader, CardBody, Container, Row, Col, Spinner } from 'reactstrap';
//import { Spinner } from 'reactstrap';

export const LoadMore = (props) => {
    if (props.show) {
        return <div id="loadmore" className="text-center disc-box">
            <div class="cd disc small"></div>
        </div>
    }
    else {
        return <div/>
    }
}
export const StaticLoad = (props) => {
    var class_names = "cd disc record";
  //  class_names = class_names + props.size;
//    class_names = class_names + props.color;

    return <div id="loadmore" className="text-center disc-box">
        <div className={class_names}></div>
    </div>
}

export const LoadSilver = (props) => {
    return <div id="loadmore" className="text-center disc-box">
        <div class="record gold disc small"></div>
    </div>
}
