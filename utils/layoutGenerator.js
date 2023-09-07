export const generateLayouts = (numItems, cols=2)=> {
    const layouts = [];
    for (let i = 0; i < numItems; i++) {
        let y =  Math.ceil(Math.random() * 4) + 1
        let x = i%cols
      layouts.push({
        i: i.toString(),   // Unique ID for each item
        x: x, // Place items in a 2-column width, wrapping every 12 columns
        y: Math.floor(i / cols) * y, // Move to the next row every 6 items
        w: 1,           // Each item has a width of 2 columns
        h: cols===2?2:3,           // Each item has a height of 2 rows
        static: false,
        minH:2
      });
    }
    return layouts;
  }
  