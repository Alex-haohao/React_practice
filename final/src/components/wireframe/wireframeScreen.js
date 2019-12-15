import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import { SketchPicker } from 'react-color';
import WireframeComponent from './wireframeComponent.js'
import Draggable, {DraggableCore} from 'react-draggable'; 


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
        name:"",
        zoom:1,
        
        display_backgroundcolor_ColorPicker: false,
        backgroundcolor: "#BCAFAB",
        display_border_ColorPicker: false,
        bordercolor: "#BCAFAB",
          items : null,
          x_temp:0,
          y_temp:0
      };



      constructor(props){
        super(props);
        this.undo_key = this.undo_key.bind(this);
        this.redo_key = this.redo_key.bind(this);
    
      }
      showMessage () {
        alert('SOME MESSAGE');
      }
    
      undo_key(e){
        e.preventDefault() 
        if(e.keyCode===68 && e.ctrlKey) {
            console.log("duplicate")
            var itemarray = this.props.wireframe.items.filter(item => (item.id == this.state.id))
            var item = itemarray[0]
            var realitem = {}

            if(item.id >0){
                var sorted = [...this.props.wireframe.items]
                sorted = sorted.sort((a, b) =>  (a.id > b.id) ? 1 : -1 )
                var max = 1
                if(sorted.length >0){
                max = sorted[sorted.length -1].id +1
                }
                realitem.id = max
                realitem.x_position = item.x_position+100;
                realitem.y_position = item.y_position+100;
                realitem.position = item.position;
                realitem.background = item.background;
                realitem.border_color = item.border_color
                realitem.border_radius = item.border_radius;
                realitem.type = item.type;
                realitem.border_thickness=item.border_thickness;
                realitem.font = item.font;
                realitem.width = item.width;
                realitem.height =item.height;
                realitem.text = item.text

                this.props.wireframe.items.push(realitem);
                this.forceUpdate();
 
            }


        }
      }
    
      redo_key(e){
        e.preventDefault() 
        if(e.keyCode===8 ) {
          console.log("delete")

          var itemarray = this.props.wireframe.items.filter(item => (item.id != this.state.id))
          this.props.wireframe.items = itemarray;
          this.forceUpdate();

    
        }
      }
    
      componentDidMount(){
        document.addEventListener('keydown',this.redo_key);
    
        document.addEventListener('keydown',this.undo_key);
    
    
      }
      componentWillUnmount(){
            document.removeEventListener('keydown',this.redo_key);
    
        document.removeEventListener('keydown',this.undo_key);
    
      }
      




      handleUnselect = (event) => {

        event.stopPropagation()
        event.preventDefault()

        const itemarray = this.props.wireframe.items.filter(item => (item.id == this.state.id))

        if(itemarray.length >0){const item = itemarray[0]
            item.x_position = this.state.x_position;
            item.y_position = this.state.y_position;
            item.width = this.state.width;
            item.height = this.state.height}

        
        this.state.x_position = 0;
        this.state.y_position = 0
        this.state.borderRadius = 0
        this.state.borderWidth = 0
        this.state.fontSize = 0
        this.state.width = 0
        this.state.height = 0
        this.state.id = -1
        this.state.backgroundcolor = "#BCAFAB"
        this.state.bordercolor = "#BCAFAB"
        this.state.text = ""
        
        console.log("unselect")
        this.forceUpdate();

     }


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

       handlename = (e) =>{
        e.preventDefault()
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
          }));
        this.state.name = target.value
        this.props.wireframe.name = target.value
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

      handleClick = (x,y,w,h,event) => {
        event.stopPropagation()
        event.preventDefault()

    
        this.state.x_position = parseInt(x,10);
        this.state.y_position = parseInt(y,10);
        this.state.width = parseInt(w,10)
        this.state.height = parseInt(h,10)
        console.log("x: "+w)
        // const itemarray = this.props.wireframe.items.filter(item => (item.id == this.state.id))

        // if(itemarray.length >0){const item = itemarray[0]
        //     item.x_position = this.state.x_position;
        //     item.y_position = this.state.y_position;
        //     item.width = this.state.width;
        //     item.height = this.state.height}



        this.state.borderRadius = event.target.style.borderRadius
        this.state.borderWidth = event.target.style.borderWidth
        this.state.fontSize = event.target.style.fontSize
        
        this.state.id = event.target.id
        this.state.backgroundcolor = event.target.style.backgroundColor
        this.state.bordercolor = event.target.style.borderColor
        this.state.text = event.target.value
        

        this.state.x_temp = parseInt(x,10)
        this.state.y_temp = parseInt(y,10)

        this.forceUpdate();

     }

     

      create_textfield= () => {

        var sorted = [...this.props.wireframe.items]
        sorted = sorted.sort((a, b) =>  (a.id > b.id) ? 1 : -1 )

        var max = 1
        if(sorted.length >0){
        max = sorted[sorted.length -1].id +1
        }
        
       
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
        var max = 1
        if(sorted.length >0){
        max = sorted[sorted.length -1].id +1
        }

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
        var max = 1
        if(sorted.length >0){
        max = sorted[sorted.length -1].id +1
        }

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

      handle_submit= () => {

        const fireStore = getFirestore();
            fireStore.collection('wireframes').doc(this.props.wireframe.id).update({
                createdAt: fireStore.FieldValue.serverTimestamp(),
                items: this.props.wireframe.items,
                name: this.state.name,

            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });

      }

      create_container = () => {
        var sorted = [...this.props.wireframe.items]
        sorted = sorted.sort((a, b) =>  (a.id > b.id) ? 1 : -1 )
        var max = 1
        if(sorted.length >0){
        max = parseInt(sorted[sorted.length -1].id,10) +1
        }

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

      handle_zoom_in= () => {

        var zoom = document.getElementById("middle_container_child_id");
        zoom.style.transform = "scale("+this.state.zoom*2+")";
        this.state.zoom=this.state.zoom*2


        this.forceUpdate();
      }

      handle_zoom_out= () => {
        var zoom = document.getElementById("middle_container_child_id");
        zoom.style.transform = "scale("+this.state.zoom/2+")";
        this.state.zoom=this.state.zoom/2
        this.forceUpdate();
      }
   

    render() {

        let Draggable = require('react-draggable');
        let DraggableCore = Draggable.DraggableCore;

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

         const { auth } = this.props;
            if (auth.uid != wireframe.userid) {
            return <Redirect to="/" />;
            }

        const items = this.props.wireframe.items;
        const name = this.props.wireframe.name
        this.state.items = items;
        this.state.name = name;
        return (
            
            <div className="todo_home">

                <div className="left_container">
                <div className="button_container">

                <button type="button" className="material-icons " onClick ={this.handle_zoom_in}
                    >zoom_in</button>
                    <button type="button" className="material-icons " onClick={this.handle_zoom_out}
                    >zoom_out</button>



                    <button type="button" className="waves-effect waves-light btn"  style={{fontSize:10}} onClick={this.handle_submit}
                    >Save</button>

<Link to="/" className="brand-logo">

                    <button type="button" className="waves-effect waves-light btn" style={{fontSize:8}}
                    >cancel</button>
</Link>
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

                <div className="middle_container" id = "main_page" onClick={this.handleUnselect}>
                    <div className="middle_container_child" id="middle_container_child_id">
                    {items.map((item) => (
                        
 
                        <WireframeComponent item = {item} handleClick={this.handleClick}/>

                    ))}
</div>

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

                <p>wireframe name:: 
                <input type="text" value={this.state.name} onChange={this.handlename} ></input> 
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