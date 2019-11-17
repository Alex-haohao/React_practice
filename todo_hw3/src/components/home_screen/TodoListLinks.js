import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {

    

    handletime = () => {
        
        const fireStore = getFirestore();
            fireStore.collection('todoLists').doc(this.props.todoList.id).set({
                createdAt: fireStore.FieldValue.serverTimestamp(),

            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });
      }

    render() {
        const todoLists = this.props.todoLists;
        console.log(todoLists);
        return (
            <div className="todo-lists section" >
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id}  onClick={() => {
                        const fireStore = getFirestore();
            fireStore.collection('todoLists').doc(todoList.id).update({
                createdAt: fireStore.FieldValue.serverTimestamp(),

            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });
                      }}  >
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);