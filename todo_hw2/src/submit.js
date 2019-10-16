'use strict'

import jTPS_Transaction from './jTPS_js.js'

class delteItem extends jTPS_Transaction {

    constructor(currentItem,description,duedate,assignedto,completed,original) {
        super();
        this.currentItem = currentItem;
        this.description = description
        this.duedate = duedate
        this.assignedto = assignedto
        this.completed = completed

        this.original = original
     
    }   

     

    doTransaction() {
        
    this.currentItem.description = this.description;
    this.currentItem.due_date = this.duedate;
    this.currentItem.assigned_to = this.assignedto;
    this.currentItem.completed = this.completed;
    }

     undoTransaction() {
        
        this.currentItem.description = this.original.description;
        this.currentItem.due_date = this.original.due_date;
        this.currentItem.assigned_to = this.original.assigned_to;
        this.currentItem.completed = this.original.completed;

    }
     
}
export default delteItem;