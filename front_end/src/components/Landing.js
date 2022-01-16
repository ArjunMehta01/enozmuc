import React from "react";
import "./Landing.css";

export const Landing = () => {
	return (
		<div className="container-size-l">
			<div className="p-controller">
				<p className="heading-name">Welcome to ENOZMUC!</p>
				<p className="intro-para">Enter a string below:</p>
			</div>
			<form>
				<div class="form-group">
					<input
						type="email"
						class="form-control input-s"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter string"
					></input>
				</div>
			</form>
			<button type="submit" class="btn btn-primary">
				Submit
			</button>
		</div>
	);
};
