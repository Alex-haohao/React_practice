'use strict'

import jTPS_Transaction from './jTPS_js.js'

class sortdue_true extends jTPS_Transaction {

    constructor(currentList,original) {
        super();
        this.currentList = currentList;
        this.original = original
     
    }   
     

    doTransaction() {
        
    this.currentList.items.sort((a, b) =>  (a.due_date > b.due_date) ? 1 : -1 );
    }

     undoTransaction() {
        
    this.currentList.items = this.original

    }
     
}
export default sortdue_true;