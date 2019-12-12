import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

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

    render() {
        const wireframes = this.props.wireframes;
        console.log(wireframes);
        return (
            <div className="todo-lists section" >
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/wireframes/' + wireframe.id} key={wireframe.id}  onClick={() => {
                        const fireStore = getFirestore();
            fireStore.collection('wireframes').doc(wireframe.id).update({
                createdAt: fireStore.FieldValue.serverTimestamp(),

            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });
                      }}  >
                        <TodoListCard wireframe={wireframe} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);