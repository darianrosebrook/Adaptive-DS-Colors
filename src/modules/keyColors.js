import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/colorSwatch.js'
import '../components/tooltipTrigger'


class keyColors extends LitElement {
    static get styles() {
        return [styles, css `
            section {
                position: relative;
            }
            .modal {
                position: absolute;
                top: 20%;
                right: 50%;
                transform: translate(50%, 20%);
                width: 75%;
                background: var(--background);
                padding: 1rem;
                border-radius: .25rem;
                z-index: 10;
                --depth: var(--depth-4);
                --elevation:
                    0px calc(var(--depth, 8) * 0.25px) calc(var(--depth, 8) * 0.75px) rgba(17, 17, 17, 0.08), 
                    0px calc(var(--depth, 8) * 0.125px) calc(var(--depth, 8) * 0.25px) rgba(17, 17, 17, 0.04);
                box-shadow: var(--elevation);
            }
            textarea {
                margin-bottom: 1rem;
                height: 10rem;
                resize: none;
            }
            .color-container {
                position: relative;
                display: inline-block;
                margin-right: 1rem;
                margin-bottom: .5rem;
            }
            .color-container button-m {
                position: absolute;
                opacity: 0;
                right: .001rem;
                transition: all ease .3s;
            }
            .color-container:hover button-m{
                position: relative;
                display: inline;
                opacity: 1;
                right: 0;
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
            keyColors: {type: Array},
            modal: {type: String},
            value: {type: String}
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
                    <div><h2>Key colors</h2></div>
                    <div>
                        <button-m title="Add a new key color" context="ADD_KEY_COLOR" ><svg-icon icon="add"></svg-icon></button-m>
                        <!-- <button-m @click=${e => this._handleClick(e, "BULK_KEY_COLOR")} ><svg-icon icon="bulk"></svg-icon></button-m> -->
                        <button-m @click=${e => this._handleClick(e, "CODE_KEY_COLORS")} ><svg-icon icon="code"></svg-icon></button-m>
                        <button-m title="Clear all key colors" context="CLEAR_KEY_COLORS" ><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                </div>
                <div class="colorGrid">
                    ${this.keyColors.map((item, key) => {
                        return key === 0 ? html`
                        <div class='color-container'> 
                            <color-swatch .colorValue="${{color: this.keyColors[key], key}}" ></color-swatch>
                        </div>
                    ` : html`
                        <div class='color-container'> 
                            <color-swatch .colorValue="${{color: this.keyColors[key], key}}" ></color-swatch>
                            <button-m context="REMOVE_KEY_COLOR" key=${key}><svg-icon icon="clear"></svg-icon></button-m>
                        </div>
                    `
                    })} 
                </div> 
                ${this.modal ? html`<div class="modal" >
                    ${this.modal === 'ADD_BULK' ? html`<h6>Add bulk colors</h6><p>Add HEX colors separated by a comma or new line</p>` :
                                    this.modal !== null ?  html`<h6>Add a reference code</h6><p>Add a reference code from a previous session</p>` : null}
                    <textarea @change=${this._handleChange} id=${this.modal}></textarea>
                    <button-m @click=${e => this._handleClick(e, 'CANCEL')}>Cancel</button-m>
                    <button-m @click=${e => this._handleClick(e, 'ADD')}>Add</button-m>

                </div> ` : null}
                
            </section>`
    }
    _handleChange = (e) => {
        this.value = e.target.value;
    }
    _handleClick = (e, type) => {
        type === 'BULK_KEY_COLOR' ? this.modal = 'ADD_BULK' : 
        type === 'CODE_KEY_COLORS' ? this.modal = 'CODE_KEY_COLORS' : 
        type === 'CANCEL' ? (this.modal = null) : 
        type === 'ADD' ? this._addColors() : 
        null
    }
    _addColors = () => {
        const event = new CustomEvent('addColorsToKeys', {
            bubbles: true,
            composed: true,
            detail: {type: this.modal, value: this.value, key: this.key}
          });

        this.dispatchEvent(event);
    }
} 

customElements.define('key-colors', keyColors)