import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable'; 
import { Resizable, ResizableBox } from 'react-resizable';
import { Rnd } from "react-rnd";


class wireframeComponent extends React.Component {

    state = {
        activeDrags: 0,
        showup:false,
        
        controlledPosition: {
          x: this.props.item.x_position, y: this.props.item.y_position
        },
       width: this.props.item.width,
        height: this.props.item.height,
        x:this.props.item.x_position,
        y:this.props.item.y_position
      };

      

      onResize = (event, {element, size, handle}) => {
        this.setState({width: size.width, height: size.height});
      };

      handleshowup =()=>{
        this.setState({showup: !this.state.showup});
      }

     

    render() {
        console.log(this.state.controlledPosition)
        const {item} = this.props;
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;

        if(item.type === "container"){
        return (
        

            <Rnd
                style={{position : "absolute",
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                zIndex:1    }}
        size={{ width: parseInt(this.state.width,10), height: parseInt(this.state.height,10) }}
        position={{ x: parseInt(this.state.x,10), y: parseInt(this.state.y,10) }}
        onDragStop={(e, d) => {
          this.setState({ x: parseInt(d.x,10), y: parseInt(d.y,10) });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          this.setState({
            width: parseInt(ref.style.width,10),
            height: parseInt(ref.style.height,10),
            ...position
          });
        }}
      >
        
        <div id="container"  style={{position : "absolute",
            backgroundColor:item.background,
            borderColor : item.border_color,
            borderRadius : item.border_radius,
            borderWidth : item.border_thickness,
            fontSize : item.font,
            width : parseInt(this.state.width,10),
            height : parseInt(this.state.height,10),
            zIndex:1   }}
            id = {item.id}
            onClick = {this.props.handleClick.bind(this,this.state.x,this.state.y,this.state.width,this.state.height)}
            onMouseDown ={this.handleshowup}>
            

    

    {this.state.showup ? <div class="top_left" id="tl"></div> : null}
    {this.state.showup ? <div class="top_right" id="tr"></div> : null}
    {this.state.showup ? <div class="b_left" id="bl"></div> : null}
    {this.state.showup ? <div class="b_right" id="br"></div> : null}




  
            </div>


      </Rnd>




        );
           
        }
        else if(item.type === "label"){
            return (
                
                <Rnd
                style={{position : "absolute",
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                zIndex:2    }}
                size={{ width: parseInt(this.state.width,10), height: parseInt(this.state.height,10) }}
                position={{ x: parseInt(this.state.x,10), y: parseInt(this.state.y,10) }}
                onDragStop={(e, d) => {
                  this.setState({ x: parseInt(d.x,10), y: parseInt(d.y,10) });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  this.setState({
                    width: parseInt(ref.style.width,10),
                    height: parseInt(ref.style.height,10),
                    ...position
                  });
                }}
      >
        
        <input  type="text" className="browser-default"  style={{position : "absolute",
                
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                fontSize : item.font,
                width : parseInt(this.state.width,10),
                height : parseInt(this.state.height,10),
                zIndex:2    }}
                id = {item.id}
                value ={item.text}
                onClick = {this.props.handleClick.bind(this,this.state.x,this.state.y,this.state.width,this.state.height)}>
                </input >
      </Rnd>


        


            

                
            );
        }
        else if(item.type === "textfield"){

            return (

            

                <Rnd
                style={{position : "absolute",
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                zIndex:2    }}
                size={{ width: parseInt(this.state.width,10), height: parseInt(this.state.height,10) }}
                position={{ x: parseInt(this.state.x,10), y: parseInt(this.state.y,10) }}
                onDragStop={(e, d) => {
                  this.setState({ x: parseInt(d.x,10), y: parseInt(d.y,10) });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  this.setState({
                    width: parseInt(ref.style.width,10),
                    height: parseInt(ref.style.height,10),
                    ...position
                  });
                }}
      >
        
        <input  type="text" className="browser-default"  style={{position : "absolute",
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                fontSize : item.font,
                width : parseInt(this.state.width,10),
            height : parseInt(this.state.height,10),
                zIndex:2    }}
                id = {item.id}
                value ={item.text}
                onClick = {this.props.handleClick.bind(this,this.state.x,this.state.y,this.state.width,this.state.height)}>
                </input>
      </Rnd>
            );

        }
        else if(item.type === "button"){
            return (
            

                  <Rnd
                style={{position : "absolute",
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                zIndex:2    }}
                size={{ width: parseInt(this.state.width,10), height: parseInt(this.state.height,10) }}
                position={{ x: parseInt(this.state.x,10), y: parseInt(this.state.y,10) }}
                onDragStop={(e, d) => {
                  this.setState({ x: parseInt(d.x,10), y: parseInt(d.y,10) });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  this.setState({
                    width: parseInt(ref.style.width,10),
                    height: parseInt(ref.style.height,10),
                    ...position
                  });
                }}
      >
        
        <button  type="button" className="browser-default"  style={{position : "absolute",
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                fontSize : item.font,
                width : parseInt(this.state.width,10),
            height : parseInt(this.state.height,10),
                zIndex:2    }}
                id = {item.id}
                value ={item.text}

                onClick = {this.props.handleClick.bind(this,this.state.x,this.state.y,this.state.width,this.state.height)}
                onMouseDown ={this.handleshowup}>
                    
            

    

            {this.state.showup ? <div class="top_left" id="tl"></div> : null}
            {this.state.showup ? <div class="top_right" id="tr"></div> : null}
            {this.state.showup ? <div class="b_left" id="bl"></div> : null}
            {this.state.showup ? <div class="b_right" id="br"></div> : null}
                    {item.text}
                </button>
      </Rnd>


            )
        }
        else{
            return (
                <Rnd
                style={{position : "absolute",
                backgroundColor:item.background,
                borderColor : item.border_color,
                borderRadius : item.border_radius,
                borderWidth : item.border_thickness,
                zIndex:1    }}
                size={{ width: parseInt(this.state.width,10), height: parseInt(this.state.height,10) }}
                position={{ x: parseInt(this.state.x,10), y: parseInt(this.state.y,10) }}
                onDragStop={(e, d) => {
                  this.setState({ x: parseInt(d.x,10), y: parseInt(d.y,10) });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  this.setState({
                    width: parseInt(ref.style.width,10),
                    height: parseInt(ref.style.height,10),
                    ...position
                  });
                }}
      >
        
        <div  style={{position : "absolute",
            backgroundColor:item.background,
            borderColor : item.border_color,
            borderRadius : item.border_radius,
            borderWidth : item.border_thickness,
            fontSize : item.font,
            width : parseInt(this.state.width,10),
            height : parseInt(this.state.height,10),
            zIndex:1   }}
            id = {item.id}
            onClick = {this.props.handleClick.bind(this,this.state.x,this.state.y,this.state.width,this.state.height)}>
            </div>
      </Rnd>

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