import {LitElement, html, css} from 'lit';
import { contrastRatioActions } from '../redux/actions';
import styles from '../styles'
import '../components/button'
class ContrastStop extends LitElement {
    render() {
        return html`
            <div class='grid'>
                <input @change=${this._handleChange} type="number" placeholder="4.5" step='.01' min="1" max='21' .value="${this.contrastRatio.ratio}" />
                <button-m title="Remove this contrast stop" context="REMOVE_RATIO" key=${this.contrastRatio.key}><svg-icon icon="clear"></svg-icon></button-m>
            </div>
        `
    }
    static get styles() {
        return [
            styles,
            css`
                input {
                    width: 6.75rem;
                }
                .grid {
                    grid-template-columns: auto 1fr;
                    margin-bottom: .5rem;
                }
            `
        ];
    }
    static get properties() {
        return {
            contrastRatio: {
                ratio: {type: Number},
                key: {type: Number}
            }
        }
    }
    constructor() {
        super();
        this.contrastRatio = {ratio: 1, key: 0}
    }
    _handleChange = (e) => {
        let el = e.target;
        if(el.type == "number" && el.max && el.min ){
            let value = parseFloat(el.value).toFixed(2)
            el.value = value // for 000 like input cleanup to 0
            let max = parseInt(el.max)
            let min = parseInt(el.min)
            if ( value > max ) el.value = el.max
            if ( value < min ) el.value = el.min
        }
        this.contrastRatio = {...this.contrastRatio, ratio: e.target.valueAsNumber}

        const event = new CustomEvent('handleInputChange', {
            bubbles: true,
            composed: true,
            detail: {value: this.contrastRatio.ratio, key: this.contrastRatio.key}
          });
        this.dispatchEvent(event);
    }

}
customElements.define('contrast-stop', ContrastStop)