import inquirer from 'inquirer';
import { JsonTaskCollection } from './models/JsonTaskCollection';

const collection = new JsonTaskCollection('Sstark97');
let showCompleted: boolean = true;


function displayTaskList(): void {
    console.log(`${collection.userName}'s Tasks` + `(${collection.getTaskCounts().incomplete} task to do)`);
    collection.getTaskItems(showCompleted).forEach(task => task.printDetails());
}

enum Commands{
    Add = "Add new Task",
    Complete  = "Complete Task",
    Toggle = "Show/Hide Completed",
    Purge = "Remove Completed Tasks",
    Quit = "Quit"

}

async function promptComplete(): Promise<void>{
    console.clear();
    const answer = await inquirer.prompt({
        type: 'checkbox',
        name: 'complete',
        message: 'Mark Task Complete:',
        choices: collection.getTaskItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    });

    let completeTask = answer['complete'] as number[];
    collection
        .getTaskItems(true)
        .forEach(item => collection.markCompleted(
            item.id,
            completeTask.find(id => id === item.id) != undefined)
        );
    promptUser();
}

async function promptAdd(): Promise<void>{
    console.clear();
    const answer = await inquirer.prompt({
        type: 'input',
        name: 'add',
        message: 'Enter Task: '
    })

    if(answer['add'] != ''){
        collection.addTask(answer['add']);
    }

    promptUser();
}

async function promptUser(){
    console.clear();
    displayTaskList();

    const answer = await inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose option',
        choices: Object.values(Commands)
    })

    switch(answer["command"]){
        case Commands.Toggle:
            showCompleted = !showCompleted;
            promptUser();
            break;

        case Commands.Add:
            promptAdd();
            break;
        
        case Commands.Complete:
            if(collection.getTaskCounts().incomplete > 0){
                promptComplete()
            } else {
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
