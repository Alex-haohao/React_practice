import React from 'react';

class wireframeComponent extends React.Component {

    render() {
        const {item} = this.props;
       if(item.type === "container"){
        return (
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
            onClick = {this.props.handleClick.bind(this)}
            >

            </div>
        );
           
        }
        else if(item.type === "label"){
            return (
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
                onClick = {this.props.handleClick.bind(this)}>
                    
                </input>
            );
        }
        else if(item.type === "textfield"){

            return (
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
                onClick = {this.props.handleClick.bind(this)}>
                </input>
            );

        }
        else if(item.type === "button"){
            return (
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

                onClick = {this.props.handleClick.bind(this)}>
                    {item.text}
                </button>

            )
        }
        else{
            return (
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
                onClick = {this.props.handleClick.bind(this)}>
                </div>
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