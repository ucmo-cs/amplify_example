import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import { getCar } from '../graphql/queries'
import { updateCar } from '../graphql/mutations'

class EditComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            make: '',
            model: '',
            year: '',
        }
    }

    componentDidMount() {
        this.loadCar();
    }

    async loadCar() {
        const carId = window.localStorage.getItem("carId");
        const result = await API.graphql(graphqlOperation(getCar, {id : carId}));
        const car = result.data.getCar;
        this.setState({id : car.id, make : car.make, 
                       model : car.model, year : car.year});
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveCar = async (e) => {
        e.preventDefault();
        const input = this.state;
        console.log("Save Car");
        await API.graphql(graphqlOperation(updateCar, { input : input } ));
        this.props.history.push('/');
    }

    validate() {
        return this.state.year >= 1900 && this.state.year <=2020;
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Car</h2>
                <form>

                    <div className="form-group">
                        <label>Make:</label>
                        <input placeholder="Make" name="make" className="form-control" value={this.state.make} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Model:</label>
                        <input placeholder="Model" name="model" className="form-control" value={this.state.model} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Year:</label>
                        <input placeholder="Year" name="year" className="form-control" value={this.state.year} onChange={this.onChange}/>
                        <font color="red">{!this.validate() ? 'Year Error: Year must be >= 1900 and <=2020' : ""}</font>
                    </div>

                    <button className="btn btn-success" disabled={!this.validate()} onClick={this.saveCar}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditComponent;
