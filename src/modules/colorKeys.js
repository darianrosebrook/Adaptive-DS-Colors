import {LitElement, html, css} from 'lit';
import styles from '../styles';
import '../components/colorSwatch.js';


class colorKeys extends LitElement {
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
            colorKeys: {type: Array},
            modal: {type: String},
            value: {type: String}
        }
    }
    constructor() {
        super();
        this.colorKeys = ['#ffffff'];
    }
    render() {
        return html`
            <section>
                <div class="grid">
                    <div><h2>Key colors</h2></div>
                    <div>
                        <button-m title="Add a new key color" context="ADD_KEY_COLOR" ><svg-icon icon="add"></svg-icon></button-m>
                        <!-- <button-m @click=${e => this._handleClick(e, "BULK_KEY_COLOR")} ><svg-icon icon="bulk"></svg-icon></button-m> -->
                        <button-m title="Restore a session from a reference code" @click=${e => this._handleClick(e, "CODE_KEY_COLORS")} ><svg-icon icon="code"></svg-icon></button-m>
                        <button-m title="Clear all key colors" context="CLEAR_KEY_COLORS" ><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                </div>
                <div class="colorGrid">
                    ${this.colorKeys.map((item, key) => {
                        return key === 0 ? html`
                        <div class='color-container'> 
                            <color-swatch .colorValue="${{color: this.colorKeys[key], key}}" ></color-swatch>
                        </div>
                    ` : html`
                        <div class='color-container'> 
                            <color-swatch .colorValue="${{color: this.colorKeys[key], key}}" ></color-swatch>
                            <button-m context="REMOVE_KEY_COLOR" key=${key}><svg-icon icon="clear"></svg-icon></button-m>
                        </div>
                    `
                    })} 
                </div> 
                ${this.modal ? html`
                    <div class="modal" >
                        ${this.modal === 'ADD_BULK' ? html`<h6>Add bulk colors</h6><p>Add HEX colors separated by a comma or new line</p>` :
                                        this.modal !== null ?  html`<h6>Set colors from a reference code</h6><p>Restore a previous session using its reference code</p>` : null}
                        <textarea @input=${this._handleChange} id=${this.modal}></textarea>
                        <button-m @click=${e => this._handleClick(e, 'CANCEL')}>Cancel</button-m>
                        ${this.value ? 
                            html`<button-m @click=${e => this._handleClick(e, 'ADD')}  >Set colors</button-m>`  
                        : html`<button-m @click=${e => this._handleClick(e, 'ADD')} .disabledButton=${true}>Set colors</button-m>` 
                        } 
                    </div>`
                : null}
                
            </section>`
    }
    _handleChange = (e) => {
        this.value = e.target.value;
    }
    _handleClick = (e, type) => {
        switch (type) {
            case 'BULK_KEY_COLOR':
                this.modal = 'ADD_BULK';
                break;
            case 'CODE_KEY_COLORS':
                this.modal = 'CODE_KEY_COLORS';
                break
            case 'CANCEL':
                this._closeModal();
                break
            case 'ADD':
                this._addColors();
                break
            default:
                break;
        }
    }
    _addColors = () => {
        if (this.value ){
            const event = new CustomEvent('addColorsToKeys', {
                bubbles: true,
                composed: true,
                detail: {type: this.modal, value: this.value, key: this.key}
              });
    
            this.dispatchEvent(event);
            this._closeModal();
        } else {
            parent.postMessage({pluginMessage: {detail: {message: '⚠️ Please fill out the text area before submitting', type: 'POST_MESSAGE'} }}, '*')
        }
        
    }
    _closeModal = () => {this.value = null;this.modal = null; }
} 

customElements.define('key-colors', colorKeys)