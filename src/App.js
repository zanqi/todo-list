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
    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      editing: ''
    }
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


  render() {
    const todos = this.props.todos.map(todo => {
      return (
        // <li key={todo.id}>
        //   <input type="checkBox" checked={todo.completed} onChange={this.handleChange.bind(this, todo)} />

        //   <label onDoubleClick={this.handleDoubleClick.bind(this, todo)}>{todo.title}</label>
        //   <input type="text" value={todo.title} />
        // </li>
        <TodoItem key={todo.id} todo={todo} onToggle={this.props.onToggle} onEdit={this.props.onEdit} />
      );
    });

    return (
      <div className="List">
        <input type="checkBox" />
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
