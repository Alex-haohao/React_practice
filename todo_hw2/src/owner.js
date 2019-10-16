'use strict'

import jTPS_Transaction from './jTPS_js.js'

class owner extends jTPS_Transaction {

    constructor(initname,initnewname,prename) {
        super();
        this.oname = initname;
        this.newname = initnewname;
        this.prename = prename
    }   

     

    doTransaction() {
        
        this.oname.owner = this.newname.value
    }

     undoTransaction() {
        this.oname.owner = this.prename
    }
     
}
export default owner;