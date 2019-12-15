import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable'; 

class wireframeComponent extends React.Component {

    state = {
        activeDrags: 0,
        deltaPosition: {
          x: 0, y: 0
        },
        controlledPosition: {
          x: this.props.item.x_position, y: this.props.item.y_position
        }
      };

      handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
      };

      adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x: x - 10, y}});
      };
    
      adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {controlledPosition} = this.state;
        const {x, y} = controlledPosition;
        this.setState({controlledPosition: {x, y: y - 10}});
        this.setState({controlledPosition: {x: x - 10, y}});

      };

    render() {
        console.log(this.state.controlledPosition)
        const {item} = this.props;
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;

        if(item.type === "container"){
        return (
            <Draggable handle="div" {...dragHandlers} onDrag={this.handleDrag} >
            <div  style={{position : "absolute",
            left : item.x_position,
            top :item.y_position,
            backgroundColor:item.background,
            borderColor : item.border_color,
            borderRadius : item.border_radius,
            borderWidth : item.border_thickness,
            fontSize : item.font,
            width : item.width,
            height : item.height,
            zIndex:1   }}
            id = {item.id}
            onClick = {this.props.handleClick.bind(this,deltaPosition.x.toFixed(0),deltaPosition.y.toFixed(0))}>
            </div>
            </Draggable>
        );
           
        }
        else if(item.type === "label"){
            return (
                
                <Draggable handle="input" {...dragHandlers} onDrag={this.handleDrag} >
                <input  type="text" className="browser-default"  style={{position : "absolute",
                left : item.x_position,
                top :item.y_position,
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                fontSize : item.font,
                width : item.width,
                height : item.height,
                zIndex:2    }}
                id = {item.id}
                value ={item.text}
                onClick = {this.props.handleClick.bind(this,deltaPosition.x.toFixed(0),deltaPosition.y.toFixed(0))}>
                </input >
                
                
              </Draggable>

                
            );
        }
        else if(item.type === "textfield"){

            return (
                <Draggable handle="input" {...dragHandlers} onDrag={this.handleDrag} >
                <input  type="text" className="browser-default"  style={{position : "absolute",
                left : item.x_position,
                top :item.y_position,
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                fontSize : item.font,
                width : item.width,
                height : item.height,
                zIndex:2    }}
                id = {item.id}
                value ={item.text}
                onClick = {this.props.handleClick.bind(this,deltaPosition.x.toFixed(0),deltaPosition.y.toFixed(0))}>
                </input></Draggable>
            );

        }
        else if(item.type === "button"){
            return (
                <Draggable handle="button" {...dragHandlers} onDrag={this.handleDrag} >
            <button  type="button" className="browser-default"  style={{position : "absolute",
                left : item.x_position,
                top :item.y_position,
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                fontSize : item.font,
                width : item.width,
                height : item.height,
                zIndex:2    }}
                id = {item.id}
                value ={item.text}

                onClick = {this.props.handleClick.bind(this,deltaPosition.x.toFixed(0),deltaPosition.y.toFixed(0))}>
                    {item.text}
                </button>
</Draggable>
            )
        }
        else{
            return (
                <Draggable handle="input" {...dragHandlers} onDrag={this.handleDrag} >
                <div style={{position : "absolute",
                left : item.x_position,
                top :item.y_position,
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                fontSize : item.font,
                width : item.width,
                height : item.height,
                zIndex:1    }}
                id = {item.id}
                onClick = {this.props.handleClick.bind(this,deltaPosition.x.toFixed(0),deltaPosition.y.toFixed(0))}>
                </div></Draggable>
            )
        }
        

        // var divStyle = {
        //     position : "absolute",
        //     left : item.x_position,
        //     top :item.y_position,
        //     backgroundColor:item.background,
        //     borderColor : item.border_color,
        //     borderRadius : item.border_radius,
        //     borderWidth : item.border_thickness,
        //     fontSize : item.font,
        //     width : item.width,
        //     height : item.height          
        //   };
    
        
    }
}
export default wireframeComponent;