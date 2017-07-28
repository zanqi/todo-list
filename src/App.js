import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import TodoAppModel from './Model/TodoAppModel';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleNewTodo(title) {
    console.log("New Todo!");
    this.props.model.add(title);
  }

  handleToggle(todo) {
    this.props.model.toggle(todo);
  }

  render() {
    return (
      <div className="TodoApp">
        <header>
          <p>Todos</p>
        </header>
        <NewTodo onEnter={this.handleNewTodo} />
        <List todos={this.props.model.todos} onToggle={this.handleToggle} />
        <Footer />
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
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(todo, e) {
    this.props.onToggle(todo);
  }

  render() {
    var todos = this.props.todos.map(todo => {
      return (
        <li key={todo.title}>
          <input type="checkBox" checked={todo.completed} onChange={this.handleChange.bind(this, todo)} />
          <span>{todo.title}</span>
        </li>
      );
    });

    return (
      <div className="List">
        <input type="checkBox"/>
        <ul>
          {todos}
        </ul>
      </div>
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
