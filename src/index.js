import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/app-header'
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";

const App = () => {

    const isLoggedIn = true;
    const loginBox = <span>Log in please</span>;
    const welcomeBox = <span>Welcome</span>;
    const todoData = [
        {label: 'Drink Coffee', important: false, id: 1},
        {label: 'Make Awesome App', important: true, id: 2},
        {label: 'Have a Lunch', important: false, id: 3}
    ];

    return (
        <div>
            {isLoggedIn ? welcomeBox : loginBox}
            <AppHeader/>
            <SearchPanel/>
            <TodoList todos={todoData}/>
        </div>
    )
};


ReactDOM.render(<App/>, document.getElementById("root"));