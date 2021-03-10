const carList = {
    data: {
        listCars: [
            { id:1, make:"Ford", model:"Mustang", year:1998}
        ]
    }
};

export const API = {
    graphql: (query) => {
        return new Promise((resolve) => { return carList });
    }
};

export const graphqlOperation = (x) => {
    return x;
}
