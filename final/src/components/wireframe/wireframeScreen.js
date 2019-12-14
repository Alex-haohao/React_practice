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
        x_position : 0,
        y_position :0,
        borderRadius : 0,
        type: null,
        borderWidth : 0,
        fontSize : 0,
        width : 0,
        height : 0,
        id:0,
        text:"",
        
        display_backgroundcolor_ColorPicker: false,
        backgroundcolor: "#BCAFAB",
        display_border_ColorPicker: false,
        bordercolor: "#BCAFAB",
          items : null,
      };

      handle_submit_property =()=>{
          const itemarray = this.props.wireframe.items.filter(item => (item.id == this.state.id))
          const item = itemarray[0]
          console.log(item)

          item.x_position = this.state.x_position;
          item.y_position = this.state.y_position;
          item.background= this.state.backgroundcolor;
          item.border_color = this.state.bordercolor;
          item.border_radius = this.state.borderRadius;
          item.border_thickness = this.state.borderWidth;
          item.font = this.state.fontSize;
          item.width = this.state.width;
          item.height = this.state.height;
          item.text = this.state.text;
          this.forceUpdate();

      }

      handleborder_radius = (e) =>{
        e.preventDefault()
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
          }));
        this.state.borderRadius = target.value
       }

      handleFont = (e) =>{
        e.preventDefault()
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
          }));
        this.state.fontSize = target.value
       }

       handletext = (e) =>{
        e.preventDefault()
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
          }));
        this.state.text = target.value
       }

       handleborder_thickness = (e) =>{
        e.preventDefault()
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
          }));
        this.state.borderWidth = target.value
       }

      handleClick = (event) => {
        event.preventDefault()

        
        this.state.x_position = event.target.style.left;
        this.state.y_position = event.target.style.top
        this.state.borderRadius = event.target.style.borderRadius
        this.state.borderWidth = event.target.style.borderWidth
        this.state.fontSize = event.target.style.fontSize
        this.state.width = event.target.style.width
        this.state.height = event.target.style.height
        this.state.id = event.target.id
        this.state.backgroundcolor = event.target.style.backgroundColor
        this.state.bordercolor = event.target.style.borderColor
        this.state.text = event.target.value
        
        console.log("this target   "+event.target.id)
        console.log("x_position   "+event.target.style.borderRadius)
        this.forceUpdate();

     }


      create_textfield= () => {

        var sorted = [...this.props.wireframe.items]
        sorted = sorted.sort((a, b) =>  (a.id > b.id) ? 1 : -1 )
        const max = sorted[sorted.length -1].id +1
       
        const item = {position : "absolute",
        x_position : 100,
        y_position :400,
        background:"#E2D1CC",
        border_color : "#3EB570",
        border_radius : 2,
        type: "textfield",
        border_thickness : 3,
        font : 12,
        width : 70,
        height : 70,
        text:"write",
        id : max
            }

        this.props.wireframe.items.push(item);
        this.forceUpdate();
      }

      create_label= () => {
        var sorted = [...this.props.wireframe.items]
        sorted = sorted.sort((a, b) =>  (a.id > b.id) ? 1 : -1 )
        const max = sorted[sorted.length -1].id +1

        const item = {position : "absolute",
        x_position : 220,
        y_position :230,
        background:"#4218EA",
        border_color : "#FFFFFF",
        border_radius : 0,
        type: "label",
        border_thickness : 0,
        font : 12,
        width : 150,
        height : 40,
        text:"write",
        id:max
          }

        this.props.wireframe.items.push(item);
        this.forceUpdate();
      }

       


       create_button = () => {
        var sorted = [...this.props.wireframe.items]
        sorted = sorted.sort((a, b) =>  (a.id > b.id) ? 1 : -1 )
        const max = sorted[sorted.length -1].id +1

        const item = {position : "absolute",
        x_position : 200,
        y_position :200,
        background:"#FFFFFF",
        border_color : "#FFFFFF",
        border_radius : 1,
        type: "button",
        border_thickness : 2,
        font : 12,
        width : 100,
        height : 50,
        text:"write",
        id:max
            }

        this.props.wireframe.items.push(item);
        this.forceUpdate();
      }

      create_container = () => {
        var sorted = [...this.props.wireframe.items]
        sorted = sorted.sort((a, b) =>  (a.id > b.id) ? 1 : -1 )
        const max = sorted[sorted.length -1].id +1

        const item = {position : "absolute",
        x_position : 300,
        y_position :400,
        background:"#ffffff",
        border_color : "#ffffff",
        border_radius : 1,
        type: "container",
        border_thickness : 3,
        font : 12,
        width : 400,
        height : 400,
        text:"",
        id:max
           }

        this.props.wireframe.items.push(item);
        this.forceUpdate();

        
      }


    
      handle_backgroundcolor_Change = (color) => {
        this.setState({ backgroundcolor: color.hex })
    };

      handle_backgroundcolor_Click = () => {
        this.setState({ display_backgroundcolor_ColorPicker: !this.state.display_backgroundcolor_ColorPicker })
      };
    
      handle_backgroundcolor_Close = () => {
        this.setState({ display_backgroundcolor_ColorPicker: false })
      };


      handle_border_Change = (color) => {
        this.setState({ bordercolor: color.hex })
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

        const items = this.props.wireframe.items;
        this.state.items = items;
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
                        
                        <WireframeComponent item = {item} handleClick={this.handleClick}/>
                         
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
                <button type="button" className="waves-effect waves-light btn-small " onClick={this.handle_submit_property} id="property_btn">submit</button>
                <p>Font size: 
                <input type="text" className="browser-default" value={this.state.fontSize} onChange={this.handleFont} id="font_input"></input> 
                </p>

                <p>Background color: 
                <button onClick={ this.handle_backgroundcolor_Click }>{this.state.backgroundcolor}</button>
        { this.state.display_backgroundcolor_ColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handle_backgroundcolor_Close }/>
          <SketchPicker color={ this.state.backgroundcolor } onChange={this.handle_backgroundcolor_Change}/>
        </div> : null }
                </p>

                <p>Border color: 
                <button onClick={ this.handle_border_Click }>{this.state.bordercolor}</button>
        { this.state.display_border_ColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handle_border_Close }/>
          <SketchPicker color={ this.state.bordercolor } onChange={this.handle_border_Change}/>
        </div> : null }
                </p>

                <p>border_thickness: 
                <input type="text" className="browser-default" value={this.state.borderWidth} onChange={this.handleborder_thickness} id="border_thickness"></input> 
                </p>

                <p>Border Radius: 
                <input type="text" className="browser-default" value={this.state.borderRadius} onChange={this.handleborder_radius} id="Border_Radius"></input> 
                </p>

                <p>inner text: 
                <input type="text" value={this.state.text} onChange={this.handletext} ></input> 
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