import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import TodoAppModel from './Model/TodoAppModel';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import classNames from 'classnames';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      editing: '',
    }
  }

  handleNewTodo(title) {
    this.props.model.add(title);
  }

  handleToggle(todo) {
    this.props.model.toggle(todo);
  }

  handleToggleAll(e) {
    this.props.model.toggleAll(e.target.checked);
  }

  handleEdit(todo) {
    this.setState({
      editing: todo.id
    });
  }

  handleSave(todo, newText) {
    this.props.model.save(todo, newText);
    this.setState({ editing: null });
  }

  handleClearCompleted() {
    this.props.model.clearCompleted();
  }

  handleDelete(todo) {
    this.props.model.delete(todo);
  }

  handleCancel() {
    this.setState({ editing: null });
  }

  render() {
    const todos = this.props.model.todos;
    const activeTodoCount = todos.filter(t => !t.completed).length;
    const listProps = {
      todos: todos,
      onToggle: this.handleToggle,
      onEdit: this.handleEdit,
      editing: this.state.editing,
      onSave: this.handleSave,
      onToggleAll: this.handleToggleAll,
      onDelete: this.handleDelete,
      onCancel: this.handleCancel,
      allCompleted: activeTodoCount === 0
    };

    const activeCount = todos.filter(t => !t.completed).length;
    const completedCount = todos.length - activeCount;

    return (
      <Router>
        <div className="TodoApp">

          <NewTodo onEnter={this.handleNewTodo} />

          <Route exact path="/" render={(props) => <List {...listProps} />} />
          <Route path="/active" render={(props) => <List {...listProps} todos={todos.filter(t => !t.completed)} />} />
          <Route path="/completed" render={(props) => <List {...listProps} todos={todos.filter(t => t.completed)} />} />

          <Footer activeCount={activeCount} completedCount={completedCount} onClearCompleted={this.handleClearCompleted} />
        </div>
      </Router>
    );
  }
}

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.key !== 'Enter') {
      return;
    }

    if (e.key === 'Enter') {
      let val = e.target.value;
      e.target.value = '';
      if (val && val.trim()) {
        this.props.onEnter(val.trim());
      }
    }
  }

  render() {
    return (
      <div className="NewTodo">
        <input type="text"
          placeholder="What needs to be done?"
          onKeyDown={this.handleKeyDown} />
      </div>
    );
  }
}

class List extends Component {
  render() {
    const todos = this.props.todos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.props.onToggle}
          onEdit={this.props.onEdit}
          editing={this.props.editing === todo.id}
          onSave={this.props.onSave}
          onCancel={this.props.onCancel}
          onDelete={this.props.onDelete} />
      );
    });

    return (
      <div className="List">
        <input className="ToggleAll Toggle" type="checkBox" checked={this.props.allCompleted} onChange={this.props.onToggleAll} />
        <ul className="TodoList">
          {todos}
        </ul>
      </div>
    );
  }
}

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editText: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleToggle(todo) {
    this.props.onToggle(todo);
  }

  handleDoubleClick(todo) {
    this.props.onEdit(todo);
    this.setState({ editText: todo.title });
  }

  handleDelete(todo) {
    this.props.onDelete(todo);
  }

  handleChange(e) {
    this.setState({ editText: e.target.value });
  }

  handleSubmit() {
    const newText = this.state.editText.trim();
    const todo = this.props.todo;

    if (newText) {
      this.props.onSave(todo, newText);
      this.setState({ editText: newText }); // Trim
    }
    else {
      this.props.onDelete(this.props.todo);
    }
  }

  handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });
      this.props.onCancel();
    }
    else if (e.which === ENTER_KEY) {
      this.handleSubmit();
    }
  }

  render() {
    const todo = this.props.todo;
    return (
      <li className={classNames({
        Completed: this.props.todo.completed,
        Editing: this.props.editing
      })}>
        <div className="View">
          <input className="Toggle" type="checkBox" checked={todo.completed} onChange={this.handleToggle.bind(this, todo)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this, todo)}>
            {todo.title}
          </label>
          <button className="Delete" onClick={this.handleDelete.bind(this, todo)} ></button>
        </div>

        <input type="text"
          className="Edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange} />
      </li>
    );
  }
}

class Footer extends Component {
  render() {
    let clearButton = null;
    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="ClearCompleted"
          onClick={this.props.onClearCompleted}>
          Clear completed
			  </button>
      );
    }

    return (
      <div className="Footer">
        <span className="TodoCount">{this.props.activeCount} items left</span>
        <div className="Filters">
          <Link to="/">All</Link>
          <Link to="/active">Active</Link>
          <Link to="/completed">Completed</Link>
        </div>
        {clearButton}
      </div>
    );
  }
}


const model = new TodoAppModel();

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Todo</h2>
        </div>
        <TodoApp model={model} />
      </div>
    );
  }
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

model.subscribe(render);

export default App;
