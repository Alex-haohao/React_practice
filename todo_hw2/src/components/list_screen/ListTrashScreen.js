import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';



export class ListTrashScreen extends Component {
    render() {
        
        return (
            <div className="delete_popup">
               <div className="popup\_inner">
               <h3 id="home_your_lists_heading">Delete list?</h3>
               <h4 id="home_your_lists_heading">Are you sure you want to delete this list?</h4>
               <button type="button" className="delete_btn" onClick={this.props.delete.bind(this, this.props.todoList)}>YES</button>
               <button type="button" className="close" onClick={this.props.goTash}>NO</button>
               <br /><br />
               <p>The list will not be retreivable</p>
               
               </div>
            </div>
        );

}
}

export default ListTrashScreen