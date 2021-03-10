import { render, screen } from '@testing-library/react';
import ListComponent from './ListComponent'

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
    it('List Component Snapshot Test', () => {
        const wrapper = render(<ListComponent/>);
        expect(wrapper).toMatchSnapshot();
    });

});

