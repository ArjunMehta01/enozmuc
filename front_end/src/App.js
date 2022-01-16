import "./App.css";
import React, {useState} from "react";


import { Navbar } from "./components/UI/Navbar";
import { Landing } from "./components/Landing";
import Card from "./components/UI/Card";
import Sandbox from "./components/Sandbox";


import {Container, Row, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

function App() {
	const testusers = ["pubKey: 32324, privKey: 3232423, accId: 2342", "pubKey: 32324, privKey: 3232423, accId: 2342"];
	const [generate, setGenerate] = useState(true);



	const generateHandler = () => {
		setGenerate(false);
	}


	return (
		<div>
			{generate ? <Button onClick={generateHandler}>cum</Button> : <Sandbox/>}




			{/* <Navbar></Navbar>
			<Landing></Landing> */}
			{/* <Card>
				<Button>Cum</Button>
			</Card>
			<Card>
				<ListRenderer list={[...test]}/>
			</Card> */}


			




		</div>
	);
}

export default App;
