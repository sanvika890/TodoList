import Head from "next/head";

import { Inter } from "next/font/google";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import store from "./store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>To Do List</title>
				<meta name="description" content="To Do List using React Toolkit" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="todo icon" href="/download.png" />
			</Head>
			<main>
				<Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }} direction={"column"} spacing={10}>
					<Grid item>
						<Typography variant="h2">Welcome to Creating your to do list!</Typography>
					</Grid>
					<Grid item>
						<Button variant="contained" size="large" onClick={() => router.push("/work-page")}>
							Lets Go!
						</Button>
					</Grid>
				</Grid>
			</main>
		</>
	);
}
