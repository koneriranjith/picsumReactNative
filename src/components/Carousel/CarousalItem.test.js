import React from 'react';
import CarouselItem from './CarouselItem';
import { shallow } from 'enzyme';

describe('Carousel Item', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<CarouselItem item={{id:1, author:"author"}} />)
            expect(component).toMatchSnapshot()
            expect(component.find("Text")).toBeTruthy()
        });
    });
});
