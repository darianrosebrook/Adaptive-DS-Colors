import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/colorRampResults'
import '../components/icon'
class ColorRamp extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                div {
                    margin-bottom: .5rem;
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
                <div><h2>Color ramp</h2></div>
                <div>
                    <input type="text" placeholder="Color Ramp / Red" />
                </div>
                <div>
                    <color-results></color-results>
                </div>
                <div>
                    <button-m buttonText="Copy"></button-m>
                    <button-m buttonText="Test"></button-m>
                    <button-m buttonText="Set styles"></button-m>
                </div>
            </section>`
    }
} 
customElements.define('color-ramp', ColorRamp)