import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/colorRampResults'
import '../components/tooltipTrigger'
import '../components/icon'
class ColorRamp extends LitElement{
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
            ratios: {type: Array},
            colorResults: [
                {
                    colorStop: {type: String},
                    contrastDisplay: {type: String},
                    contrastRatio: {type: Number},
                    color: {type: String},
                }
            ]
        }
    }
    constructor() {
        super();
        this.ratios = [1.00];
        this.colorResults = [
            {
                colorStop: '100',
                contrastRatio: 1.00,
                color: '#FFFFFF',
                contrastDisplay: '#000000'
            }
        ]
    }
    render() {
        return html`
            <section>
                
            <div><h2>Color ramp</h2></div>
                <div>
                    <input @change=${this._handleChange} type="text" placeholder="Name your color" />
                </div>
                <div>
                    <color-results  .ratios=${this.ratios} .colorResults=${this.colorResults} ></color-results>
                </div>
                <div>
                    <button-m buttonText="Copy"></button-m>
                    <button-m context="TEST_RAMP" buttonText="Test"></button-m>
                    <button-m context="SET_STYLES" buttonText="Set styles"></button-m>
                </div>
            </section>`
    }
    _handleChange = (e) => {
       
        const event = new CustomEvent('colorThemeChange', {
            bubbles: true,
            composed: true,
            detail: {value: e.target.value, key: null}
          });
        this.dispatchEvent(event);
    }
    
} 
customElements.define('color-ramp', ColorRamp)