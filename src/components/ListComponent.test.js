import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ListComponent from './ListComponent'
import { API, graphqlOperation } from 'aws-amplify';
import { listCars } from '../graphql/queries'
import { deleteCar } from '../graphql/mutations'

jest.mock('aws-amplify');

describe('My test test suite', () => { 
    it('`true` should be `true`', () => {
        expect(true).toBe(true); 
    });
    it('`false` should be `false`', () => { 
        expect(false).toBe(false);
    }); 
    it('`1` should be `1`', () => { 
        expect(1).toBe(1);
    }); 
});

describe('List Component Test Suite', () => { 
    it('List Component Test', async () => {
        render(<ListComponent/>);
        await waitFor(() => expect(screen.getByText("Ford")).toBeInTheDocument);
        expect(screen.getByText("Mustang")).toBeInTheDocument;
        expect(screen.getByText("1998")).toBeInTheDocument;
        expect(screen.getByText("Honda")).toBeInTheDocument;
        expect(screen.getByText("CRV")).toBeInTheDocument;
        expect(screen.getByText("2018")).toBeInTheDocument;
        //expect(API).toHaveBeenCalledWith(listCars);
    });
    it('List Component Delete Test', async () => {
        render(<ListComponent/>);
        await waitFor(() => expect(screen.getByText("Ford")).toBeInTheDocument);
        fireEvent.click(screen.getAllByText('Delete')[0])
        expect(screen.getByText("Ford")).toNotBeInTheDocument;
        expect(screen.getByText("Mustang")).toNotBeInTheDocument;
        expect(screen.getByText("1998")).toNotBeInTheDocument;
        expect(screen.getByText("Honda")).toBeInTheDocument;
        expect(screen.getByText("CRV")).toBeInTheDocument;
        expect(screen.getByText("2018")).toBeInTheDocument;
    });

});

