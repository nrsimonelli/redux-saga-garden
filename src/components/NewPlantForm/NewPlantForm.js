import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class NewPlantForm extends Component {
    state = {
        newPlant: {
            name: '',
            kingdom: '',
            clade: '',
            order: '',
            family: '',
            subfamily: '',
            genus: ''

        }
    }

    handleChange = (event, propertyName) => {
        console.log('event happended')
        this.setState({
            newPlant: {
                ...this.state.newPlant,
                [propertyName]: event.target.value,
        
            }
        });
    }




    addNewPlant = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PLANT', payload: this.state.newPlant })
        this.setState({
            newPlant: {
                name: '',
                kingdom: '',
                clade: '',
                order: '',
                family: '',
                subfamily: '',
                genus: ''
            }
        });
    }

    render() {
        return (
            <div>
                <h3>This is the form</h3>
                <pre>{JSON.stringify(this.state)}</pre>
                <form onSubmit={this.addNewPlant}>
                    <label>name</label>
                    <input type='text' value={this.state.newPlant.name} onChange={(event) => this.handleChange(event, 'name')} /><br/>
                    <label>kingdom</label>
                    <input type='text' value={this.state.newPlant.kingdom} onChange={(event) => this.handleChange(event, 'kingdom')} /><br/>
                    <label>clade</label>
                    <input type='text' value={this.state.newPlant.clade} onChange={(event) => this.handleChange(event, 'clade')} /><br/>
                    <label>order</label>
                    <input type='text' value={this.state.newPlant.order} onChange={(event) => this.handleChange(event, 'order')} /><br/>
                    <label>family</label>
                    <input type='text' value={this.state.newPlant.family} onChange={(event) => this.handleChange(event, 'family')} /><br/>
                    <label>subfamily</label>
                    <input type='text' value={this.state.newPlant.subfamily} onChange={(event) => this.handleChange(event, 'subfamily')} /><br/>
                    <label>genus</label>
                    <input type='text' value={this.state.newPlant.genus} onChange={(event) => this.handleChange(event, 'genus')} /><br/>
                    
                    <input type='submit' value='Add New Plant' />
                </form>
            </div>
        );
    }
}


export default connect(mapStateToProps)(NewPlantForm);
