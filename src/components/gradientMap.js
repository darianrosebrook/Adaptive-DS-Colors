import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import './icon'
import styles from '../styles'

class GradientMap extends connect(store)(LitElement) {
  static get properties() {
    return {
      ratios: {type: Array},
      keyColors: {type: Array}
    }
  }
  constructor() {
    super();
    this.keyColors = ['#ffffff'];
    this.ratios = [];
  }
  stateChanged(state) {
      this.ratios = state.contrastStops;
      this.keyColors = state.keyColors;
    }
  render() {
      return html`
         <div class="gradient-map" style="background: linear-gradient(${this.keyColors.map((item, key) => this.keyColors.length <= 1? `#FFFFFF, ` : `${item}`)})">
         <div class="container">
         ${this.ratios.map((item, key) => {
            return html`
                <div class="contrast-stop" style="top: calc((${item - 1}/${this.ratios[this.ratios.length - 1]}) * 100%);"></div>
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
}
customElements.define('gradient-map', GradientMap)