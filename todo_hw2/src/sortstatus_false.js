'use strict'

import jTPS_Transaction from './jTPS_js.js'

class sortstatus_false extends jTPS_Transaction {

    constructor(currentList,original) {
        super();
        this.currentList = currentList;
        this.original = original
     
    }   

     

    doTransaction() {
        
    this.currentList.items.sort((a, b) =>  (b.completed > a.completed) ? 1 : -1 );
    }

     undoTransaction() {
        
    this.currentList.items = this.original

    }
     
}
export default sortstatus_false;