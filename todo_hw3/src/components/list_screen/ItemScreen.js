import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

export class ItemScreen extends Component {


    state = {
        description: this.props.todoItem.description,
        duedate: this.props.todoItem.due_date,
        assignedto: this.props.todoItem.assigned_to,
        completed: this.props.todoItem.completed,
        modify :false
      }

      handleSubmit = () => {
        
        let newCurrentitem = {
            "key": this.props.todoItem.key,
            "description": this.state.description,
            "due_date": this.state.duedate,
            "assigned_to": this.state.assignedto,
            "completed": this.state.completed
        };

        this.props.todoList.items[this.props.itemid] = newCurrentitem

        const fireStore = getFirestore();
            
            fireStore.collection('todoLists').doc(this.props.id).set({

                items: this.props.todoList.items
            }, { merge: true 
            
            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });
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

    

    handledeleteList = () => {
        
        
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
            <div id="home_your_lists_heading" className="flow-text">Item 
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

                        <p>
                            
                        <label>
                            <input type="checkbox" checked={completed} 
                            onChange={this.handlecompletedChange.bind(this)}/>
                            <span>completed</span>
                        </label>
                        </p>

                        
                        <br /><br /><br />
                        
                   

                        <Link to={"/todoList/"+this.props.id} className="btn waves-effect waves-light" type="submit" name="action"
                        onClick ={this.handleSubmit}>Submit  </Link>

                        
                    <Link to={"/todoList/"+this.props.id} className="waves-effect waves-light btn" >cancel</Link>

                </div>

              
         
          </div>
        )
    }







    
}
    
  
      



    


const mapStateToProps = (state, ownProps) => {
    const  id  = ownProps.match.params.id;
    const itemid = ownProps.match.params.itemid
    // const { list } = other.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    const todoItem = todoList.items[itemid]
    
      
  
    return {
        id,itemid,
        todoItem,todoList,
      auth: state.firebase.auth,
    };
  };
  
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemScreen);
  
  

