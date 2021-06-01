figma.showUI(__html__, { width: 500, height: 800 });
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}
let childRectProperties = {
  width: 200,
  height: 100,
}

function newColorRamp(entries) {
  let parent = figma.createFrame();
  let parentProperties = {
    layoutMode: "VERTICAL",
    itemSpacing: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    name: entries.detail.ramp.colorScheme
  }

  Object.keys(parentProperties).map((item, key) => {
    parent[item] = parentProperties[item];
  })
  let children = [];
    entries.detail.ramp.colors.map((item, key) => {
      let rect = figma.createRectangle();
      rect.name = `${entries.detail.ramp.colorScheme} ${item.colorStop}`
      rect.fills = [{color: hexToRgb(item.color), type: 'SOLID'}]
      parent.insertChild(key, rect)
    })
  return parent;
}
figma.ui.onmessage = msg => {
  console.log(msg);
  if (msg.detail.type === 'TEST_RAMP') {
    let ramp = newColorRamp(msg);
    figma.currentPage.selection = [ramp];
    figma.viewport.scrollAndZoomIntoView([ramp]);
    figma.notify('got the test prompt')
  }
}