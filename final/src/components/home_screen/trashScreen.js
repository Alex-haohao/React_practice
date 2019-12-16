import React, { Component } from 'react'
import { Link } from 'react-router-dom';




export class ListTrashScreen extends Component {


    
    render() {
        
        return (
            <div className="delete_popup">
               <div className="popup\_inner">
               <h3 id="home_your_lists_heading">Delete list?</h3>
               <h4 id="home_your_lists_heading">Are you sure you want to delete this frame?</h4>
               
               <Link to={"./"} className="waves-effect waves-light btn"id={this.props.id}  onClick = {this.props.handledeleteList.bind(this,this.props.id)}>YES</Link>

               <button type="button" className="waves-effect waves-light btn" onClick={this.props.goTash.bind(this,0)}>NO</button>
               <br /><br />
               <p>The list will not be retreivable</p>
               
               </div>
            </div>
        );

}
}

export default ListTrashScreen