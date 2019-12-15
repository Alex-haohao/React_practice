import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { wireframe } = this.props;
        console.log("wireframeCard, wireframe.id: " + wireframe.id);
        return (
            <div className="card z-depth-0 todo-list-link grey lighten-2">
                <div className="card-content grey-text text-darken-3">
                <button className="btn right" id={this.props.id} onClick={this.props.handledeleteList.bind(this)}>X</button>

                    <p className="card-title">{wireframe.name}</p>
                </div>
            </div>
        );
    }
}
export default TodoListCard;