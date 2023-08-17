"use client"
import ResponsiveReactGridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React from 'react'
import Card from './Card';


const GridLayout = ({data}) => {
    const layouts = {
        lg: [{i: 'a', x: 0, y: 0, w: 1, h: 2}],
        md: [{i: 'a', x: 0, y: 0, w: 1, h: 2}],
        // ... other breakpoints
      };
    
      return (
        <ResponsiveReactGridLayout
          className="layout"
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          layouts={layouts}
          width={window.innerWidth} // You might want to use a more sophisticated method to get width
        >
          <Card key="a">Item A</Card>
        </ResponsiveReactGridLayout>
      );
    };
export default GridLayout