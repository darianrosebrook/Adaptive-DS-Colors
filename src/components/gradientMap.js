import {LitElement, html, css} from 'lit';
import './icon'
import styles from '../styles'

class GradientMap extends LitElement {
  static get properties() {
    return {
      ratios: {type: Array},
      sortedColors: {type: Array},
      colors: {type: Array}
    }
  }
  constructor() {
    super();
    this.colors = ['#ffffff'];
    this.ratios = [];
    this.sortedRatios = [];
    this.sortedColors = [];
  }
  render() {
      return html`
         <div class="gradient-map" 
              .style="background: linear-gradient(
                #FFFFFF,
                ${this._sortColors()},
                #000000
              )"
         >
         <div class="container">
         ${this.ratios.sort(function(a, b){return a-b}).map((item, key) => {
            return html`
                <div class="contrast-stop" .style="top: calc(((${item}/${this.ratios[this.ratios.length - 1]}) * 100%) - 12px);"></div>
          `
          })} </div>
         </div>
          `
  }
  static get styles() {
      return [styles, css`
          :host {
              display: inline;
          }
          .gradient-map {
            margin-top: 5.5rem;
            position: relative;
            padding: 1rem 0;
            width: 100%;
            height: calc(100% - 9rem);
            border: 1px solid var(--df-dark-neutral-dark);
            border-radius: .25rem;
          }
          .contrast-stop {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 12px;
            height: 12px;
            border: 1px solid var(--foreground);
            border-radius: 100%;
            background: var(--background);
          }
          .container {
            position: relative;
            display: block;
            height: 100%;
          }
      
      `];
  }
  _sortColors = () => {
    let newColors = [];
    for (let i = 0; i < this.colors.length; i++) {
      newColors[i] = this.colors[i].color
    }
    this.sortedColors = newColors
    return this.sortedColors.join()
  }
}
customElements.define('gradient-map', GradientMap)