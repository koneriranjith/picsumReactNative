import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<App />)
            expect(component).toMatchSnapshot()
        });
    });
});
