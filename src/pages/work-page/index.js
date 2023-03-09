import Head from "next/head";
import React, { useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, deleteToDo, editTodo, markComplete } from "../../Reducers/todoSlider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TextField from "@mui/material/TextField";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Stack from "@mui/material/Stack";

const WorkPage = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.toDo);
	const [addnew, setAddNew] = useState("");
	const [edit, setEdit] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [editNew, setEditNew] = useState("");
	const [datatoBeDeleted, setDataToBeDeleted] = useState([]);

	const handleAddChange = (e) => {
		setAddNew(e.target.value);
	};

	const handleAddClick = () => {
		if (addnew == "") {
			alert("Please enter a value to add!");
		} else {
			dispatch(addToDo({ newContent: addnew }));
			setAddNew("");
		}
	};

	const handleEditClick = (id) => {
		setSelectedId(id);
		setEdit(true);
	};

	const cancelEdit = () => {
		setEdit(false);
	};

	const updateTodo = useCallback(
		(id) => {
			setSelectedId(id);

			if (editNew === "") {
				alert("Please enter content to edit");
			} else {
				dispatch(editTodo({ content: editNew, id }));
				setEdit(false);
				setEditNew("");
			}
		},
		[dispatch, editNew]
	);

	const handleCheckbox = (e) => {
		if (e.target.checked == true) {
			setDataToBeDeleted((datatoBeDeleted) => [...datatoBeDeleted, e.target.id]);
		} else {
			const changeData = datatoBeDeleted.filter((item) => item !== e.target.id);

			setDataToBeDeleted(changeData);
		}
	};

	const handleDelete = () => {
		if (!datatoBeDeleted.length) {
			alert("Please select a todo to delete!");
		} else {
			dispatch(deleteToDo(datatoBeDeleted));
			setDataToBeDeleted([]);
		}
	};

	const handleCompleted = () => {
		if (!datatoBeDeleted.length) {
			alert("Please select a todo to mark as complete!");
		} else {
			dispatch(markComplete(datatoBeDeleted));
			setDataToBeDeleted([]);
		}
	};

	return (
		<>
			<Head>
				<title>To Do List</title>
				<meta name="description" content="To Do List using React Toolkit" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="todo icon" href="/download.png" />
			</Head>
			<Grid container justifyContent="center" alignItems={"center"} direction="row" sx={{ height: "100vh" }} spacing={2}>
				<Grid item>
					<Typography variant="h4">Start a new to do!</Typography>
				</Grid>
				<Grid item sx={{ alignItems: "center" }} lg={12}>
					<Stack sx={{ justifyContent: "center", alignItems: "center" }} spacing={5}>
						<TextField value={addnew} label="Add a new Todo" onChange={handleAddChange} required sx={{ width: "20%" }} />
						<Button variant="contained" onClick={handleAddClick} size="large" sx={{ width: "10%" }}>
							Add New
						</Button>
					</Stack>
				</Grid>
				<Grid item sx={{ border: "2px solid black", overflowY: "scroll", height: "40vh", width: "40vw" }} lg={false}>
					{store.todoList.map((item) => (
						<ListItem
							key={item.id}
							secondaryAction={
								<>
									{edit && selectedId == item.id ? (
										<>
											<IconButton onClick={cancelEdit}>
												<CancelIcon />
											</IconButton>
											<IconButton onClick={() => updateTodo(item.id)}>
												<CheckCircleIcon />
											</IconButton>
										</>
									) : (
										<>
											<IconButton onClick={() => handleEditClick(item.id)}>
												<EditIcon />
											</IconButton>
										</>
									)}
								</>
							}
						>
							<ListItemButton>
								<ListItemIcon>
									{item.completed ? (
										<ThumbUpIcon sx={{ color: "green" }} />
									) : (
										<Checkbox
											//   checked={checked.indexOf(value) !== -1}
											// tabIndex={-1}
											// disableRipple
											id={item.id}
											onChange={handleCheckbox}
										/>
									)}
								</ListItemIcon>

								{edit && selectedId == item.id ? (
									<ListItemText primary={<TextField size="small" value={editNew} onChange={(e) => setEditNew(e.target.value)} />} />
								) : (
									<ListItemText primary={item.content} primaryTypographyProps={{ variant: "h6" }} />
								)}
							</ListItemButton>
						</ListItem>
					))}
				</Grid>
				<Grid container item lg={12} justifyContent="center">
					<Stack direction="row" spacing={5}>
						<Button onClick={handleDelete} variant="contained">
							Delete
						</Button>
						<Button variant="contained" onClick={handleCompleted}>
							Mark Completed
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
};

export default WorkPage;
