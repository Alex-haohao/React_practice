import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';
import ListTrashScreen from './ListTrashScreen'


export class ListScreen extends Component {


    state = {
        Name: this.props.todoList.name,
        Owner: this.props.todoList.owner,
        showPopup: false,
        currentitemsmax:null

      }



    handleNameChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.props.todoList.name = event.target.value;
      }

    handleOwnerChange(event) {
        this.setState({[event.target.name]: event.target.value});
        this.props.todoList.owner = event.target.value;
      }

    getListName() {
        if (this.props.todoList) {
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            return this.props.todoList.owner;
        }
    }

    goTash =() => {
        this.setState({showPopup: !this.state.showPopup});
      }
    

    render() {
        if(this.state.currentitemsmax ===null){
            this.state.currentitemsmax =this.props.todoList.items.length
        }
        
        // while(typeof this.props.todoList.items.key!='undefined'){
        //     i++;
        // }
        // this.state.currentitemsmax =i;
        
        

        var sorted = [...this.props.todoList.items]
        sorted = sorted.sort((a, b) =>  (a.key > b.key) ? 1 : -1 )

            for(var i =0;i<sorted.length;){
                if (this.state.currentitemsmax == sorted[i].key){
                    this.state.currentitemsmax = sorted[i].key+1
                }  
                i=i+1;
            }
            console.log("===",this.state.currentitemsmax)



        const { 
            Name, 
            Owner, 
          } = this.state;
        return (
            
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash 
                goTash={this.goTash}
                />
                {this.state.showPopup ? <ListTrashScreen goTash={this.goTash.bind(this)}
                goHome={this.props.goHome}
                todoList={this.props.todoList}
                delete = {this.props.delete}/> 
                : null}

                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        
      
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={Name} 
                            type="text" 
                            name = "Name"
                            id="list_name_textfield" 
                            onChange={this.handleNameChange.bind(this)}
                            />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={Owner}
                            type="text" 
                            name = "Owner"
                            id="list_owner_textfield"
                            onChange={this.handleOwnerChange.bind(this)} />
                    </div>
                    
                </div>
                <ListItemsTable todoList={this.props.todoList } 
                 goItem ={this.props.goItem}
                 deleteItem = {this.props.deleteItem}
                 sorttask = {this.props.sorttask}
                 sortdue = {this.props.sortdue}
                 sortstatus = {this.props.sortstatus}
                 moveupItem = {this.props.moveupItem}
                 movedownItem = {this.props.movedownItem}
                />
                <div className ="list_item_add_card" onClick={this.props.createItem.bind(this,this.state.currentitemsmax)}>
                    +
                </div>
                
            </div>
        )
    }
}

export default ListScreen
