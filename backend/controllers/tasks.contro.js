import { Task } from "../models/tasks.model.js";
import { User } from "../models/users.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newTask = new Task({ title: title, desc: desc });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });
    res.status(200).json({ message: "Task created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const allTasks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await Task.findByIdAndUpdate(id, { title: title, desc: desc });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatecompletedTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await Task.findById(id);
    const completeTask = TaskData.isCompleted;
    await Task.findByIdAndUpdate(id, { isCompleted: !completeTask });
    res.status(200).json({ message: "Task updated successfully" , data:TaskData});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const completedTasks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      match: { isCompleted: true },
      options: { sort: { createdAt: -1 } },
    });
    const completedTaskData=userData.tasks;
    res.status(200).json({ data: completedTaskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const incompletedTasks = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "tasks",
      match: { isCompleted: false },
      options: { sort: { createdAt: -1 } },
    });
    const incompletedTaskData=userData.tasks;
    res.status(200).json({ data: incompletedTaskData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editTasks=async (req,res)=>{
  try {
    const {id} = req.params;
    const data = await Task.findById(id)
    res.status(200).json({message:'Get task data' , data})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });

  }
}