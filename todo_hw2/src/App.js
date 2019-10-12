import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN",
  TRASH_SCREEN: "TRASH_SCREEN"
}

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

  


/////////////////////////////////
sorttask = (todoListToLoad) => {
  if(this.state.taskorder === false){
    this.state.currentList.items.sort((a, b) =>  (b.description > a.description) ? 1 : -1 );
    this.setState({taskorder: !this.state.taskorder});
  }
  else{
    this.state.currentList.items.sort((a, b) =>  (a.description > b.description) ? 1 : -1 );
    this.setState({taskorder: !this.state.taskorder});
  }
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
}

sortdue = (todoListToLoad) => {
  if(this.state.dueorder === false){
    this.state.currentList.items.sort((a, b) =>  (b.due_date > a.due_date) ? 1 : -1 );
    this.setState({dueorder: !this.state.dueorder});
  }
  else{
    this.state.currentList.items.sort((a, b) =>  (a.due_date > b.due_date) ? 1 : -1 );
    this.setState({dueorder: !this.state.dueorder});
  }
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
}

sortstatus = (todoListToLoad) => {
  if(this.state.statusorder === false){
    this.state.currentList.items.sort((a, b) =>  (b.completed > a.completed) ? 1 : -1 );
    this.setState({statusorder: !this.state.statusorder});
  }
  else{
    this.state.currentList.items.sort((a, b) =>  (a.completed > b.completed) ? 1 : -1 );
    this.setState({statusorder: !this.state.statusorder});
  }
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
}


/////////////////////////////////

deleteItem = (id,event) => {
  event.stopPropagation()
  this.state.currentitems = this.state.currentList.items.filter(Item => Item !== id);
  this.state.currentList.items = this.state.currentitems;
  
  
  this.setState({currentScreen: AppScreen.LIST_SCREEN});

  console.log(this.state.currentList.items)
  console.log(this.state.currentitems)
}



moveupItem = (id,event) => {
  

var currentindex = this.state.currentList.items.indexOf(id)


  if(currentindex -1 >=0){
    var currentitem = {
      "key": id.key,
      "description": id.description,
      "due_date": id.due_date,
      "assigned_to": id.assigned_to,
      "completed": id.completed
  };
  var uppperitem = {
    "key": this.state.currentList.items[currentindex-1].key,
    "description": this.state.currentList.items[currentindex-1].description,
    "due_date": this.state.currentList.items[currentindex-1].due_date,
    "assigned_to": this.state.currentList.items[currentindex-1].assigned_to,
    "completed": this.state.currentList.items[currentindex-1].completed
  };

  this.state.currentList.items[currentindex] = uppperitem;
  this.state.currentList.items[currentindex-1] = currentitem;
    
   
  }

  this.setState({currentScreen: AppScreen.LIST_SCREEN});

  event.stopPropagation();

}

movedownItem = (id,event) =>{

  var currentindex = this.state.currentList.items.indexOf(id)
  
  if(currentindex <this.state.currentList.items.length - 1){
    var currentitem = {
      "key": id.key,
      "description": id.description,
      "due_date": id.due_date,
      "assigned_to": id.assigned_to,
      "completed": id.completed
  };
  var uppperitem = {
    "key": this.state.currentList.items[currentindex+1].key,
    "description": this.state.currentList.items[currentindex+1].description,
    "due_date": this.state.currentList.items[currentindex+1].due_date,
    "assigned_to": this.state.currentList.items[currentindex+1].assigned_to,
    "completed": this.state.currentList.items[currentindex+1].completed
  };

  this.state.currentList.items[currentindex] = uppperitem;
  this.state.currentList.items[currentindex+1] = currentitem;
    
   
  }

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
   
    this.state.currentItem.description = description;
    this.state.currentItem.due_date = duedate;
    this.state.currentItem.assigned_to = assignedto;
    this.state.currentItem.completed = completed;
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
        />;  
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
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
        />;
      }
        
        
        
              default:
        return <div>ERROR</div>;
    }
  }
}

export default App;