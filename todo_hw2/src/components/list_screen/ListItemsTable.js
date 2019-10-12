import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div id="list_items_container" className='list_item_header_card'>
                <div className="list_item_task_header" onClick={this.props.sorttask.bind(this, this.props.todoList)}>Task on</div>
                <div className="list_item_due_date_header" onClick={this.props.sortdue.bind(this, this.props.todoList)}>Due Date</div>
                <div className="list_item_status_header"onClick={this.props.sortstatus.bind(this, this.props.todoList)}>Status</div>
                </div>
                {
                    
                    this.props.todoList.items
                    .map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem} 
                            todoList={this.props.todoList}
                            goItem ={this.props.goItem} 
                            deleteItem = {this.props.deleteItem} 
                            moveupItem = {this.props.moveupItem}
                            movedownItem = {this.props.movedownItem}/>
                    ))
                }
            </div>
        )
    }
}

export default ListItemsTable
