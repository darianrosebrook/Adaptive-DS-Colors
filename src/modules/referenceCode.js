import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/tooltipTrigger'
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
                    <input type="text" placeholder='colorKeys: ["#6fa7ff"], base: "#ffffff", ratios: [3,4.5],' />
                    <button-m>Copy</button-m>
                </div>                
            </section>`
    }
} 
customElements.define('reference-code', ReferenceCode)