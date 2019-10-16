'use strict'

import jTPS_Transaction from './jTPS_js.js'

class Name extends jTPS_Transaction {

    constructor(initname,initnewname,prename) {
        super();
        this.oname = initname;
        this.newname = initnewname;
        this.prename = prename
    }   

     

    doTransaction() {
        
        this.oname.name = this.newname.value
    }

     undoTransaction() {
        this.oname.name = this.prename
    }
     
}
export default Name;