import { listCars } from '../graphql/queries'
import { deleteCar } from '../graphql/mutations'

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

const deleteList = {
    data: {
        deleteCar: { id:1,  make:"Ford",  model:"Mustang", year:1998}
    }
};

export const API = {
    graphql: async (query) => {
        if (query === listCars)
            return new Promise((resolve) => { resolve(carList) });
        else if (query === deleteCar)
            return new Promise((resolve) => { resolve(deleteList) });
    }
};

export const graphqlOperation = (x) => {
    return x;
}
