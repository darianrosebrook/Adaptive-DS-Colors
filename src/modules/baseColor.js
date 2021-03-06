import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import styles from '../styles'
import '../components/colorSwatch.js'
class BaseColor extends connect(store)(LitElement) {
    static get styles() {
        return [
            styles,
            css`div {margin-bottom: .5rem;}`
        ];
    }
    static get properties() {
        return {baseColor: {type: String}}
    }
    constructor() {
        super();
        this.baseColor = '#ffffff';
    }
    render() {
        return html`
            <section>
                <div> 
                    <h2>Background color</h2>
                </div>
                <div> 
                    <color-swatch .colorValue=${{color: this.baseColor, key: 0}}></color-swatch>
                </div>
            </section>`
    }
} 
customElements.define('base-color', BaseColor)