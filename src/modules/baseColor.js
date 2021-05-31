import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import styles from '../styles'
import '../components/tooltipTrigger'
import '../components/colorSwatch.js'
class BaseColor extends connect(store)(LitElement) {
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
                <div> 
                    <h2>Base color</h2>
                </div>
                <div> 
                    <color-swatch .colorValue=${{color: "#FFFFFF", key: 0}}></color-swatch>
                </div>
            </section>`
    }
} 
customElements.define('base-color', BaseColor)