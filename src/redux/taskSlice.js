import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};


const taskSlice = createSlice({
  name: "tasks",
  initialState: loadTasksFromLocalStorage,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state);
    },

    deleteTask: (state, action) => {
      console.log(action.payload);
      const delestate = state.filter(task => task.id !== action.payload);
      return delestate;
    },

    
    completeTask: (state, action) => {
      const updatedState = state.map(task => 
        task.id === action.payload ? { ...task, status: "completed" } : task
      );
      console.log("Updated state:", updatedState);
      saveTasksToLocalStorage(updatedState);
      return updatedState;
    },


    editTask: (state, action) => {
      const updatedState = state.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task);
      saveTasksToLocalStorage(updatedState);
      return updatedState;
    }
  }
});

export const { addTask , deleteTask,completeTask,editTask} = taskSlice.actions;
export default taskSlice.reducer;
