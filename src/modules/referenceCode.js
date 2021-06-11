import {LitElement, html, css} from 'lit';
import styles from '../styles'

function clearSelection()
{
 if (window.getSelection) {window.getSelection().removeAllRanges();}
 else if (document.selection) {document.selection.empty();}
}
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
            referenceCode: {type: String}
        }
    }

    constructor() {
        super();
    }
    render() {
        return html`
            <section>
                <div> <h2>Reference code</h2></div>
                <div class="grid">
                    <input id="refCode" type="text" .value=${this.referenceCode} />
                    <button-m @click=${this._handleClick}>Copy</button-m>
                </div>             
            </section>`
    }
    _handleClick = () => {
        const refCode = this.shadowRoot.getElementById('refCode')
        refCode.focus();
        refCode.select();
        try {
            var successful = document.execCommand("copy");
            var msg = successful ? 'successful' : 'unsuccessful';
            clearSelection()
            } catch (err) {
            clearSelection()
            console.log(err);
            }
    }
} 
customElements.define('reference-code', ReferenceCode)