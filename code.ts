figma.showUI(__html__, { width: 500, height: 800 });
const postFigmaMessage = (type = '', payload = {}) =>
  figma.ui.postMessage({
    type,
    payload,
});

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}
function getContrastScores(contrast) {
  let largeText
  let normalText
  switch (true) {
    case contrast > 7:
      largeText = 'AAA'
      normalText = 'AAA'
      break
    case contrast >= 4.5:
      largeText = 'AAA'
      normalText = 'AA'
      break
    case contrast >= 3:
      largeText = 'AA'
      normalText = 'N/A'
      break
    default:
      largeText = 'N/A'
      normalText = 'N/A'
      break
  }
  return { largeText, normalText }
}
async function main() {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" })

  let styles = figma.getLocalPaintStyles().map((item, key) => {return {name: item.name}});

  function createNewText(characters) {
    const newTextNode = figma.createText()
    newTextNode.characters = characters
    return newTextNode 
  }
  

  function createFillStyles(entries) {
    let colorScheme;
    let name; 
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
    if (entries.colorScheme == '' || undefined) {
      colorScheme = "Neutral"
    } else {
      colorScheme = entries.colorScheme
    }
    entries.colors.map((item, key) => {
      let scores = getContrastScores(item.contrastRatio);
      let resultText = `${item.contrastRatio}:1\n(${scores.largeText}) Large text\n(${scores.normalText}) Normal text`;
    
        if (entries.colorStops[key] == '' || undefined) {
        name = (key + 1 )* 100
      } else {
        name = entries.colorStops[key]
      }
      const style = figma.createPaintStyle();
      style.name = `Color Ramp / ${colorScheme} / ${colorScheme} ${name}`
      style.description = `${colorScheme} ${name}\n${entries.colors[key].color }\n${resultText}`
      const solidPaint = {
        type: "SOLID",
        color: hexToRgb(item.color),
        opacity: 1
      };
      style.paints = [solidPaint];
    })

      figma.notify(`Set ${entries.colors.length} styles 🥳`)
  }

  function newColorRamp(entries, refCode) {
    let colorScheme;
    if (entries.colorScheme == '' || undefined) {
      colorScheme = "Neutral"
    } else {
      colorScheme = entries.colorScheme
    }
    let parent = figma.createFrame();parent.resize(256, 128);
    let parentProperties = {
      layoutMode: "VERTICAL",
      fills: [],
      itemSpacing: 16,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO',
      name: `Color Ramp / ${colorScheme}`
    }, containerProperties = {
      layoutMode: "VERTICAL",
      fills: [],
      itemSpacing: 8,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      primaryAxisSizingMode: 'AUTO',
      counterAxisSizingMode: 'AUTO'
    }, textContainerProperties = {
      layoutMode: "HORIZONTAL",
      primaryAxisSizingMode: 'FIXED',
      counterAxisSizingMode: 'AUTO',
      layoutAlign: "STRETCH",
      primaryAxisAlignItems: "SPACE_BETWEEN",
      fills:[] 
    }


    Object.keys(parentProperties).map((item, key) => {
      parent[item] = parentProperties[item];
    })

    let childrenToPush = [];
    let refContainer = figma.createFrame();
    Object.keys(containerProperties).map((item, key) => {
      refContainer[item] = containerProperties[item];
    });
    entries.colors.map((item, key) => {

      let container = figma.createFrame();
      let accessibilityContainer = figma.createFrame();
      let colorTextContainer = figma.createFrame();
      let textContainer = figma.createFrame();
      textContainer.resize(256,14)
      Object.keys(textContainerProperties).map(item => {
        textContainer[item] = textContainerProperties[item];
      })
      Object.keys(containerProperties).map((item, key) => {
        container[item] = containerProperties[item];
        accessibilityContainer[item] = containerProperties[item];
        colorTextContainer[item] = containerProperties[item];
      });
      let name; 
      if (entries.colorStops[key] == '' || undefined) {
        name = (key + 1 )* 100;
      } else {
        name = entries.colorStops[key];
      }

      let rect = figma.createRectangle();
      rect.resize(256, 128);
      rect.cornerRadius = 4;

      let hexCode = createNewText(item.color.toUpperCase());
      let colorName = createNewText(`${colorScheme} ${name}`);
      let accessibilityTitle = createNewText('Accessibility');
      let colorTitle = createNewText('Color');
      accessibilityTitle.fontSize = 10;
      colorTitle.fontSize = 10;
      colorName.fontSize = 16;
      let colorScores = getContrastScores(item.contrastRatio)
      let contrastRatioText = createNewText(`${item.contrastRatio}:1\n(${colorScores.largeText}) Large Text\n(${colorScores.normalText}) Small Text`)
      rect.name = `Color Ramp / ${colorScheme} / ${colorScheme} ${name}`;
      rect.fills = [{color: hexToRgb(item.color), type: 'SOLID'}];
      
      childrenToPush = [contrastRatioText,accessibilityTitle]
      childrenToPush.map(item => {
        accessibilityContainer.insertChild(0, item);
      })
      childrenToPush = [hexCode,colorTitle]
      childrenToPush.map(item => {
        colorTextContainer.insertChild(0, item);
      })
      childrenToPush = [accessibilityContainer,colorTextContainer]
      childrenToPush.map(item => {
        textContainer.insertChild(0, item);
      })
      childrenToPush = [textContainer, rect, colorName]
      childrenToPush.map(item => {
        container.insertChild(0, item);
      })
      
      parent.appendChild(container)
    })
    let referenceCode = createNewText(refCode);
    let referenceCodeTitle = createNewText('Reference Code');
    let testOnLeonardo = createNewText('View color ramp on LeonardoColor.io');
    referenceCodeTitle.fontSize = 14;
    testOnLeonardo.fontSize = 10;
    referenceCode.textAutoResize = "WIDTH_AND_HEIGHT";
    let hyperlinkText =  'https://leonardocolor.io/?' + refCode;
    testOnLeonardo.hyperlink = { type: 'URL', value: hyperlinkText}
    refContainer.layoutAlign = "STRETCH";
    referenceCode.layoutAlign = "STRETCH";
    referenceCode.fontSize = 10;
    childrenToPush = [testOnLeonardo, referenceCode, referenceCodeTitle]
    childrenToPush.map(item => {
      refContainer.insertChild(0, item);
    })
    parent.appendChild(refContainer);
    return parent;
  }

  figma.ui.onmessage = msg => {
    if (msg.detail.type === 'POST_MESSAGE') {
      figma.notify(msg.detail.message)
    }
    if (msg.detail.type === 'TEST_RAMP') {
      let ramp = newColorRamp(msg.detail.ramp, msg.detail.refCode);
      figma.currentPage.selection = [ramp];
      figma.viewport.scrollAndZoomIntoView([ramp]);
      figma.notify('Printing a color swatch 🧪')
    }
    if (msg.detail.type === 'SET_STYLES') {
      createFillStyles(msg.detail.ramp)
    }
    
  }

}
main();