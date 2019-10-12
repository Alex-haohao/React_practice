import React, { Component } from 'react'
import Banner from './Banner'
import HomeHeader from './HomeHeader'
import TodoListLinks from './TodoListLinks'
import PropTypes from 'prop-types';

export class HomeScreen extends Component {
    state = {
        listmax:null

      }


    render() {
        if(this.state.listmax ===null){
            this.state.listmax =this.props.todoLists.length
        }
    
        var sorted = [...this.props.todoLists]
        sorted = sorted.sort((a, b) =>  (a.key > b.key) ? 1 : -1 )

            for(var i =0;i<sorted.length;){
                if (this.state.listmax == sorted[i].key){
                    this.state.listmax = sorted[i].key+1
                }  
                i=i+1;
            }
            console.log("++",this.state.listmax)

        return (
            <div id="todo_home">
                <div id="home_your_lists_container">
                    <HomeHeader />
                    <TodoListLinks loadList={this.props.loadList} todoLists={this.props.todoLists} />
                </div>
                <Banner />
                <div id="home_new_list_container">
                    <button id="home_new_list_button" onClick={this.props.createlist.bind(this,this.state.listmax)}>
                        Create a New To Do List
                    </button>
                </div>
            </div>
        )
    }
}

HomeScreen.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoLists: PropTypes.array.isRequired
}

export default HomeScreen
