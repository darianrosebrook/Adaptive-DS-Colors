import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/colorSwatch.js'
import '../components/tooltipTrigger'
class keyColors extends LitElement {
    static get styles() {
        return [styles, css `
            color-swatch + color-swatch {
                margin-left: 16px;
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
        }
    }

    constructor() {
        super();
    }
    render() {
        return html`
            <section>
                <div class="grid">
                    <div><h2>Key colors</h2><tooltip-trigger></tooltip-trigger></div>
                    <div>
                        <button-m><svg-icon icon="add"></svg-icon></button-m>
                        <button-m><svg-icon icon="bulk"></svg-icon></button-m>
                        <button-m><svg-icon icon="code"></svg-icon></button-m>
                        <button-m><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                </div>
                <div> 
                    <color-swatch></color-swatch>
                    <color-swatch></color-swatch>
                </div>
            </section>`
    }
} 

customElements.define('key-colors', keyColors)