import React, { Component } from 'react'

export class ListItemCard extends Component {

    
    state = {
        up :false,
        down:false
      }


    getComplete() {
        if (this.props.listItem.completed) {
            let complete = "Complete";
            return complete;
        }
        else
            return "Pending";
    }

    
    render() {
        if(this.props.todoList.items.indexOf(this.props.listItem)===0){
            this.state.up =true
        }
        else {
            this.state.up =false
        }
        if(this.props.todoList.items.indexOf(this.props.listItem)===this.props.todoList.items.length - 1){
            this.state.down =true
        }
        else{
            this.state.down =false
        }
        
        if(this.props.listItem.completed){
        return (
            
            <div className='list_item_card' onClick = {this.props.goItem.bind(this, this.props.todoList,this.props.listItem)}>
                <div className="list_item_card_toolbar" >
                
{this.state.up ? <button type="button" className="list_item_card_button_up_disable" onClick={this.props.moveupItem.bind(this,this.props.listItem)} disabled>&#8679;</button> 
: <button type="button" className="list_item_card_button_up" onClick={this.props.moveupItem.bind(this,this.props.listItem)}>&#8679;</button>}

{this.state.down ? <button type="button" className="list_item_card_button_down_disabled" onClick={this.props.movedownItem.bind(this,this.props.listItem)} disabled>&#8681;</button> 
: <button type="button" className="list_item_card_button_down" onClick={this.props.movedownItem.bind(this,this.props.listItem)}>&#8681;</button>}

                
                <button type="button" className="list_item_card_button_x" onClick={this.props.deleteItem.bind(this,this.props.listItem)} >&#10005;</button>
                </div>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className='list_item_card_completed'>
                    {this.getComplete()}
                </div>
            </div>
        )
    }
    else{
        return (
            
            <div className='list_item_card'onClick = {this.props.goItem.bind(this, this.props.todoList,this.props.listItem)}>
                <div className="list_item_card_toolbar" >
                {this.state.up ? <button type="button" className="list_item_card_button_up_disable" onClick={this.props.moveupItem.bind(this,this.props.listItem)} disabled>&#8679;</button> 
: <button type="button" className="list_item_card_button_up" onClick={this.props.moveupItem.bind(this,this.props.listItem)}>&#8679;</button>}

{this.state.down ? <button type="button" className="list_item_card_button_down_disabled" onClick={this.props.movedownItem.bind(this,this.props.listItem)} disabled>&#8681;</button> 
: <button type="button" className="list_item_card_button_down" onClick={this.props.movedownItem.bind(this,this.props.listItem)}>&#8681;</button>}

                 <button type="button" className="list_item_card_button_x" 
                onClick= {this.props.deleteItem.bind(this,this.props.listItem)}

                >&#10005;</button>
                </div>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className='list_item_card_not_completed'>
                    {this.getComplete()}
                </div>
            </div>
        )
    }
}

}

export default ListItemCard
