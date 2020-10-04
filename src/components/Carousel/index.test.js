import 'react-native';
import React from 'react';
import Index from './index';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

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

test('should render component with Data', ()=>{
    const container = renderer.create(<Index {...mockData}/>).toJSON();
    expect(container).toMatchSnapshot()
    expect(container.children[1].children.length).toEqual(10);
})

test('should render Image', ()=>{
    const container = shallow(<Index {...mockData}/>).props();
    console.log('In final res',container)
    expect(container.find('img').length).toEqual(1);
})
