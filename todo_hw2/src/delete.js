'use strict'

import jTPS_Transaction from './jTPS_js.js'

class delteItem extends jTPS_Transaction {

    constructor(currentList,id,original) {
        super();
        this.currentList = currentList;
        this.id = id
        this.original = original
     
    }   

     

    doTransaction() {
        
        var currentitems = this.currentList.items.filter(Item => Item !== this.id);
        this.currentList.items = currentitems;
    }

     undoTransaction() {
        
       

        this.currentList.items = this.original



    }
     
}
export default delteItem;