"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const TaskItem_1 = require("./models/TaskItem");
exports.tasks = [
    new TaskItem_1.TaskItem(1, "Tarea 1"),
    new TaskItem_1.TaskItem(2, "Tarea 2"),
    new TaskItem_1.TaskItem(3, "Tarea 3"),
    new TaskItem_1.TaskItem(4, "Tarea 4", true)
];
