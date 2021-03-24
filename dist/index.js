"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const JsonTaskCollection_1 = require("./models/JsonTaskCollection");
const collection = new JsonTaskCollection_1.JsonTaskCollection('Sstark97');
let showCompleted = true;
function displayTaskList() {
    console.log(`${collection.userName}'s Tasks` + `(${collection.getTaskCounts().incomplete} task to do)`);
    collection.getTaskItems(showCompleted).forEach(task => task.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add new Task";
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
async function promptComplete() {
    console.clear();
    const answer = await inquirer_1.default.prompt({
        type: 'checkbox',
        name: 'complete',
        message: 'Mark Task Complete:',
        choices: collection.getTaskItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    });
    let completeTask = answer['complete'];
    collection
        .getTaskItems(true)
        .forEach(item => collection.markCompleted(item.id, completeTask.find(id => id === item.id) != undefined));
    promptUser();
}
async function promptAdd() {
    console.clear();
    const answer = await inquirer_1.default.prompt({
        type: 'input',
        name: 'add',
        message: 'Enter Task: '
    });
    if (answer['add'] != '') {
        collection.addTask(answer['add']);
    }
    promptUser();
}
async function promptUser() {
    console.clear();
    displayTaskList();
    const answer = await inquirer_1.default.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose option',
        choices: Object.values(Commands)
    });
    switch (answer["command"]) {
        case Commands.Toggle:
            showCompleted = !showCompleted;
            promptUser();
            break;
        case Commands.Add:
            promptAdd();
            break;
        case Commands.Complete:
            if (collection.getTaskCounts().incomplete > 0) {
                promptComplete();
            }
            else {
                promptUser();
            }
            break;
        case Commands.Purge:
            collection.removeComplete();
            promptUser();
            break;
    }
}
promptUser();
