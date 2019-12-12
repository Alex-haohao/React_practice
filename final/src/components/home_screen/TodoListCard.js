import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { wireframe } = this.props;
        console.log("wireframeCard, wireframe.id: " + wireframe.id);
        return (
            <div className="card z-depth-0 todo-list-link grey lighten-2">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframe.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;