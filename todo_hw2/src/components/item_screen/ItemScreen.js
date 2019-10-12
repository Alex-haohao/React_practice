import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state = {
        description: this.props.todoItem.description,
        duedate: this.props.todoItem.due_date,
        assignedto: this.props.todoItem.assigned_to,
        completed: this.props.todoItem.completed,
        modify :false
      }



    getdescription() {
        if (this.props.todoItem) {
            return this.props.todoItem.description;
        }
        else
            return "";
    }
    getduedate() {
        if (this.props.todoItem) {
            return this.props.todoItem.due_date;
        }
        else
            return "";
    }
    getassignedto() {
        if (this.props.todoItem) {
            return this.props.todoItem.assigned_to;
        }
        else
            return "";
    }
    getcompleted() {
        if (this.props.todoItem) {
            return this.props.todoItem.completed;
        }
       
    }
    handledescriptionChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.state.description = event.target.value;
    }
    handleduedateChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.state.duedate = event.target.value;
    }
    handleassignedtoChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.state.assignedto = event.target.value;
    }
    handlecompletedChange(event) {
        this.setState({[event.target.name]: event.target.checked});
        this.state.completed = event.target.checked;
    }

  
      



    render() {
        const { 
            description,
            duedate,
            assignedto,
            completed
          } = this.state;
        return (
            <div id="item_screen" className="item_screen_modal">
            <div className="screen_content">
            <div id="home_your_lists_heading">Item 
                </div>
                <br />
                        <span id="Item_description" className="Item_modify" >Description:</span>
                        <input type="text" id="description_textfield" 
                        className="Item_modify_textfield"
                        value={description}
                        name = "description"
                        onChange={this.handledescriptionChange.bind(this)}

                           />
                        <br /><br />
                        <span id="Item_assign_to" className="Item_modify">Assign To:</span>
                        <input type="text" 
                        value={assignedto}
                        onChange={this.handleassignedtoChange.bind(this)}

                        name = "assign"
                        id="Item_assign_to_textfield" className="Item_modify_textfield" />
                        <br /><br />
                        <span id="Item_due_date" 
                        className="Item_modify">Due Date:</span>
                        <input type="date"
                        value={duedate} 
                        onChange={this.handleduedateChange.bind(this)}

                        name = "due"
                        id="Item_due_date_textfield" className="Item_modify_textfield" />
                        <br /><br /><br /><br />
                        <span id="Item_status" className="Item_modify" >completed:</span>
                        <input type="checkbox" 
                        checked={completed}
                        onChange={this.handlecompletedChange.bind(this)}

                        name = "check"
                        id="Item_status_box" className="Item_status_checkbox" />
                        <br /><br /><br />
                        
                   
                        <button type="button" 
                        id="submit_btn_id" className="submit_btn" 
                        
                        onClick={this.props.submitItem.bind(this, this.props.todoList,this.state.description
                            ,this.state.duedate,this.state.assignedto,this.state.completed)                        }
                        >submit</button>
                        
                    <button type="button" id="cancel_btn_id" className="cancel_btn" onClick={this.props.goItem.bind(this, this.props.todoList)}>cancel</button>
                </div>

              
         
          </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
