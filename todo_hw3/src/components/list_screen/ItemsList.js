import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';


class ItemsList extends React.Component {

    state = {
        currentitemsmax: null
      }

    
    

    handlNewItem = () => {
        var sorted = [...this.props.todoList.items]
        sorted = sorted.sort((a, b) =>  (a.key > b.key) ? 1 : -1 )

        if(this.state.currentitemsmax ===null){
            this.state.currentitemsmax =this.props.todoList.items.length
        }
            for(var i =0;i<sorted.length;){
                if (this.state.currentitemsmax == sorted[i].key){
                    this.state.currentitemsmax = sorted[i].key+1
                }  
                i=i+1;
            }

            let newCurrentitem = {
      
                "key": this.state.currentitemsmax,
                "description": "Unknow",
                "due_date": "1970-01-01",
                "assigned_to": "Unknow",
                "completed": false
  
            };
        this.props.todoList.items.push(newCurrentitem)

        const fireStore = getFirestore();
            
            fireStore.collection('todoLists').doc(this.props.todoList.id).set({

                items:  this.props.todoList.items
            }, { merge: true 
            
            }).then(() => {
                    console.log("add new data");
                }).catch((err) => {
                    console.log(err);
                });
    }


    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const moveupitem = this.props.moveupItem;
        const movedownItem = this.props.movedownItem;
        const deletes = this.props.delete;
        const listid = this.props.listid

        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div id="list_items_container">
    <nav>
    <div class="row">
    {/* <div type ="button" class="col s12 m6 l3 large" onClick={this.props.sorttask}>Task</div> */}
    <div className="col s12 m6 l3 large" onClick={this.props.sorttask} to={"./"+todoList.id} >Task</div>
    <div className="col s12 m6 l3 large" onClick={this.props.sortdue} to={"./"+todoList.id} >Due Date</div>
    <div className="col s12 m6 l3 large" onClick={this.props.sortstatus} to={"./"+todoList.id} >Status</div>

    </div>
    </nav>
            
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    const itemid = item.id
                    return (
                       
                   
                        <ItemCard todoList={todoList}
                         item={item} 
                         moveupitem = {moveupitem}   
                         movedownItem = {movedownItem}  
                         deletes = {deletes} 
                         listid = {listid} 
                         itemid = {itemid}                                    
                        />
                        
                    );})
                }
            </div>
           
            <nav className="waves-effect waves-light btn grey lighten-2" onClick={this.handlNewItem} >
            +
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);