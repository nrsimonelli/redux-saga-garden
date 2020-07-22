import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class PlantList extends Component {
    componentDidMount() {
        // use component did mount to dispatch an action to request the plantList from the API
        this.props.dispatch({ type: 'FETCH_PLANT' });
    }

    deleteClicked = (event) => {
        console.log("deleteClicked clicked");
        this.props.dispatch({ type: "DELETE_PLANT", payload: event.target.id});
        console.log("event.target.id is", event.target.id);
    }

    render() {
        return (
            <div>
                <h3>This is the plant list</h3>
                {/* <pre>{JSON.stringify(this.props.reduxState)}</pre> */}
                <ul>
                {this.props.reduxState.plantList.map((x, thisKey) => 
                    <li key={thisKey}>{x.name}<button onClick={this.deleteClicked} id={x.id}>Delete</button></li>
                )}
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PlantList);
