import React from "react";
import CreateStudentForm from "../components/CreateStudentForm";
import ListStudent from "../components/ListStudent";
import "../styles/form.css";

function Home() {
	return (
		<>
			<div className="form">
				<CreateStudentForm />
			</div>
			<div className="list-student">
				<ListStudent />
			</div>
		</>
	);
}

export default Home;
