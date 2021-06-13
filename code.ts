figma.showUI(__html__, { width: 500, height: 800 });

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}
function rgb2hsl(obj){  
  let r = obj.r,
      g = obj.g,
      b = obj.b;

  let cmin = Math.min(r,g,b),
  cmax = Math.max(r,g,b),
  delta = cmax - cmin,
  h = 0,
  s = 0,
  l = 0;
  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  if (h < 0)
      h += 360;

  l = (cmax + cmin) / 2;

  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + Math.round(h) + ", " + Math.round(s) + "%, " + Math.round(l) + "%)";
}
function getContrastScores(contrast) {
  let largeText
  let smallText
  switch (true) {
    case contrast > 7:
      largeText = 'AAA'
      smallText = 'AAA'
      break
    case contrast >= 4.5:
      largeText = 'AAA'
      smallText = 'AA'
      break
    case contrast >= 3:
      largeText = 'AA'
      smallText = 'N/A'
      break
    default:
      largeText = 'N/A'
      smallText = 'N/A'
      break
  }
  return { largeText, smallText }
}
function defineColorScheme(entry) {
  if (entry == '' || undefined) {
    return "Neutral"
  } else {
    return entry
  }
}
const addPropertiesToContainer = (properties, container) => {
  Object.keys(properties).map((item, key) => {
    container[item] = properties[item];
  })
}
 
async function main() {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" })

  function createNewText(characters) {
    const newTextNode = figma.createText()
    newTextNode.characters = characters
    return newTextNode 
  }

  function createFillStyles(entries) {
    
    let styles = figma.getLocalPaintStyles();

    let colorScheme = defineColorScheme(entries.colorScheme.trim());
    let styleName; 

    entries.colors.map((item, key) => {

      let scores = getContrastScores(item.contrastRatio);
      let resultText = `${item.contrastRatio}:1\n(${scores.largeText}) Large text\n(${scores.smallText}) Normal text`;
      
      if (entries.colorStops[key] == '' || undefined) {
        styleName = `${colorScheme} / ${colorScheme} ${(key + 1 )* 100}` 
      } else {
        styleName = `${colorScheme} / ${colorScheme} ${entries.colorStops[key].trim()}` 
      }

      let style;
      const result = styles.find( ({ name }) => name === 'Color Ramp / ' + styleName );
      if (result) {
        style = result;
      } else {
        style = figma.createPaintStyle();
        style.name = 'Color Ramp / ' + styleName;
      }

      style.description = `${styleName}\n${entries.colors[key].color }\n${resultText}`
      const solidPaint = {
        type: "SOLID",
        color: hexToRgb(item.color),
        opacity: 1
      };
      style.paints = [solidPaint];
    })
      figma.notify(`Set ${entries.colors.length} style`+ `${entries.colors.length > 1 ? 's' : ''} 🥳`)
  }

  function newColorRamp(entries, refCode) {
    let colorScheme = defineColorScheme(entries.colorScheme.trim());
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

    let childrenToPush = [];
    let refContainer = figma.createFrame();

    addPropertiesToContainer(parentProperties, parent);
    addPropertiesToContainer(containerProperties, refContainer);

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

      let hexCode = createNewText(`${item.color.toUpperCase()}\n${rgb2hsl(hexToRgb(item.color))}`);
      let colorName = createNewText(`${colorScheme} ${name}`);
      let accessibilityTitle = createNewText('Accessibility');
      let colorTitle = createNewText('Color');
      accessibilityTitle.fontSize = 10;
      colorTitle.fontSize = 10;
      colorName.fontSize = 16;
      let colorScores = getContrastScores(item.contrastRatio)
      let contrastRatioText = createNewText(`${item.contrastRatio}:1\n(${colorScores.largeText}) Large Text\n(${colorScores.smallText}) Small Text`)
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
    referenceCodeTitle.fontSize = 14;
    referenceCode.textAutoResize = "WIDTH_AND_HEIGHT";

    let testOnLeonardo = createNewText('View color ramp on LeonardoColor.io');
    testOnLeonardo.fontSize = 10;
    let hyperlinkText =  'https://leonardocolor.io/?' + refCode;
    testOnLeonardo.hyperlink = { type: 'URL', value: hyperlinkText}

    refContainer.layoutAlign = "STRETCH";
    referenceCode.layoutAlign = "STRETCH";
    referenceCode.fontSize = 10;

    childrenToPush = [testOnLeonardo, referenceCode, referenceCodeTitle];
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
      figma.notify('🧪 Printing a color swatch')
    }
    if (msg.detail.type === 'SET_STYLES') {
      createFillStyles(msg.detail.ramp)
    }
    
  }

}
main();