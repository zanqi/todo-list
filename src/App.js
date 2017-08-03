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
  }

  handleClearCompleted() {
    this.props.model.clearCompleted();
  }

  handleDelete(todo) {
    this.props.model.delete(todo);
  }

  render() {
    const todos = this.props.model.todos;
    const listProps = {
      todos: todos,
      onToggle: this.handleToggle,
      onEdit: this.handleEdit,
      onSave: this.handleSave,
      onToggleAll: this.handleToggleAll,
      onDelete: this.handleDelete
    };

    return (
      <Router>
        <div className="TodoApp">
          <header>
            <p>Todos</p>
          </header>

          <NewTodo onEnter={this.handleNewTodo} />

          <Route exact path="/" render={(props) => <List {...listProps} />} />
          <Route path="/active" render={(props) => <List {...listProps} todos={todos.filter(t => !t.completed)} />} />
          <Route path="/completed" render={(props) => <List {...listProps} todos={todos.filter(t => t.completed)} />} />

          <Footer onClearCompleted={this.handleClearCompleted} />
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
          onSave={this.props.onSave}
          onDelete={this.props.onDelete} />
      );
    });

    return (
      <div className="List">
        <input className="ToggleAll" type="checkBox" onChange={this.props.onToggleAll} />
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleToggle(todo) {
    this.props.onToggle(todo);
  }

  handleDoubleClick(todo) {
    this.props.onEdit(todo);
  }

  handleDelete(todo) {
    this.props.onDelete(todo);
  }

  handleChange(e) {
    this.setState({ editText: e.target.value });
  }

  handleSubmit(e) {
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

  render() {
    const todo = this.props.todo;
    return (
      <li>
        <input type="checkBox" checked={todo.completed} onChange={this.handleToggle.bind(this, todo)} />

        <label onDoubleClick={this.handleDoubleClick.bind(this, todo)}>
          {todo.title}
        </label>
        <button className="delete" onClick={this.handleDelete.bind(this, todo)} >Delete</button>

        <input type="text"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange} />
      </li>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <span>1 item left</span>
        <div>
          <Link to="/">All</Link>
          <Link to="/active">Active</Link>
          <Link to="/completed">Completed</Link>
        </div>
        <div>
          <button
            className="clear-completed"
            onClick={this.props.onClearCompleted}>
            Clear completed
					</button>
        </div>
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
          <h2>Welcome to React</h2>
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
