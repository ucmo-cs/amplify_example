import React, { Component } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { listCars } from '../graphql/queries'
import { deleteCar } from '../graphql/mutations'

class ListComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cars: [],
            message: null
        }
    }

    componentDidMount() {
        this.loadCarList();
    }

    async loadCarList() {
        const result = await API.graphql(graphqlOperation(listCars));
        this.setState({cars: result.data.listCars.items })
    }

    async deleteCarEntry(carId) {
        const { cars } = this.state;
        const input = { id : carId };
        const result = await API.graphql(graphqlOperation(deleteCar, {input : input}));
        const deletedCarId = result.data.deleteCar.id;
        const updatedCars = cars.filter(car => car.id !== deletedCarId);
        this.setState({ cars: updatedCars });
    }

    editCarEntry(id) {
        window.localStorage.setItem("carId", id);
        this.props.history.push('/edit');
    }

    addCar() {
        window.localStorage.removeItem("carId");
        this.props.history.push('/add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Car Details</h2>
                <button className="btn btn-danger" onClick={() => this.addCar()}> Add Car</button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.cars.map(
                            car =>
                                <tr key={car.id}>
                                    <td>{car.make}</td>
                                    <td>{car.model}</td>
                                    <td>{car.year}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => this.deleteCarEntry(car.id)}> Delete</button>
                                        <button className="btn btn-success" onClick={() => this.editCarEntry(car.id)}> Edit</button>
                                    </td>
                                </tr> )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListComponent;
