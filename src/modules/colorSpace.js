import {LitElement, html, css} from 'lit';
import styles from '../styles';
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
            colorSpace: {type: String},
            options: [{type: Object}],
            selected: {type: String}
        }
    }

    constructor() {
        super();
        this.options = [{value: 'CAM02', text: 'CIECAM02'},{value: 'LCH'},{value: 'LAB'},{value: 'HSL'},{value: 'HSLuv'},{value: 'RGB'},{value: 'HSV'}];
        this.colorSpace = 'CAM02';
    }
    render() {
        return html`
            <section>
                <div>
                    <h2>Color space</h2>
                </div>
                <select @change=${this._handleChange}>
                    ${this.options.map(option => html`
                        <option value=${option.value} ?selected=${this.colorSpace === option.value}>${option.text ? option.text : option.value}</option>
                    `)}
                </select>
            </section>`
    }
    _handleChange = (e) => {
        const event = new CustomEvent('handleInputChange', {
            bubbles: true,
            composed: true,
            detail: e.target.value
          });
          this.dispatchEvent(event);
    }
} 
customElements.define('color-space', ColorSpace)