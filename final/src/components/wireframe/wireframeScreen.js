import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';


class WireframeScreen extends Component {

    render() {

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
                    
                <div className="standard_container">
                </div>
                <label for="standard_container">container</label>

                <h6 className="prompt_for_input">Prompt for input:</h6>
                <label for="prompt_for_input">Lable</label>

                <button type="button" className="waves-effect waves-light btn-small " id="show_button">submit</button>
                <label for="waves-effect waves-light btn ">Button</label>


                <input type="text" className="browser-default" value="input" id="Textfield_default"></input> 
                <label for="Textfield_default">Textfield</label>
               

                </div>
                </div>

                <div className="middle_container"></div>





                <div className="property_container">
                <p>Properties</p>
                <button type="button" className="waves-effect waves-light btn-small " id="property_btn">submit</button>
                <p>Font size: 
                <input type="text" className="browser-default" value="input" id="font_input"></input> 
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
    
  
    wireframe.id = id;
  
  
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