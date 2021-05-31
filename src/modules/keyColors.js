import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/colorSwatch.js'
import '../components/tooltipTrigger'


class keyColors extends LitElement {
    static get styles() {
        return [styles, css `
            color-swatch {
                margin-right: 1rem;
                margin-bottom: .5rem;
            }
            .grid {
                 grid-template-columns: 1fr auto;
            }
            div {
                margin-bottom: .5rem;
            }
        `];
    }
    static get properties() {
        return {
            keyColors: {type: Array}
        }
    }
    constructor() {
        super();
        this.keyColors = ['#ffffff'];
    }
    render() {
        return html`
            <section>
                <div class="grid">
                    <div><h2>Key colors</h2><tooltip-trigger></tooltip-trigger></div>
                    <div>
                        <button-m context="ADD_KEY_COLOR" ><svg-icon icon="add"></svg-icon></button-m>
                        <button-m context="BULK_KEY_COLOR" ><svg-icon icon="bulk"></svg-icon></button-m>
                        <button-m context="CODE_KEY_COLORS" ><svg-icon icon="code"></svg-icon></button-m>
                        <button-m context="CLEAR_KEY_COLORS" ><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                </div>
                <div class="colorGrid">
                    ${this.keyColors.map((item, key) => {
                        return html`
                            <color-swatch .colorValue="${{color: this.keyColors[key], key}}" ></color-swatch>
                    `
                    })} 
                </div>
            </section>`
    }
} 

customElements.define('key-colors', keyColors)