import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

import jTPS from './jTPS_js'
import NAME from './namechange.js'
import MOVEUP from './moveup'
import MOVEDOWN from './movedown'
import DELETE from './delete'
import SUBMIT from './submit'
import TASKFALSE from './sorttask_false'
import TASKTRUE from  './sorttask_true'
import DUEFALSE from './sortdue_false'
import DUETRUE from './sortdue_true'
import STATUSFALSE from './sortstatus_false'
import STATUSTRUE from './sortstatus_true'


const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN",
  TRASH_SCREEN: "TRASH_SCREEN"
}




var save = new jTPS()


class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentitems:null,
    currentList: null,
    showPopup : false,
    itempopup : false,
    currentItem: null,
    taskorder:false,
    dueorder:false,
    statusorder:false,
  }



/////////////////////////////////////////
constructor(props){
    super(props);
    this.undo_key = this.undo_key.bind(this);
    this.redo_key = this.redo_key.bind(this);

  }
  showMessage () {
    alert('SOME MESSAGE');
  }

  undo_key(e){
    if(e.keyCode===90 && e.ctrlKey) {
      save.undoTransaction();
      this.loadList(this.state.currentList)
    }
  }

  redo_key(e){
    if(e.keyCode===89 && e.ctrlKey) {
      console.log("redo")
      save.doTransaction();
      this.loadList(this.state.currentList)

      

    }
  }

  componentDidMount(){
    document.addEventListener('keydown',this.redo_key);

    document.addEventListener('keydown',this.undo_key);


  }
  componentWillUnmount(){
        document.removeEventListener('keydown',this.redo_key);

    document.removeEventListener('keydown',this.undo_key);

  }


/////////////////////////////////////////

  



/////////////////////////////////
sorttask = (todoListToLoad) => {
  if(this.state.taskorder === false){
    var original = [...this.state.currentList.items]
    save.addTransaction(new TASKFALSE(this.state.currentList,original))
    
    
    this.setState({taskorder: !this.state.taskorder});
  }
  else{
    var original = [...this.state.currentList.items]
    save.addTransaction(new TASKTRUE(this.state.currentList,original))
    this.setState({taskorder: !this.state.taskorder});
  }
  

  this.setState({currentScreen: AppScreen.LIST_SCREEN});
}

sortdue = (todoListToLoad) => {
  if(this.state.dueorder === false){
    var original = [...this.state.currentList.items]
    save.addTransaction(new DUEFALSE(this.state.currentList,original))

    this.setState({dueorder: !this.state.dueorder});
  }
  else{
    var original = [...this.state.currentList.items]
    save.addTransaction(new DUETRUE(this.state.currentList,original))

    this.setState({dueorder: !this.state.dueorder});
  }
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
}

sortstatus = (todoListToLoad) => {
  if(this.state.statusorder === false){
    var original = [...this.state.currentList.items]
    save.addTransaction(new STATUSFALSE(this.state.currentList,original))

    this.setState({statusorder: !this.state.statusorder});
  }
  else{
    var original = [...this.state.currentList.items]
    save.addTransaction(new STATUSTRUE(this.state.currentList,original))
    
    this.setState({statusorder: !this.state.statusorder});
  }
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
}


/////////////////////////////////

deleteItem = (id,event) => {
  event.stopPropagation()

var original = [...this.state.currentList.items]
save.addTransaction(new DELETE(this.state.currentList,id,original))
  
 
  
  
  this.setState({currentScreen: AppScreen.LIST_SCREEN});

 
}



moveupItem = (id,event) => {
  

var currentindex = this.state.currentList.items.indexOf(id)

var original = [...this.state.currentList.items]
save.addTransaction(new MOVEUP(this.state.currentList,currentindex,id,original))

  

this.setState({currentScreen: AppScreen.LIST_SCREEN});

  event.stopPropagation();

}

movedownItem = (id,event) =>{

  
  var currentindex = this.state.currentList.items.indexOf(id)
  
  var original = [...this.state.currentList.items]
save.addTransaction(new MOVEDOWN(this.state.currentList,currentindex,id,original))

  this.setState({currentScreen: AppScreen.LIST_SCREEN});


  event.stopPropagation();
}



  delete = (id) => {
    this.setState({todoLists:[...this.state.todoLists.filter(currentList => currentList
      !== id )]})
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  createlist = (add) => {

    let newCurrentList = {
      "key": add,
      "name": "Unknow",
      "owner": "Unknow",
      "items": []
    };

    this.setState({todoLists:[...this.state.todoLists, newCurrentList]});
    this.setState({currentList: newCurrentList});
    this.setState({currentScreen: AppScreen.LIST_SCREEN});

  }


  createItem = (key) => {
    if(this.state.currentList.items.length >0){
    var lastkey = this.state.currentList.items.length - 1
  }
  else{
    lastkey=-1;
  }
  console.log(key)
    let newCurrentitem = {
      
                    "key": key,
                    "description": "Unknow",
                    "due_date": "1970-01-01",
                    "assigned_to": "Unknow",
                    "completed": false
      
    };
    this.state.currentList.items.push(newCurrentitem)
    this.setState({currentScreen: AppScreen.LIST_SCREEN});

  }





  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }
  

  goItem = (todoListToLoad,listItem) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    this.setState({itempopup: !this.state.itempopup});
    this.setState({currentItem: listItem});
  }


  submitItem = (todoListToLoad,description,duedate,assignedto,completed) => {
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
    this.setState({itempopup: !this.state.itempopup});

    var original = {
      
      "key": this.state.currentItem.key,
      "description": this.state.currentItem.description,
      "due_date": this.state.currentItem.due_date,
      "assigned_to": this.state.currentItem.assigned_to,
      "completed": this.state.currentItem.completed

};
    save.addTransaction(new SUBMIT(this.state.currentItem,description,duedate,assignedto,completed,original))
   
   
  }

  loadList = (todoListToLoad) => {

    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    this.state.currentList = todoListToLoad;
    this.state.currentScreen = AppScreen.LIST_SCREEN
    console.log("currentList: " + this.state.currentList.name);
    console.log("currentScreen: " + this.state.currentScreen);
  }

 
  
  render() {
    
    switch(this.state.currentScreen) {
      
      case AppScreen.HOME_SCREEN:
          
        return <HomeScreen 
        createlist = {this.createlist.bind(this)}
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        currentList = {this.state.currentList}
        save = {save}
        />;  
      case AppScreen.LIST_SCREEN:    
              
        return <ListScreen
        loadList={this.loadList.bind(this)} 

          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          delete = {this.delete.bind(this)}
          deleteItem = {this.deleteItem.bind(this)}
          goItem = {this.goItem.bind(this)} 
          sorttask = {this.sorttask.bind(this)}
          sortdue = {this.sortdue.bind(this)}
          sortstatus = {this.sortstatus.bind(this)}
          submitItem = {this.submitItem.bind(this)}
          createItem = {this.createItem.bind(this)}
          moveupItem = {this.moveupItem.bind(this)}
          movedownItem = {this.movedownItem.bind(this)}
          undo_key = {this.undo_key.bind(this)}
          redo_key = {this.redo_key.bind(this)}
          save = {save}
          />;
          
          
      case AppScreen.ITEM_SCREEN:
        
      if (this.state.itempopup){
        return <ItemScreen 
        goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          currentScreen={this.state.currentScreen}
          todoItem = {this.state.currentItem}
          goItem = {this.goItem.bind(this)}
          submitItem = {this.submitItem.bind(this)}
          
          />;
      }
      else{
        return <ListScreen
        loadList={this.loadList.bind(this)} 

        goHome={this.goHome.bind(this)}
        todoList={this.state.currentList}
        delete = {this.delete.bind(this)}
        deleteItem = {this.deleteItem.bind(this)}
        goItem = {this.goItem.bind(this)} 
        sorttask = {this.sorttask.bind(this)}
        sortdue = {this.sortdue.bind(this)}
        sortstatus = {this.sortstatus.bind(this)}
        submitItem = {this.submitItem.bind(this)}
        createItem = {this.createItem.bind(this)}
        moveupItem = {this.moveupItem.bind(this)}
        movedownItem = {this.movedownItem.bind(this)}
        undo_key = {this.undo_key.bind(this)}
        redo_key = {this.redo_key.bind(this)}
        save = {save}

        />;
      }
        
        
        
              default:
        return <div>ERROR</div>;
    }

  }
}

export default App;