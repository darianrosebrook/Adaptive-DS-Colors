import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/tooltipTrigger'
function paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }
// const urlParams = new URLSearchParams('abc=foo&def=%5Basf%5D&xyz=5');
// const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
// const params = paramsToObject(entries); //{abc:"foo",def:"[asf]",xyz:"5"}
// let obj = Object.fromEntries(new URLSearchParams(str));
class ReferenceCode extends LitElement {
    static get styles() {
        return [styles, css`
            div {
                margin-bottom: .5rem;
            }
            .grid {
                grid-template-columns: 5fr 1fr;
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
                <div> <h2>Reference code</h2><tooltip-trigger></tooltip-trigger></div>
                <div class="grid">
                    <input type="text" .value=${this.referenceCode} disabled />
                    <button-m context="COPY_BUTTON">Copy</button-m>
                </div>                
            </section>`
    }
} 
customElements.define('reference-code', ReferenceCode)