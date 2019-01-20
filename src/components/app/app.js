import React, {Component} from 'react';

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import TodoList from "../todo-list/todo-list";
import ItemAddForm from "../item-add-form/item-add-form";

export default class App extends Component {

    maxId = 0;

    state = {
        todoData : [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a Lunch')
        ],
        term: '',
        filter: 'all'
    };

    createTodoItem(label){
        return {
            label,
            important: false,
            done: false,
            id: ++this.maxId
        }
    }
    searchIdx(arr, id){
        return arr.findIndex((el)=> el.id===id)
    }

    deleteItem = (id)=>{
        this.setState(({ todoData })=>{
            const idx = this.searchIdx(todoData, id);
            const after = todoData.splice(idx+1);
            const before = todoData.splice(0, idx);
            return {
                todoData: [...before, ...after]
            }
        });
    };

    addItem = (text)=>{
        const newItem = this.createTodoItem(text);
        this.setState(({todoData})=>{
                return {
                    todoData: [...todoData, newItem]
                }
            }
        )
    };

    onToggleImportant = (id)=>{
        this.setState(({todoData})=>{
            return{
                todoData: this.toggleProperty(todoData, id, "important")
            }
        })
    };

    onToggleDone = (id)=>{
        this.setState(({todoData})=>{
            return {
                todoData: this.toggleProperty(todoData, id, "done")
            }
        })
    };

    toggleProperty = (arr, id, propName)=>{
        const idx = this.searchIdx(arr, id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        const after = arr.splice(idx+1);
        const before = arr.splice(0, idx);
        return [...before, newItem, ...after]
    };

    search(items, term){
        if (term.length===0){
            return items
        }
        return items.filter((el)=>el.label.toLowerCase().indexOf(term.toLowerCase())> -1)
    }

    onSearchChange=(term)=>{
        this.setState({term})
    };

    filter(items, filter){
        switch (filter) {
            case 'all': return items;
            case 'active': return items.filter((el)=>!el.done);
            case 'done': return items.filter((el)=>el.done);
            default: return items;
        }
    }

    onFilterChange=(filter)=>{
        this.setState({filter})
    };

    render() {
        const {todoData, term, filter} = this.state;
        const doneCount = todoData.filter((el)=>el.done).length;
        const todoCount = todoData.length - doneCount;
        const visibleItems = this.search(todoData, term);
        const filteredItems = this.filter(visibleItems, filter);

        return (
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className='top-panel d-flex'>
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter onFilterChange={this.onFilterChange} filter={filter}/>
                </div>
                <TodoList todos={filteredItems}
                          onDeleted={this.deleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onAdded={(text) => this.addItem(text)}/>
            </div>)
    }
};