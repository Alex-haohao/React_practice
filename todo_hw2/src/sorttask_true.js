'use strict'

import jTPS_Transaction from './jTPS_js.js'

class sorttask_true extends jTPS_Transaction {

    constructor(currentList,original) {
        super();
        this.currentList = currentList;
        this.original = original
     
    }   
     

    doTransaction() {
        
    this.currentList.items.sort((a, b) =>  (a.description > b.description) ? 1 : -1 );
    }

     undoTransaction() {
        
    this.currentList.items = this.original

    }
     
}
export default sorttask_true;