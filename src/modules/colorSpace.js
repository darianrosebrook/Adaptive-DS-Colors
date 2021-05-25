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
        }
    }

    constructor() {
        super();
    }
    render() {
        return html`
            <section>
                <div>
                    <h2>Color space</h2>
                </div>
                <select >
                    <option>CIECAM02</option>
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
} 
customElements.define('color-space', ColorSpace)