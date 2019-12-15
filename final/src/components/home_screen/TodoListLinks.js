import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';
import ReactDOM from "react-dom";
import { firestoreConnect } from 'react-redux-firebase';

class TodoListLinks extends React.Component {

    

    handletime = () => {
        
        const fireStore = getFirestore();
            fireStore.collection('wireframes').doc(this.props.wireframes.id).set({
                createdAt: fireStore.FieldValue.serverTimestamp(),

            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });
      }

      handledeleteList = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const { target } = e;

        const fireStore = getFirestore();
            fireStore.collection('wireframes').doc(target.id).delete().then(() => {
                    console.log("delete data");
                }).catch((err) => {
                    console.log(err);
                });
    }

    render() {
        const wireframes = this.props.wireframes;
        const fireStore = getFirestore();
        const userid = this.props.auth.uid;

        const snapshot = this.props.users
        

        
        // const isadmin = docdata.isadmin
        if(this.props.users){
        const users = this.props.users
        const user = users.filter(each => (each.id == userid ))
         console.log("is admin: "+user[0].id)
        }

        
      
        
        return (
            <div className="todo-lists section" >
                {wireframes && wireframes.filter(wireframe => (wireframe.userid == this.props.auth.uid))
                .map(wireframe => (
                    <Link to={'/wireframes/' + wireframe.id} key={wireframe.id}  onClick={() => {
                        const fireStore = getFirestore();
                  if(!wireframe.id){
             return<React.Fragment/>
         }      
            fireStore.collection('wireframes').doc(wireframe.id).update({
                createdAt: fireStore.FieldValue.serverTimestamp(),

            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });
                      }}  >
                          
                        <TodoListCard wireframe={wireframe} id ={wireframe.id}
                        handledeleteList={this.handledeleteList.bind(this)}/>
                    </Link>
                ))}
            </div>
        );



    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
        
    };
};

export default compose(connect(mapStateToProps),firestoreConnect([
    {collection: 'users'},
]))(TodoListLinks);