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
        this.todos.push({ title: title });
        console.log(this.todos);
        this.notify();
    }

}

export default TodoAppModel;