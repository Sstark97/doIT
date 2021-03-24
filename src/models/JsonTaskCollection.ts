import { TaskCollection } from "./TaskCollection"
import { TaskItem } from "./TaskItem";
import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

type schemaType = {
    tasks: {
        id: number,
        task: string,
        complete: boolean
    } [];
};
export class JsonTaskCollection extends TaskCollection{

    private dataBase: lowdb.LowdbSync<schemaType>;

    constructor(public username: string, taskItems: TaskItem[] = []){
        super(username,[])
        this.dataBase = lowdb(new FileSync("Task.json"))
        if(this.dataBase.has('tasks').value()) {
            let dbItems = this.dataBase.get('tasks').value();
            dbItems.forEach(item => 
                this.taskMap.set(
                    item.id, 
                    new TaskItem(item.id, item.task,item.complete))
            );
        } else {
            this.dataBase.set('tasks',taskItems).write();
            taskItems.forEach(item => this.taskMap.set(item.id,item));
        }
    }

    addTask(task: string): number {
        let result = super.addTask(task);
        this.storeTasks();
        return result;
    }

    markCompleted(id: number, complete: boolean): void {
        super.markCompleted(id,complete);
        this.storeTasks();
    }

    removeComplete(): void {
        super.removeComplete();
        this.storeTasks();
    }

    storeTasks() {
        this.dataBase.set('tasks', [...this.taskMap.values()]).write();
    }

}