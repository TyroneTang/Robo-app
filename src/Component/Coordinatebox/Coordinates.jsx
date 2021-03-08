import React, { Fragment, useState } from 'react';
import { Col, Form, Button } from "react-bootstrap";
import Grid from "../Grid/Grid";
import Scheduler from "../Scheduler/Scheduler"


function Coordinates() {
    const [activeState, setActiveState] = useState(true);
    const [scheduler1, setScheduler1] = useState({
        progress_bar: 0,
        percentage: 0
    });
    const [scheduler2, setScheduler2] = useState({
        progress_bar: 0,
        percentage: 0
    });
    const [coordinates, setCoordinates] = useState({
        start_x_input: 0,
        start_y_input: 0,
        start_x: 0,
        start_y: 0,
        dest_1_x: 0,
        dest_1_y: 0,
        dest_2_x: 0,
        dest_2_y: 0,
    });
    let id_1_x = null;
    let id_1_y = null;
    let id_2_x = null;
    let id_2_y = null;

    function changeHandler_1(e){
        setCoordinates((coordinates) => ({
            ...coordinates,
            [e.target.name]: Number(e.target.value),
            "start_x_input": Number(coordinates.start_x),
            "start_y_input": Number(coordinates.start_y)
        }))
    }

    function changeHandler_2(e){
        setCoordinates((coordinates) => ({
            ...coordinates,
            [e.target.name]: Number(e.target.value)}))
        
    }


    /**
     * 10px = 1 point
     */
    function move (start_x,start_y,dest_1_x,dest_1_y,dest_2_x,dest_2_y){
        pinPoints(dest_1_x,dest_1_y,dest_2_x,dest_2_y);
        setScheduler1({
            progress_bar: 0,
            percentage: 0
        })
        setScheduler2({
            progress_bar: 0,
            percentage: 0
        })

        let robot_ = document.getElementById("robot");
        let pos_x =  Number(start_x);
        let pos_y =  Number(start_y);
     

        id_1_x = setInterval(frame_1_x, 15);              
        
        function frame_1_x(){
            if(pos_x === Number(dest_1_x)){
                clearInterval(id_1_x);
                id_1_y = setInterval(frame_1_y,15)
            } else if (pos_x < Number(dest_1_x)){
                pos_x++;
                robot_.style.left = pos_x + "px";
                setCoordinates((prevState) => ({
                    ...prevState,
                    "start_x": pos_x
                }));
                
                let result = scheCal_1(pos_x,pos_y);
                setScheduler1((x) => ({
                    ...x,
                    "progress_bar": result,
                    "percentage": result
                }))
            } else if (pos_x > Number(dest_1_x)){
                pos_x--;
                robot_.style.left = pos_x + "px";
                setCoordinates((prevState) => ({
                    ...prevState,
                    "start_x": pos_x
                }));

                let result = -(scheCal_1(pos_x,pos_y));
                setScheduler1((x) => ({
                    ...x,
                    "progress_bar": result,
                    "percentage": result
                }))
                
            }                               
        };
                
        function frame_1_y(){
            if(pos_y === Number(dest_1_y)){
                clearInterval(id_1_y)
                id_2_x = setInterval(frame_2_x,15)
            } else if (pos_y < Number(dest_1_y)){
                pos_y++;
                robot_.style.top = pos_y + "px";
                setCoordinates((prevState) => ({
                    ...prevState,
                    "start_y": pos_y
                }));
                let result = scheCal_1(pos_x,pos_y);
                setScheduler1((x) => ({
                    ...x,
                    "progress_bar": result,
                    "percentage": result
                }))
                
            } else if (pos_y > Number(dest_1_y)){
                pos_y--;
                robot_.style.top = pos_y + "px";
                setCoordinates((prevState) => ({
                    ...prevState,
                    "start_y": pos_y
                }));
                let result = -(scheCal_1(pos_x,pos_y));
                setScheduler1((x) => ({
                    ...x,
                    "progress_bar": result,
                    "percentage": result
                }))
            }
            
        }

        function frame_2_x(){
            if(pos_x === Number(dest_2_x)){
                clearInterval(id_2_x);
                id_2_y = setInterval(frame_2_y,15)
            } else if (pos_x < Number(dest_2_x)){
                pos_x++;
                robot_.style.left = pos_x + "px";
                setCoordinates((prevState) => ({
                    ...prevState,
                    "start_x": pos_x
                }));
                
                let result = scheCal_2(pos_x,pos_y);
                setScheduler2((x) => ({
                    ...x,
                    "progress_bar": result,
                    "percentage": result
                }))

            } else if (pos_x > Number(dest_2_x)){
                pos_x--;
                robot_.style.left = pos_x + "px";
                setCoordinates((prevState) => ({
                    ...prevState,
                    "start_x": pos_x
                }));

                let result = -(scheCal_2(pos_x,pos_y));
                setScheduler2((x) => ({
                    ...x,
                    "progress_bar": result,
                    "percentage": result
                }))
                
            }
                              
        };

        function frame_2_y(){
            if(pos_y === Number(dest_2_y)){
                clearInterval(id_2_y);
            } else if (pos_y < Number(dest_2_y)){
                pos_y++;
                robot_.style.top = pos_y + "px";
                setCoordinates((prevState) => ({
                    ...prevState,
                    "start_y": pos_y
                }));

                let result = scheCal_2(pos_x,pos_y);
                setScheduler2((x) => ({
                    ...x,
                    "progress_bar": result,
                    "percentage": result
                }))
                 
            } else if (pos_y > Number(dest_2_y)){
                pos_y--;
                robot_.style.top = pos_y + "px";
                setCoordinates((prevState) => ({
                    ...prevState,
                    "start_y": pos_y
                }));

                let result = -(scheCal_2(pos_x,pos_y));
                setScheduler2((x) => ({
                    ...x,
                    "progress_bar": result,
                    "percentage": result
                }))
                
            }
                              
        };
    }
    console.log(scheduler2)
    
    function startingPoint() {
        let robot_ = document.getElementById("robot");
        let pos_x =  Number(coordinates.start_x);
        let pos_y =  Number(coordinates.start_y);
        startPinPoint (pos_x,pos_y);
        /**
         * set current position
         */
        robot_.style.left = pos_x + "px";
        robot_.style.top = pos_y + "px";
    }


    function pinPoints(dest_1_x,dest_1_y,dest_2_x,dest_2_y){
        let $parent = document.getElementById("btmbox");
        let pin_1_del = document.getElementById("pin_1_parent");
        let pin_2_del = document.getElementById("pin_2_parent");

        if(pin_1_del !== null ){
            pin_1_del.remove();
        }

        if (pin_2_del !== null){
            pin_2_del.remove();
        }
        
        /**
         * creating pin 1
         */

        if (dest_1_x !== 0 && dest_1_y !== 0){
            /**
             * create pin element 1
             */
            let parent_pin_1 = document.createElement('div');
            let child_pin_1_dot_div = document.createElement('div')
            let child_pin_1_dot = document.createElement('div');
            let child_pin_1_desc = document.createElement('div');
            parent_pin_1.setAttribute("id","pin_1_parent");
            parent_pin_1.setAttribute("class","row");
            child_pin_1_dot.setAttribute("id", "pin_1_dot");
            child_pin_1_dot_div.setAttribute("class", "column");
            child_pin_1_desc.setAttribute("id", "pin_1_desc");
            child_pin_1_desc.setAttribute("class", "column");
            child_pin_1_desc.innerHTML = "Destination 1";
            child_pin_1_dot_div.appendChild(child_pin_1_dot)
            parent_pin_1.appendChild(child_pin_1_dot_div);
            parent_pin_1.appendChild(child_pin_1_desc);
            $parent.appendChild(parent_pin_1)

            /**
             * pin 1 location
             */
            parent_pin_1.style.left = dest_1_x + "px";
            parent_pin_1.style.top = dest_1_y + "px";
        }
        

        /**
         * creating pin 2
         */

        if(dest_1_x !== dest_2_x && dest_1_y !== dest_2_y){

            /**
             * create pin element 2
             */
            let parent_pin_2 = document.createElement('div');
            let child_pin_2_dot_div = document.createElement('div');
            let child_pin_2_dot = document.createElement('div');
            let child_pin_2_desc = document.createElement('div');
            parent_pin_2.setAttribute("id","pin_2_parent");
            parent_pin_2.setAttribute("class","row");
            child_pin_2_dot.setAttribute("id", "pin_2_dot");
            child_pin_2_dot_div.setAttribute("class", "column");
            child_pin_2_desc.setAttribute("id", "pin_2_desc");
            child_pin_2_desc.setAttribute("class", "column");
            child_pin_2_desc.innerHTML = "Destination 2";
            child_pin_2_dot_div.appendChild(child_pin_2_dot);
            parent_pin_2.appendChild(child_pin_2_dot_div);
            parent_pin_2.appendChild(child_pin_2_desc);
            $parent.appendChild(parent_pin_2);
            
            /**
            * pin 2 location
            */
         
            parent_pin_2.style.left = dest_2_x + "px";
            parent_pin_2.style.top = dest_2_y + "px";
        }
         

    }

    function startPinPoint(pos_x,pos_y){
        let $parent = document.getElementById("btmbox");
        let start_pin_del = document.getElementById("start_pin_parent");


        if(start_pin_del !== null ){
            start_pin_del.remove();
        }
        /**
         * create pin element 1
         */
          let parent_start_pin = document.createElement('div');
          let child_start_pin_dot_div = document.createElement('div')
          let child_start_pin_dot = document.createElement('div')
          let child_start_pin_desc = document.createElement('div')
          parent_start_pin.setAttribute("id","start_pin_parent")
          parent_start_pin.setAttribute("class","row")
          child_start_pin_dot.setAttribute("id", "start_pin_dot");
          child_start_pin_dot_div.setAttribute("class", "column");
          child_start_pin_desc.setAttribute("id", "start_pin_desc");
          child_start_pin_desc.setAttribute("class", "column");
          child_start_pin_desc.innerHTML = "Start";
          child_start_pin_dot_div.appendChild(child_start_pin_dot);
          parent_start_pin.appendChild(child_start_pin_dot_div);
          parent_start_pin.appendChild(child_start_pin_desc);
          $parent.appendChild(parent_start_pin)

          /**
           * pin 1 location
           */
          parent_start_pin.style.left = pos_x + "px";
          parent_start_pin.style.top = pos_y + "px";
    }




    function sendCoordinates(){
        move(
            coordinates.start_x,
            coordinates.start_y,
            coordinates.dest_1_x,
            coordinates.dest_1_y,
            coordinates.dest_2_x,
            coordinates.dest_2_y
            )
    }


    function stopBot(){
    //    let clone = {...coordinates}
    //    setCoordinates((coordinates) => ({
    //        ...coordinates,
    //        "dest_1_x": clone.start_x,
    //        "dest_1_y": clone.start_y,
    //        "dest_2_x": clone.start_x,
    //        "dest_2_y": clone.start_y,
    //    }))
        setActiveState(false)
    }   
    
    function scheCal_1(pos_x,pos_y){
        let result = 
        (((pos_x - coordinates.start_x_input) + (pos_y - coordinates.start_y_input))/
        ((coordinates.dest_1_x - coordinates.start_x_input) + (coordinates.dest_1_y - coordinates.start_y_input)))*100

        return result
    }

    function scheCal_2(pos_x,pos_y){
        let result = 
        (((pos_x - coordinates.dest_1_x) + (pos_y - coordinates.dest_1_y))/
        ((coordinates.dest_2_x - coordinates.dest_1_x) + (coordinates.dest_2_y - coordinates.dest_1_y)))*100

        return result
    }









    return (
        <Fragment>
            <Col md={12} className="border topbox">
                <div className="mt-3">
                    <h3>Coordinates</h3>
                </div>
                <div className="mt-3">
                    <p className="p-0">Key in starting coordinates</p>
                    <Form.Row className="p-0">
                        <Col md={6}>
                            <label>Start Coordinate-X</label>
                            <Form.Control 
                                size="sm" type="number" placeholder="Coordinate-x"
                                name="start_x"
                                onChange={changeHandler_1}
                            />
                        </Col>
                        <Col md={6}>
                            <label>Start Coordinate-Y</label>
                            <Form.Control 
                                size="sm" type="number" placeholder="Coordinate-y"
                                name="start_y"
                                onChange={changeHandler_1}
                            />
                        </Col>
                    </Form.Row>
                </div>
                <div className="mt-3">
                    <Button 
                        type="submit" className="btn btn-info btn-sm"
                        onClick={startingPoint}
                    >Set Starting Coordinates</Button>
                </div>
                <div className="mt-3">
                    <Form.Row>
                        <Col md={6}>
                            <label>Destination 1 Coordinate-X</label>
                            <Form.Control 
                                size="sm" type="number" placeholder="Coordinate-x"
                                name="dest_1_x"
                                onChange={changeHandler_2}
                            />
                        </Col>
                        <Col md={6}>
                            <label>Destination 1 Coordinate-Y</label>
                            <Form.Control 
                                size="sm" type="number" placeholder="Coordinate-y"
                                name="dest_1_y"
                                onChange={changeHandler_2}
                            />
                        </Col>
                    </Form.Row>
                </div>
                <div className="mt-3">
                    <Form.Row>
                        <Col md={6}>
                            <label>Destination 2 Coordinate-X</label>
                            <Form.Control 
                                size="sm" type="number" placeholder="Coordinate-x"
                                name="dest_2_x"
                                onChange={changeHandler_2}
                            />
                        </Col>
                        <Col md={6}>
                            <label>Destination 2 Coordinate-Y</label>
                            <Form.Control 
                                size="sm" type="number" placeholder="Coordinate-y"
                                name="dest_2_y"
                                onChange={changeHandler_2}
                            />
                        </Col>
                    </Form.Row>
                </div>
                <div className="mt-3">
                    <Button 
                        type="submit" className="btn btn-secondary btn-sm"
                        onClick={sendCoordinates}
                    >Update Coordinates</Button>
                </div>
                <div className="mt-3">
                    {/* <Button 
                        type="submit" className="btn btn-warning btn-sm"
                        onClick={stopBot}
                    >Stop Bot Now</Button> */}
                </div>
            </Col>
            <Scheduler
                scheduler1={scheduler1}
                scheduler2={scheduler2}
            />
            <Grid />
        </Fragment>
    )
}

export default Coordinates
