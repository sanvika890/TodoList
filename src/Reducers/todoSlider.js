import { createSlice } from "@reduxjs/toolkit";
import nextId from "react-id-generator";

export const toDoSlider = createSlice({
	name: "toDo",
	initialState: {
		todoList: [],
	},
	reducers: {
		addToDo: (state, action) => {
			let newTodoList = {
				id: nextId(),
				content: action.payload.newContent,
				completed: false,
			};
			state.todoList.unshift(newTodoList);
		},
		deleteToDo: (state, action) => {
			let { todoList } = state;

			const uniqueData = new Set(action.payload);

			for (const idValue of uniqueData) {
				state.todoList = todoList.filter((item) => item.id !== idValue);
			}
		},
		editTodo: (state, action) => {
			let { todoList } = state;
			state.todoList = todoList.map((item) => (item.id === action.payload.id ? action.payload : item));
		},
		markComplete: (state, action) => {
			let { todoList } = state;
			const uniqueData = new Set(action.payload);
			console.log(uniqueData);

			for (const idValue of uniqueData) {
				state.todoList = todoList.map((item) => (item.id == idValue ? { ...item, completed: true } : item));
			}
		},
	},
});

export const { addToDo, deleteToDo, editTodo, markComplete } = toDoSlider.actions;
export default toDoSlider.reducer;
