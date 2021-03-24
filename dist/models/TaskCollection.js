"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCollection = void 0;
const TaskItem_1 = require("./TaskItem");
class TaskCollection {
    constructor(userName, taskItems = []) {
        this.userName = userName;
        this.taskItems = taskItems;
        this.nextId = 1;
        this.taskMap = new Map();
        taskItems.forEach(item => this.taskMap.set(item.id, item));
    }
    addTask(task) {
        while (this.getTaskByID(this.nextId)) {
            this.nextId++;
        }
        this.taskMap.set(this.nextId, new TaskItem_1.TaskItem(this.nextId, task));
        return this.nextId;
    }
    getTaskItems(includeComplete) {
        return [...this.taskMap.values()]
            .filter(task => includeComplete || !task.complete);
    }
    getTaskByID(id) {
        return this.taskMap.get(id);
    }
    markCompleted(id, complete) {
        const taskItem = this.getTaskByID(id);
        if (taskItem) {
            taskItem.complete = complete;
        }
    }
    removeComplete() {
        this.taskMap.forEach(task => {
            if (task.complete) {
                this.taskMap.delete(task.id);
            }
        });
    }
    getTaskCounts() {
        return {
            total: this.taskMap.size,
            incomplete: this.getTaskItems(false).length
        };
    }
}
exports.TaskCollection = TaskCollection;
