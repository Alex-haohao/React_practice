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
                     <div class = "row">  
                <div className="card-content black-text text-darken-3">
                    
                    
                    <span className="card-title">{item.description}</span>  
                    <div class = "col s12 m4">  
                    <span className="card-content "> Assigned To:  {item.assigned_to}</span>
                    </div>
                    <div class = "col s12 m3">  
                    <span className="card-content">{item.due_date}</span> 
                    </div>
                    <div class = "col s12 m2"> 
                     {item.completed ?
                    <span className="card-content green-text">completed</span>: 
                    <span className="card-content red-text">pending</span>}  
                     </div>


{/* <div class="card hover-reveal">
           <div class="card-image waves-effect waves-block waves-light">
           </div>
          

           <div class="card-reveal"> */}
<div className ="hover-button right ">
<div class="hover-button--on hoverable right" >

                    <button type="button" className="waves-effect waves-light btn-small right red" onClick={this.props.deletes.bind(this,item)}
                     >&#10005;</button>
                
{this.state.down ? <button type="button" className="waves-effect waves-light btn-small right" onClick={this.props.movedownItem.bind(this,item)} disabled>&#8681;</button>
: <button type="button" className="waves-effect waves-light btn-small right" onClick={this.props.movedownItem.bind(this,item)}>&#8681;</button>}

                    {this.state.up ? <button type="button" className="waves-effect waves-light btn-small right" onClick={this.props.moveupitem.bind(this,item)} disabled >&#8679;</button> 
:<button type="button" className="waves-effect waves-light btn-small right blue" onClick={this.props.moveupitem.bind(this,item)} >&#8679;</button> }

  
  

  </div>
  <span class='hover-button--off btn right'>Hover</span>
</div> 


                 
                </div>
                </div>
                 </Link>
            </div>
            
        );
    }
}








export default ItemCard;