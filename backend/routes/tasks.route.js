import express from "express";
import {
  allTasks,
  completedTasks,
  createTask,
  deleteTask,
  editTasks,
  incompletedTasks,
  updatecompletedTasks,
  updateTask,
} from "../controllers/tasks.contro.js";
import { isAuthenticated } from "../middleware/authUser.js";
const router = express.Router();

router.post("/create-task", isAuthenticated, createTask);
router.get("/all-tasks", isAuthenticated, allTasks);
router.delete("/delete-task/:id", isAuthenticated, deleteTask);
router.put("/update-task/:id", isAuthenticated, updateTask);
router.put("/updatecompleted-tasks/:id", isAuthenticated, updatecompletedTasks);
router.get("/completed-tasks", isAuthenticated, completedTasks);
router.get("/incompleted-tasks", isAuthenticated, incompletedTasks);
router.get("/edit-tasks/:id", isAuthenticated, editTasks);

export default router;
