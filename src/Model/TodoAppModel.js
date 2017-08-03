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

    notify() {
        this.observers.forEach(function (f) {
            f();
        }, this);
    }

    add(title) {
        this.todos = this.todos.concat({
            id: Util.guid(),
            title: title,
            completed: false
        });
        this.notify();
    }

    toggle(todoToToggle) {
        this.todos = this.todos.map((t) => {
            return t !== todoToToggle ? t : Util.extend({}, todoToToggle, {completed: !todoToToggle.completed});
        });
        this.notify();
    }

    toggleAll(checked) {
        this.todos = this.todos.map((t) => {
            return Util.extend({}, t, { completed: checked });
        });

        this.notify();
    }

    delete(todo) {
        this.todos = this.todos.filter(t => t !== todo);
        this.notify();
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.notify();
    }

    save(todoToSave, newText) {
        this.todos = this.todos.map(t => {
            return t !== todoToSave ? t : Util.extend({}, todoToSave, { title: newText });
        })
        this.notify();
    }
}

export default TodoAppModel;