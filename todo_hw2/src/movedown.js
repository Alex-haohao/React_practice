'use strict'

import jTPS_Transaction from './jTPS_js.js'

class movedown extends jTPS_Transaction {

    constructor(currentList,currentindex,id,original) {
        super();
        this.currentList = currentList;
        this.currentindex = currentindex;
        this.id = id
        this.original = original
     
    }   

     

    doTransaction() {
        
        if(this.currentindex <this.currentList.items.length - 1){
            var currentitem = {
              "key": this.id.key,
              "description": this.id.description,
              "due_date": this.id.due_date,
              "assigned_to": this.id.assigned_to,
              "completed": this.id.completed
          };
          var uppperitem = {
            "key": this.currentList.items[this.currentindex+1].key,
            "description": this.currentList.items[this.currentindex+1].description,
            "due_date": this.currentList.items[this.currentindex+1].due_date,
            "assigned_to": this.currentList.items[this.currentindex+1].assigned_to,
            "completed": this.currentList.items[this.currentindex+1].completed
          };
        
          this.currentList.items[this.currentindex] = uppperitem;
          this.currentList.items[this.currentindex+1] = currentitem;
            
           
          }
    }

     undoTransaction() {
        
       

        this.currentList.items = this.original



    }
     
}
export default movedown;