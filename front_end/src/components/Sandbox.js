import React from "react";

import ListRenderer from "./UI/ListerRenderer";






import {Container, Row, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';


const testusers = ["pubKey: 32324, privKey: 3232423, accId: 2342", "pubKey: 32324, privKey: 3232423, accId: 2342"];
const testNFTs = ["This is the info & WHO OWNS", "This is the info", "this is the info"];
const testTransaction = ["This is a transaction"];


const Sandbox = (props) => {


    return (<>
        
		<Container>
			<Row>
				<Col>
                    <ListRenderer list={testNFTs}/>
                </Col>
				<Col>
                    <ListRenderer list={testusers}/>
                    <Button>Add User</Button>
                </Col>	
			</Row>
			<Row>
				<Col>
                    <p>This a peer to peer</p>
                </Col>
                
				<Col>
                    <p>This is treasury distributor</p>
                </Col>	
			</Row>            
            <Row>
                <p>transaction form</p>
                <p>transaction</p>
            </Row>
	    </Container>
    </>);
};


export default Sandbox;


