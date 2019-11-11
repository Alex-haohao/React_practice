import React, { Component } from 'react'

export class ListTrash extends Component {

    render() {
        return (

            <span class="waves-effect waves-light btn right grey lighten-2" onClick={this.props.goTash}>&#128465;</span>

        
        )
    }
}

export default ListTrash
