import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import ItemCard from './ItemCard.js';
import ListTrashScreen from './ListTrashScreen.js'
import ListTrash from './ListTrash.js'
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';




class ListScreen extends Component {

    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner,
        showPopup: false,
        taskorder:false,
    dueorder:false,
    statusorder:false,
    currentlist:null
    }

    moveupItem = (id,event) => {
        event.preventDefault()
        event.stopPropagation();

        var currentindex = this.props.todoList.items.indexOf(id)

        if(currentindex -1 >=0){
            var currentitem = {
              "key": id.key,
              "description": id.description,
              "due_date": id.due_date,
              "assigned_to": id.assigned_to,
              "completed": id.completed
          };
          var uppperitem = {
            "key": this.props.todoList.items[currentindex-1].key,
            "description": this.props.todoList.items[currentindex-1].description,
            "due_date": this.props.todoList.items[currentindex-1].due_date,
            "assigned_to": this.props.todoList.items[currentindex-1].assigned_to,
            "completed": this.props.todoList.items[currentindex-1].completed
          };
        
          this.props.todoList.items[currentindex] = uppperitem;
          this.props.todoList.items[currentindex-1] = currentitem;
        
        }

        const fireStore = getFirestore();
            
            fireStore.collection('todoLists').doc(this.props.todoList.id).set({

                items:  this.props.todoList.items
            }, { merge: true 
            
            }).then(() => {
                    console.log("move up data");
                }).catch((err) => {
                    console.log(err);
                });
        }


        movedownItem = (id,event) =>{
            event.preventDefault()
            event.stopPropagation();

            var currentindex = this.props.todoList.items.indexOf(id)
            
            if(currentindex <this.props.todoList.items.length - 1){
                var currentitem = {
                  "key": id.key,
                  "description": id.description,
                  "due_date": id.due_date,
                  "assigned_to": id.assigned_to,
                  "completed": id.completed
              };
              var uppperitem = {
                "key": this.props.todoList.items[currentindex+1].key,
                "description": this.props.todoList.items[currentindex+1].description,
                "due_date": this.props.todoList.items[currentindex+1].due_date,
                "assigned_to": this.props.todoList.items[currentindex+1].assigned_to,
                "completed": this.props.todoList.items[currentindex+1].completed
              };
            
              this.props.todoList.items[currentindex] = uppperitem;
              this.props.todoList.items[currentindex+1] = currentitem;
                
               
              }
          

              const fireStore = getFirestore();
            
              fireStore.collection('todoLists').doc(this.props.todoList.id).set({
  
                  items:  this.props.todoList.items
              }, { merge: true 
              
              }).then(() => {
                      console.log("move down data");
                  }).catch((err) => {
                      console.log(err);
                  });
          
          } 
          
          
          delete = (id,event) => {
            event.preventDefault()
            event.stopPropagation();

            var currentitems = this.props.todoList.items.filter(Item => Item !== id);
            this.props.todoList.items = currentitems;
           
              const fireStore = getFirestore();
            
              fireStore.collection('todoLists').doc(this.props.todoList.id).set({
  
                  items:  this.props.todoList.items
              }, { merge: true 
              
              }).then(() => {
                      console.log("delete  data");
                  }).catch((err) => {
                      console.log(err);
                  });
          
          }
        




    
    handledeleteList = () => {
        
        const fireStore = getFirestore();
            fireStore.collection('todoLists').doc(this.props.todoList.id).delete().then(() => {
                    console.log("delete data");
                }).catch((err) => {
                    console.log(err);
                });
    }

    sorttask = () => {
        if(this.state.taskorder === false){
          
        this.props.todoList.items.sort((a, b) =>  (b.description > a.description) ? 1 : -1 );
        this.setState({taskorder: !this.state.taskorder});

        }
        else{
            this.props.todoList.items.sort((a, b) =>  (a.description > b.description) ? 1 : -1 );
            this.setState({taskorder: !this.state.taskorder});
        }
    

      }

      sortdue = () => {
        if(this.state.dueorder === false){
            this.props.todoList.items.sort((a, b) =>  (b.due_date > a.due_date) ? 1 : -1 );

          this.setState({dueorder: !this.state.dueorder});
        }
        else{
            this.props.todoList.items.sort((a, b) =>  (a.due_date > b.due_date) ? 1 : -1 );

          this.setState({dueorder: !this.state.dueorder});
        }


    
      }
      
      sortstatus = () => {
        if(this.state.statusorder === false){
        this.props.todoList.items.sort((a, b) =>  (b.completed > a.completed) ? 1 : -1 );

        this.setState({statusorder: !this.state.statusorder});
        }
        else{
        this.props.todoList.items.sort((a, b) =>  (a.completed > b.completed) ? 1 : -1 );

        this.setState({statusorder: !this.state.statusorder});
        }

    

      }
      


      handleNameChange = (e) => {
        e.preventDefault()
        const { target } = e;
    
        this.setState(state => ({
          ...state,
          [target.id]: target.value,
        }));
        this.state.name = target.value

        const fireStore = getFirestore();
            
              fireStore.collection('todoLists').doc(this.props.todoList.id).set({
  
                  name:  this.state.name
              }, { merge: true 
              
              }).then(() => {
                      console.log("set name");
                  }).catch((err) => {
                      console.log(err);
                  });

      }

      handleOwnerChange = (e) => {
        e.preventDefault()

        const { target } = e;
    
        this.setState(state => ({
          ...state,
          [target.id]: target.value,
        }));
        this.state.owner = target.value

        const fireStore = getFirestore();
            
        fireStore.collection('todoLists').doc(this.props.todoList.id).set({

            owner:  this.state.owner
        }, { merge: true 
        
        }).then(() => {
                console.log("set name");
            }).catch((err) => {
                console.log(err);
            });
      }
    


      
    

    goTash =() => {
        this.setState({showPopup: !this.state.showPopup});
      }

    render() {
        
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        // if(!todoList){
        // return <React.Fragment />
        // }

      
        const name = this.state.name
        const owner =this.state.owner
         
        
        return (
            <div className="container grey lighten-2">
                <div className ="row">
                <ListTrash 
                goTash={this.goTash}
                
                />
               
                <h5 className="black-text text-darken-3">Todo List</h5>
                
                </div>
                 {this.state.showPopup ? <ListTrashScreen goTash={this.goTash.bind(this)}
                todoList={this.props.todoList}
                handledeleteList = {this.handledeleteList}/> 
                : null}


                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleNameChange} value={name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleOwnerChange} value={owner} />
                </div>
                <ItemsList todoList={todoList}
                listid = {todoList.id}
                sorttask ={this.sorttask}
                sortdue ={this.sortdue}
                sortstatus ={this.sortstatus}
                moveupItem = {this.moveupItem.bind(this)}
                movedownItem = {this.movedownItem.bind(this)}
                delete = {this.delete.bind(this)} />
                
            </div>
            
            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  

  todoList.id = id;


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
)(ListScreen);

