import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/button'
import '../components/contrastStop'
import '../components/tooltipTrigger'
import '../components/gradientMap'
class ContrastRatios extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                div {
                    margin-bottom: .5rem;
                }
                .grid {
                    grid-template-columns: 2fr 1fr;
                }
            `
        ];
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
                    <div>
                        <div><h2>Contrast Ratios</h2><tooltip-trigger></tooltip-trigger></div>
                        <div>
                            <button-m><svg-icon icon="sort"></svg-icon></button-m>
                            <button-m><svg-icon icon="distribute"></svg-icon></button-m>
                            <button-m><svg-icon icon="add"></svg-icon></button-m>
                        </div>
                        
                        <contrast-stop></contrast-stop>
                        <contrast-stop></contrast-stop>
                        <contrast-stop></contrast-stop>
                        <contrast-stop></contrast-stop>
                        <contrast-stop></contrast-stop>
                        <button-m buttonText="Clear all"><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                    <div>
                        <gradient-map></gradient-map>
                    </div>
                
                </div>
            </section>`
    }
}
customElements.define('contrast-ratios', ContrastRatios);