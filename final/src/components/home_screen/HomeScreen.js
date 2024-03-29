import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
import TrashScreen from './trashScreen'

class HomeScreen extends Component {
    state = {
        temp : null,
      }

      


    handleNewList = () => {
        const fireStore = getFirestore();
            fireStore.collection('wireframes').add({
                    userid: this.props.auth.uid,
                    name: "Unknow",
                    dimension_width:1000,
                    dimension_height:1000,
                    items: [],
                    createdAt: fireStore.FieldValue.serverTimestamp(),
                }).then(() => {
                    window.location.reload();
                    console.log("this belong to "+this.props.auth.uid)
                    console.log("add new data");
                }).catch((err) => {
                    console.log(err);
                });
                
                
    }

   

    render() {
        var user = this.props.auth.uid;
        console.log("current user: "+user)

        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                   

            

                    <div className="col s8">
                        <div className="banner">
                            <br />
                            Wireframer
                        </div>
                        
                        <div className="home_new_list_container">
                        {/* <Link to={"/todoList/"+this.props.id} ></Link> */}
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create a New wireframe
                                </button>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframes' , orderBy:['createdAt','desc'] },
    ]),
)(HomeScreen);