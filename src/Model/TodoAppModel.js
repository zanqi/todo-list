import Util from '../Util';

class TodoAppModel {
    constructor() {
        this.observers = [];
        this.todos = [];
    }

    subscribe(callback) {
        this.observers.push(callback);
        console.log(this.observers);
    }

    notify(){
        this.observers.forEach(function(f) {
            f();
        }, this);
    }

    add(title) {
        this.todos.push({ 
            id: Util.guid(),
            title: title,
            completed: false
        });
        console.log(this.todos);
        this.notify();
    }

    toggle(todo) {
        todo.completed = !todo.completed;
        this.notify();
    }
}

export default TodoAppModel;