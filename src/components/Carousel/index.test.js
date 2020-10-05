import 'react-native';
import React from 'react';
import Index from './index';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

let mockData = {
    horizontal: true,
    pagingEnabled: true,
    scrollEnabled: true,
    snapToAlignment: 'center',
    onEndReachedThreshold: 0.5,
    scrollEventThrottle: 16,
    decelerationRate: 'fast',
    showsHorizontalScrollIndicator: true,
    showsHorizontalScrollIndicatorLimit: 10,
    data: [{src:'1'},{src:'1'}],
    onEndReached: jest.fn() 
}

test('should match snapShot', ()=>{
    const container = renderer.create(<Index />).toJSON();
    expect(container).toMatchSnapshot();
    
})

test('should render Text loading without Data', ()=>{
    const container = shallow(<Index />).props();
    expect(container.children.props.children).toEqual('loading...');
})

test('should render corouselItem component with Data', ()=>{
    const container = renderer.create(<Index {...mockData}/>).toJSON();
    const CarouselItem = container.children[0].children[0].children
    expect(CarouselItem).toHaveLength(mockData.data.length)
})
