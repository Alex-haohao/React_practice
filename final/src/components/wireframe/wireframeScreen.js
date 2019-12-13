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
            <div className="container grey lighten-2">
                hahaha
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