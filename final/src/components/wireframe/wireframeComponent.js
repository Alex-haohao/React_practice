import React from 'react';

class wireframeComponent extends React.Component {

    render() {
        const {item} = this.props;
        console.log(item);
       if(item.type === "container"){
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
            zIndex:1    }}>
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
                zIndex:2    }}>
                </input>
            );
        }
        else if(item.type === "textfield"){

            return (
                <input  type="text" className="browser-default"  style={{position : "absolute",
                left : item.x_position,
                top :item.y_position,
                backgroundColor:item.background,
                borderColor : "none",
                borderRadius : "none",
                borderWidth : "none",
                fontSize : item.font,
                width : item.width,
                height : item.height,
                zIndex:2    }}>
                </input>
            );

        }
        else if(item.type === "button"){
            return (
            <button  type="button" className="browser-default"  style={{position : "absolute",
                left : item.x_position,
                top :item.y_position,
                backgroundColor:item.background,
                borderColor : "none",
                borderRadius : "none",
                borderWidth : "none",
                fontSize : item.font,
                width : item.width,
                height : item.height,
                zIndex:2    }}>
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
                zIndex:1    }}>
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