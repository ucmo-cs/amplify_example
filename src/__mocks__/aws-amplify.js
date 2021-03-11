import { listCars }  from '../graphql/queries'
import { getCar }    from '../graphql/queries'
import { createCar } from '../graphql/mutations'
import { deleteCar } from '../graphql/mutations'
import { updateCar } from '../graphql/mutations'

// Test variables to make sure that API has been called and with the input
// values we expect.
export let listCount = 0;
export let getCount = 0;
export let deleteCount = 0;
export let addCount = 0;
export let editCount = 0;
export let addInput = undefined;
export let editInput = undefined;

// Mock the aws-ampligy API graphql function.
// Based on the query type, it will return a Promise that resolves to the
// object we expect to be returned from the API base on our test
export const API = {
    graphql: async (op) => {
        if (op.query === listCars) {
            listCount += 1;
            const carList = {
                data: {
                    listCars: {
                        items: [
                                { id:1, make:"Ford",  model:"Mustang", year:1998 },
                                { id:2, make:"Honda", model:"CRV",     year:2018 }
                               ]
                    }
                }
            };
            return new Promise((resolve) => { resolve(carList) });
        }
        else if (op.query === getCar) {
            getCount += 1;
            const getList = {
                data: {
                    getCar: { id:1,  make:"Ford",  model:"Mustang", year:1998 }
                }
            };
            return new Promise((resolve) => { resolve(getList) });
        }
        else if (op.query === deleteCar) {
            deleteCount += 1;
            const deleteList = {
                data: {
                    deleteCar: { id:1,  make:"Ford",  model:"Mustang", year:1998}
                }
            };
            return new Promise((resolve) => { resolve(deleteList) });
        }
        else if (op.query === createCar) {
            addCount += 1;
            addInput = op.variables.input;
            const addList = {
                    data: {
                        createCar: { id:3,  
                                     make:op.variables.make,
                                     model:op.variables.model, 
                                     year:op.variables.year}
                    }
                };
            return new Promise((resolve) => { resolve(addList) });
            }
        else if (op.query === updateCar) {
            editCount += 1;
            editInput = op.variables.input;
            const editList = {
                    data: {
                        updateCar: { id:op.variables.id,  
                                     make:op.variables.make,
                                     model:op.variables.model, 
                                     year:op.variables.year}
                    }
                };
            return new Promise((resolve) => { resolve(editList) });
            }
        }
};

// Mock the graphqlOperation and simply return the input parameters
// as an object we know that the Component under test will pass to the
// API.graphql function.
export const graphqlOperation = (query, input) => {
      return {query: query, variables: input}
}

