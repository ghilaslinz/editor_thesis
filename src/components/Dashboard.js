import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		
		
		minWidth: 300,
		minHeight: 200,
		maxHeight : 400,
		marginTop: 100,
		margin : 10,
	},
	bullet: {
		display: "inline-block",
		margin: "10 10px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

export default function Dashboard() {
	const [databases, setDatabases] = useState([]);
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuth();
	const history = useHistory();

	useEffect(() => {
		function getDatafromDatabse() {
			if (currentUser) {
				setLoading(true);
				db.collection("users")
					.doc(currentUser?.uid)
					.collection("databases")
					.get()
					.then((item) => {
						const items = item.docs.map((doc) => ({
							...doc.data(),
							id: doc.id,
						}));
						console.log(items);

						setDatabases(items);
						setLoading(false);
					});
			} else {
				setDatabases([]);
				console.log("erreur ");
			}
		}
		getDatafromDatabse();
	}, []);
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;
	function CreateNewForm() {
		history.push("/firstpage");
	}
	return (
		<div >
			<NavBar />
			{/*<div className='d-flex justify-content-around' >*/}
			<div className=''>
			<Card className={classes.root}>
				<CardContent>
					<Typography component='h5' variant='h5'></Typography>
					<Button
					
						variant='contained'
						className={classes.button}
						onClick={CreateNewForm}
					>
						Create a new Document
					</Button>
				</CardContent>
				<CardActions></CardActions>
			</Card>

			{databases.map((database, id) => (
				<div key={database.id}>
					<Link to={`/formular/${database.id}`}>
						<Card className={classes.root}>
							<CardContent>
								<Typography component='h5' variant='h5'>
									{database.title}
								</Typography>
							</CardContent>
							
							<CardActions>
								<Button size='small'>See More</Button>
							</CardActions>
							
						</Card>
					</Link>
				</div>
			))}
			</div>
		</div>
	);
}
