import React from 'react';
import {shallow} from 'enzyme';
import CarouselItem from './CarouselItem';

describe('Carousel Item', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<CarouselItem item={{id:1, author:"author"}} />)
            expect(component).toMatchSnapshot()
            expect(component.find("Text")).toBeTruthy()
        });
    });
});
