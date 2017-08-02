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
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      editing: ''
    }
  }

  componentDidMount() {
    var setState = this.setState;
    var router = Router({
      '/': setState.bind(this, { nowShowing: "ALL_TODOS" }),
      '/active': setState.bind(this, { nowShowing: "ACTIVE_TODOS" }),
      '/completed': setState.bind(this, { nowShowing: "COMPLETED_TODOS" })
    });
    router.init('/');
  }

  handleNewTodo(title) {
    this.props.model.add(title);
  }

  handleToggle(todo) {
    this.props.model.toggle(todo);
  }

  handleEdit(todo) {
    this.setState({
      editing: todo.id
    });
  }

  handleClearCompleted() {
    console.log("Clear!");
  }

  render() {
    return (
      <div className="TodoApp">
        <header>
          <p>Todos</p>
        </header>
        <NewTodo onEnter={this.handleNewTodo} />
        <List todos={this.props.model.todos}
          onToggle={this.handleToggle}
          onEdit={this.handleEdit} />
        <Footer onClearCompleted={this.handleClearCompleted} />
      </div>
    );
  }
}

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let val = e.target.value;
      if (val && val.trim()) {
        console.log(val);
        this.props.onEnter(val.trim());
      }
    }

    // todo: esc
  }

  render() {
    return (
      <div className="NewTodo">
        <input type="text"
          placeholder="What needs to be done?"
          onKeyPress={this.handleKeyPress} />
      </div>
    );
  }
}

class List extends Component {
  render() {
    const todos = this.props.todos.map(todo => {
      return (
        <TodoItem key={todo.id} todo={todo} onToggle={this.props.onToggle} onEdit={this.props.onEdit} />
      );
    });

    return (
      <div className="List">
        <input className="ToggleAll" type="checkBox" />
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

class TodoItem extends Component {

  handleChange(todo, e) {
    this.props.onToggle(todo);
  }

  handleDoubleClick(todo, e) {
    this.props.onEdit(todo);
  }

  render() {
    const todo = this.props.todo;
    return (
      <li>
        <input type="checkBox" checked={todo.completed} onChange={this.handleChange.bind(this, todo)} />

        <label onDoubleClick={this.handleDoubleClick.bind(this, todo)}>{todo.title}</label>
        <input type="text" value={todo.title} />
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
          <a href="">All</a>
          <a href="">Active</a>
          <a href="">Completed</a>
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
