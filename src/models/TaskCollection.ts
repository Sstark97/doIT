import { TaskItem } from "./TaskItem";

type TaskCounts = {
    total: number,
    incomplete: number
}

export class TaskCollection{
    
    nextId: number = 1;
    taskMap = new Map<number, TaskItem>();

    public constructor(
        public userName: string,
        public taskItems: TaskItem[] = []
    ){
        taskItems.forEach(item => this.taskMap.set(item.id,item));
    }

    addTask(task: string): number {
        while(this.getTaskByID(this.nextId)){
            this.nextId++;
        }
        this.taskMap.set(this.nextId, new TaskItem(this.nextId, task));
        return this.nextId;
    }

    getTaskItems(includeComplete: boolean): TaskItem[]{
        return [...this.taskMap.values()]
        .filter(task => includeComplete || !task.complete);

    }

    getTaskByID(id: number): TaskItem | undefined{
        return this.taskMap.get(id);
    }

    markCompleted(id: number, complete: boolean): void {
        const taskItem = this.getTaskByID(id);
        if(taskItem){
            taskItem.complete = complete;
        }
    }

    removeComplete(): void{
        this.taskMap.forEach(task => {
            if(task.complete){
                this.taskMap.delete(task.id);
            }
        })
    }

    getTaskCounts(): TaskCounts{
        return  {
            total: this.taskMap.size,
            incomplete: this.getTaskItems(false).length
        }
    }

}
