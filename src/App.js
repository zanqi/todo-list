import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <header>
          <p>Todos</p>
        </header>
        <NewTodo />
        <List todos={[{title: "abc"}, {title: "efg"}, {title: "hij"}]} />
        <Footer />
      </div>
    );
  }
}

class NewTodo extends Component {
  render() {
    return (
      <div className="NewTodo">
        <input type="text" placeholder="What needs to be done?"/>
      </div>
    );
  }
}

class List extends Component {
  render() {
    var todos = this.props.todos.map(todo => {
      return <li>{todo.title}</li>
    }) ;
    return (
      <div className="List">
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <TodoApp />
      </div>
    );
  }
}

export default App;
