import "./App.css";
import React, {useState} from "react";


import { Navbar } from "./components/UI/Navbar";
import { Landing } from "./components/Landing";
import Card from "./components/UI/Card";
import Sandbox from "./components/Sandbox";


import {Container, Row, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

function App() {
	const [data, setData] = useState(null);
	const testusers = ["pubKey: 32324, privKey: 3232423, accId: 2342", "pubKey: 32324, privKey: 3232423, accId: 2342"];
	const [generate, setGenerate] = useState(true);

	React.useEffect(() => {
		fetch("/api")
		  .then((res) => res.json())
		  .then((data) => setData(data.message));
	  }, []);

//e
// const submit = () => {
//     // e.preventDefault()
//     fetch('/api', {
//       method: 'POST',
//       body: JSON.stringify({ generate }),
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then(res => res.json())
//       .then(json => setGenerate(json.generate))

// 	console.log(generate);

//   }


	const generateHandler = () => {
		// submit();
		setGenerate(false);
	}


	return (
		<div>
			<p>{!data ? "Loading..." : data}</p>
			{generate ? <Button onClick={generateHandler}>generate</Button> : <Sandbox/>}
			{/* ../../post */}



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
