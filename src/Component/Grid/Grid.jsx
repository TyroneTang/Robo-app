import React, {Fragment} from 'react';
import { Col, Image } from "react-bootstrap";
import Robot200 from "../../Images/Robot200.png"

function Grid() {






    return (
        <Fragment >
            <Col md={12} className="border bottombox p-0" id="btmbox">
            <div id="robot" className="p-0 d-inline">
                <Image src={Robot200} fluid></Image>
           </div>
           </Col>
        </Fragment>
        
    )
}

export default Grid
