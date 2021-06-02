figma.showUI(__html__, { width: 500, height: 800 });

const postMessage = (type = '', payload = {}) =>
  figma.ui.postMessage({
    type,
    payload,
});

// let getState = async () => {
//   let storedState;
//   try {
//     storedState = await figma.clientStorage.getAsync('STATE');
    
//   } catch (e) {
//     console.error('State retrieving error', e)
//   }
  // console.log(
  //   storedState
  // );  
  // figma.ui.postMessage(storedState);
// }
// getState()
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
  }

  function createFillStyles(entries) {
    let styles = figma.getLocalPaintStyles();
    // if (styles.length > 0) {
    //  styles.forEach(style => {
    //    console.log(style.name);
    //    for (let i = 0; i < entries.colors.length; i++) {
    //     if (style.name == `Color Ramp / ${colorScheme} / ${colorScheme} ${entries.colorStop[i]}`) {
    //       console.log('it matches');
    //       const solidPaint = {
    //         type: "SOLID",
    //         color: hexToRgb(entries.colors[i].color),
    //         opacity: 1
    //       };
    //       style.paints = [solidPaint];
    //     }
    //    }
       
    //  })
    // }
    let colorScheme;
    let name; 
    if (entries.colorScheme == '' || undefined) {
      colorScheme = "Neutral"
    } else {
      colorScheme = entries.colorScheme
    }
    entries.colors.map((item, key) => {
   
       if (entries.colorStops[key] == '' || undefined) {
        name = (key + 1 )* 100
      } else {
        name = entries.colorStops[key]
      }
      const style = figma.createPaintStyle();
      style.name = `Color Ramp / ${colorScheme} / ${colorScheme} ${name}`
      const solidPaint = {
        type: "SOLID",
        color: hexToRgb(item.color),
        opacity: 1
      };
      style.paints = [solidPaint];
    })

  }
  function newColorRamp(entries) {
    let colorScheme ;
    if (entries.colorScheme == '' || undefined) {
      colorScheme = "Neutral"
    } else {
      colorScheme = entries.colorScheme
    }
    let parent = figma.createFrame();
    let parentProperties = {
      layoutMode: "VERTICAL",
      itemSpacing: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      name: `Color Ramp / ${colorScheme}`
    }

    Object.keys(parentProperties).map((item, key) => {
      parent[item] = parentProperties[item];
    })
    let children = [];
    entries.colors.map((item, key) => {
      let rect = figma.createRectangle();
      let name; 
      if (entries.colorStops[key] == '' || undefined) {
        name = (key + 1 )* 100
      } else {
        name = entries.colorStops[key]
      }

      rect.name = `Color Ramp / ${colorScheme} / ${colorScheme} ${name}`
      rect.fills = [{color: hexToRgb(item.color), type: 'SOLID'}]
      parent.insertChild(key, rect)
    })
    return parent;
  }


  
figma.ui.onmessage = async msg => {
    if (msg.detail.type === 'TEST_RAMP') {
      let ramp = newColorRamp(msg.detail.ramp);
      figma.currentPage.selection = [ramp];
      figma.viewport.scrollAndZoomIntoView([ramp]);
      figma.notify('Printing a color swatch 🧪')
    }
    if (msg.detail.type === 'SET_STYLES') {
      createFillStyles(msg.detail.ramp)
      // figma.notify(`Set ${'# of styles'} styles 🥳`)
    }
    if (msg.detail.type === 'SET_STATE') {
      try {
        figma.clientStorage.setAsync('STATE', msg.detail.state)
      } catch (error) {
        console.log(error, 'Could not set state');
      } 
    
    }
}