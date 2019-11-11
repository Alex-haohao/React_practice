import React from 'react';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {

    state = {
        up :false,
        down:false
      }

    


    render() {
        const { item } = this.props; 
        if(this.props.todoList.items.indexOf(item)===0){
            this.state.up =true
        }
        else {
            this.state.up =false
        }
        if(this.props.todoList.items.indexOf(item)===this.props.todoList.items.length - 1){
            this.state.down =true
        }
        else{
            this.state.down =false
        }

        
        return (
            <div className="card z-depth-0 todo-list-link grey lighten-2">
                 <Link to={'/todoList/' + this.props.listid+"/"+this.props.itemid} 
                 todoList = {this.props.todoList}
                 key={this.props.itemid}>
                <div className="card-content black-text text-darken-3">
                    <span className="card-title">{item.description}</span>  
                    <span className="card-content "> Assigned To:  {item.assigned_to}</span>
                    <span className="card-content">{item.due_date}</span> 
                     {item.completed ?
                    <span className="card-content green-text">completed</span>: 
                    <span className="card-content red-text">pending</span>}  



                    <button type="button" className="waves-effect waves-light btn-small right" onClick={this.props.deletes.bind(this,item)}
                     >&#10005;</button>
                    
                
                     
                    
{this.state.down ? <button type="button" className="waves-effect waves-light btn-small right" onClick={this.props.movedownItem.bind(this,item)} disabled>&#8681;</button>
: <button type="button" className="waves-effect waves-light btn-small right" onClick={this.props.movedownItem.bind(this,item)}>&#8681;</button>}


                    
                    {this.state.up ? <button type="button" className="waves-effect waves-light btn-small right" onClick={this.props.moveupitem.bind(this,item)} disabled >&#8679;</button> 
:<button type="button" className="waves-effect waves-light btn-small right" onClick={this.props.moveupitem.bind(this,item)} >&#8679;</button> }



                 
                </div>
                 </Link>
            </div>
        );
    }
}
export default ItemCard;