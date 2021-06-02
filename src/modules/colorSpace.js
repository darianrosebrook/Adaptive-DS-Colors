import {LitElement, html, css} from 'lit';
import styles from '../styles'
class ColorSpace extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                div { margin-bottom: .5rem;}
                select {
                    width: auto;
                    cursor: pointer;
                }
            `
        ];
    }
    static get properties() {
        return {
            colorSpace: {type: String}
        }
    }

    constructor() {
        super();
        this.colorSpace = ''
    }
    render() {
        return html`
            <section>
                <div>
                    <h2>Color space</h2>
                </div>
                <select @change=${this._handleChange}>
                    <option value="CAM02">CIECAM02</option>
                    <option>LCH</option>
                    <option>LAB</option>
                    <option>HSL</option>
                    <option>HSLuv</option>
                    <option>RGB</option>
                    <option>HSV</option>
                    <option>HEX</option>
                </select>
            </section>`
    }
    _handleChange = (e) => {
        console.log(e.target.value);
        const event = new CustomEvent('handleInputChange', {
            bubbles: true,
            composed: true,
            detail: e.target.value
          });
          this.dispatchEvent(event);
    }
} 
customElements.define('color-space', ColorSpace)