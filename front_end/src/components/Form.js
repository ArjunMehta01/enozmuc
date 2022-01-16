// Form obtained from: https://getbootstrap.com/docs/4.0/components/forms/
import React from "react";

export const Form = () => {
	return (
		<form>
			<div className="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input
					type="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Enter email"
				></input>
			</div>
			<div className="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input
					type="password"
					className="form-control"
					id="exampleInputPassword1"
					placeholder="Password"
				></input>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
