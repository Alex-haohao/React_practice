import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import { SketchPicker } from 'react-color';
import WireframeComponent from './wireframeComponent.js'

class WireframeScreen extends Component {
    state = {
        display_backgroundcolor_ColorPicker: false,
        backgroundcolor: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
          },
        display_border_ColorPicker: false,
        bordercolor: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
          },
      };


      create_textfield= () => {
        var textfield = document.createElement("INPUT");
        textfield.setAttribute("type", "text");
        textfield.innerHTML = "HAHA";
        textfield.style.position = "absolute";
        textfield.style.left = 250+'px';
        textfield.style.top = 250+'px';
        textfield.style.backgroundColor="white";
        textfield.style.borderColor = "#0000FF";
        textfield.style.borderRadius = "1";
        textfield.style.borderWidth = "thick";
        textfield.style.fontSize = 16+'px';
        textfield.style.width = 150+'px';
        textfield.style.height = 40+'px';
        textfield.style.zIndex = 2;
        var body = document.getElementById("main_page");
        body.appendChild(textfield);
      }

      create_label= () => {
        var label = document.createElement("INPUT");
        label.setAttribute("type", "text");
        label.innerHTML = "HAHA";
        label.style.position = "absolute";
        label.style.left = 220+'px';
        label.style.top = 230+'px';
        label.style.border = "none"
        label.style.borderColor="transparent";
        label.style.backgroundColor="white";
        // label.style.borderColor = "#0000FF";
        // label.style.borderRadius = "1";
        // label.style.borderWidth = "thick";
        label.style.fontSize = 13+'px';
        label.style.width = 150+'px';
        label.style.height = 40+'px';
        label.style.zIndex = 2;
        var body = document.getElementById("main_page");
        body.appendChild(label);
      }


       create_button = () => {
        var button = document.createElement("button");
        button.innerHTML = "Do Something";
        button.style.position = "absolute";
        button.style.left = 200+'px';
        button.style.top = 200+'px';
        button.style.backgroundColor="white";
        button.style.borderColor = "#0000FF";
        button.style.borderRadius = "1";
        button.style.borderWidth = "thick";
        button.style.fontSize = 12+'px';
        button.style.width = 100+'px';
        button.style.height = 50+'px';
        button.style.zIndex = 2;
        var body = document.getElementById("main_page");
        body.appendChild(button);
      }

      create_container = () => {
        var container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = 200+'px';
        container.style.top = 200+'px';
        container.style.backgroundColor="white";
        container.style.borderColor = "#0000FF";
        container.style.borderRadius = "1";
        container.style.borderWidth = "thick";
        container.style.fontSize = 12+'px';
        container.style.width = 200+'px';
        container.style.height = 200+'px';
        container.style.zIndex = 1;

        var body = document.getElementById("main_page");
        body.appendChild(container);
      }


    
      handle_backgroundcolor_Change = (color) => {
        this.setState({ backgroundcolor: color.rgb })
    };

      handle_backgroundcolor_Click = () => {
        this.setState({ display_backgroundcolor_ColorPicker: !this.state.display_backgroundcolor_ColorPicker })
      };
    
      handle_backgroundcolor_Close = () => {
        this.setState({ display_backgroundcolor_ColorPicker: false })
      };


      handle_border_Change = (color) => {
        this.setState({ bordercolor: color.rgb })
    };

      handle_border_Click = () => {
        this.setState({ display_border_ColorPicker: !this.state.display_border_ColorPicker })
      };
    
      handle_border_Close = () => {
        this.setState({ display_border_ColorPicker: false })
      };


    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
          }
          const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }

         const wireframe = this.props.wireframe; 
         if(!wireframe){
             return<React.Fragment/>
         }

        const items = wireframe.items;
        return (
            
            <div className="todo_home">

                <div className="left_container">
                <div className="button_container">
                <button type="button" className="material-icons " 
                    >zoom_in</button>
                    <button type="button" className="material-icons "
                    >zoom_out</button>
                    <button type="button" className="waves-effect waves-light btn "
                    >&#10005;</button>
                    <button type="button" className="waves-effect waves-light btn "
                    >&#10005;</button>
                </div>

                <div className="wire_container">
                    
                <div className="standard_container" onClick={this.create_container}>
                </div>
                <label for="standard_container">container</label>

                <h6 className="prompt_for_input" onClick={this.create_label}>Prompt for input:</h6>
                <label for="prompt_for_input">Lable</label>

                <button type="button" className="waves-effect waves-light btn-small " id="show_button" onClick={this.create_button}>submit</button>
                <label for="waves-effect waves-light btn ">Button</label>


                <input type="text" className="browser-default" value="input" id="Textfield_default" onClick={this.create_textfield}></input> 
                <label for="Textfield_default">Textfield</label>
               

                </div>
                </div>

                <div className="middle_container" id = "main_page">
                    {items.map((item) => (
                        // const type = item.type
                        // if(item.type === "container"){
                        //     var elememt = document.createElement("div");
                        //     elememt.style.zIndex = 1;
                        // }
                        // else if(item.type === "label"){
                        //     var elememt = document.createElement("INPUT");
                        //     elememt.setAttribute("type", "text");
                        //     elememt.style.zIndex = 2;
                        // }
                        // else if(item.type === "textfield"){
                        //     var elememt = document.createElement("INPUT");
                        //     elememt.setAttribute("type", "text");
                        //     elememt.style.zIndex = 2;
                        // }
                        // else if(item.type === "button"){
                        //     var elememt = document.createElement("button");
                        //     elememt.innerHTML = "Do Something";
                        //     elememt.style.zIndex = 2;
                        // }
                        // else{
                        //     var elememt = document.createElement("div");
                        //     elememt.style.zIndex = 1; 
                        // }
                        // const position = "absolute";
                        // const left = item.x_position+'px';
                        // const top = item.y_position+'px';
                        // const backgroundColor=item.background;
                        // const borderColor = item.border_color;
                        // const borderRadius = item.border_radius;
                        // const borderWidth = item.border_thickness;
                        // const fontSize = item.font+'px';
                        // const width = item.width+'px';
                        // const height = item.height+'px';
                        // var body = document.getElementById("main_page");
                        // body.appendChild(elememt);
                        
                        <WireframeComponent item = {item}/>
                         
                        // left = {left}
                        // top = {top}
                        // backgroundColor ={backgroundColor}
                        // borderColor = {borderColor}
                        // borderRadius = {borderRadius}
                        // borderWidth = {borderWidth}
                        // fontSize = {fontSize}
                        // width = {width}
                        // height = {height}
                        // type = {type} />
                       

                    ))}


                </div>





                <div className="property_container">
                <p>Properties</p>
                <button type="button" className="waves-effect waves-light btn-small " id="property_btn">submit</button>
                <p>Font size: 
                <input type="text" className="browser-default" value="input" id="font_input"></input> 
                </p>

                <p>Background color: 
                <button onClick={ this.handle_backgroundcolor_Click }>Pick Color</button>
        { this.state.display_backgroundcolor_ColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handle_backgroundcolor_Close }/>
          <SketchPicker color={ this.state.backgroundcolor } onChange={this.handle_backgroundcolor_Change}/>
        </div> : null }
                </p>

                <p>Border color: 
                <button onClick={ this.handle_border_Click }>Pick Color</button>
        { this.state.display_border_ColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handle_border_Close }/>
          <SketchPicker color={ this.state.bordercolor } onChange={this.handle_border_Change}/>
        </div> : null }
                </p>

                <p>border_thickness: 
                <input type="text" className="browser-default" value="input" id="border_thickness"></input> 
                </p>

                <p>Border Radius: 
                <input type="text" className="browser-default" value="input" id="Border_Radius"></input> 
                </p>
            



                </div>
               

                </div>
            
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframes } = state.firestore.data;
    const wireframe = wireframes ? wireframes[id] : null;
    
    if(wireframe){
    wireframe.id = id;
    }
  
    return {
      wireframe,
      auth: state.firebase.auth,
    };
  };
  
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframes' },
    ]),
  )(WireframeScreen);