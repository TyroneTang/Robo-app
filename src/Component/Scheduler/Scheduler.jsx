import React, {Fragment} from 'react';
import { Col, Row, ProgressBar } from "react-bootstrap";




function Scheduler({scheduler1, scheduler2}) {
    console.log(scheduler2);
    
    return (
        <Fragment>
            <Col md={12} className="midbox">
                <div>
                    <h6>Scheduler</h6>
                </div>
                <div>
                    <Row>
                        <Col md={1} className="d-flex justify-content-center">Start</Col>
                        <Col md={4}></Col>
                        <Col md={2} className="d-flex justify-content-center">Point 1</Col>
                        <Col md={4}></Col>
                        <Col md={1} className="d-flex justify-content-center">Point 2</Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col md={1} className="d-flex justify-content-center">
                            <div id="start_pin_dot"></div>
                        </Col>
                        <Col md={4} className="d-flex flex-column p-0">
                            <ProgressBar animated now={scheduler1.progress_bar} label={`${scheduler1.percentage}%`} className="p-0" />
                        </Col>
                        <Col md={2} className="d-flex justify-content-center">
                            <div id="pin_1_dot" className=""></div>
                        </Col>
                        <Col md={4} className="d-flex flex-column p-0">
                            <ProgressBar animated now={scheduler2.progress_bar} label={`${scheduler2.percentage}%`} className="p-0" />
                        </Col>
                        <Col md={1} className="d-flex justify-content-center">
                            <div id="pin_2_dot"></div>
                        </Col>
                    </Row>
                </div>               
            </Col>
        </Fragment>
    )
}

export default Scheduler
