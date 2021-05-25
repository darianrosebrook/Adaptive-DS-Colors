import {LitElement, html, css} from 'lit';
import './icon'
import styles from '../styles'

class GradientMap extends LitElement {
  static get styles() {
      return [styles, css`
          :host {
              display: inline;
          }
          .gradient-map {
            margin-top: 5.5rem;
            position: relative;
            width: 100%;
            height: calc(100% - 9rem);
            border: 1px solid var(--df-dark-neutral-dark);
            border-radius: .25rem;
            background: linear-gradient(#FFEAE5, #CA1614, #CA1614);
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
      
      `];
  }
  render() {
      return html`
         <div class="gradient-map">
           <div class="contrast-stop" style="top: calc((1.11/5.55) * 90%);"></div>
           <div class="contrast-stop" style="top: calc((2.22/5.55) * 90%);"></div>
           <div class="contrast-stop" style="top: calc((3.33/5.55) * 90%);"></div>
           <div class="contrast-stop" style="top: calc((4.5/5.55) * 90%);"></div>
           <div class="contrast-stop" style="top: calc((5.55/5.55) * 90%);"></div>
         </div>
          `
  }
}
customElements.define('gradient-map', GradientMap)