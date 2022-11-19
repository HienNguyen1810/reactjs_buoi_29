import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	form: {},
	length: 0,
	students: [],
};

export const studentsSlice = createSlice({
	name: "students",
	initialState,
	reducers: {
		save: (state, { payload }) => {
			const idx = state.students.findIndex((d) => d.key === payload.key);
			if (idx >= 0) {
				state.students[idx] = {
					...state.students[idx],
					...payload,
				};
			} else {
				state.students.push({
					key: state.length.toString(),
					...payload,
				});
				state.length += 1;
			}
		},
		updateForm: (state, { payload }) => {
			state.form = {
				...state.form,
				...payload,
			};
		},
		remove: (state, { payload }) => {
			state.students = state.students.filter((d) => d.key !== payload.key);
		},
	},
});

export const { save, remove, setDataIdEdit, updateForm } =
	studentsSlice.actions;
export default studentsSlice.reducer;
