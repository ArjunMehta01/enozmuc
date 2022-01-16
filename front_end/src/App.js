import "./App.css";
import { Navbar } from "./components/Navbar";
import { Landing } from "./components/Landing";
import { Form } from "./components/Form";
function App() {
	return (
		<>
			<Navbar></Navbar>
			<Landing></Landing>
			<Form></Form>
		</>
	);
}

export default App;
