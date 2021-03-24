"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskItem = void 0;
class TaskItem {
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
    }
    printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }
}
exports.TaskItem = TaskItem;
