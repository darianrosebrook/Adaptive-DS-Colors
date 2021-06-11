import {LitElement, html, css} from 'lit';
import styles from '../styles';
import '../components/button';
import '../components/contrastStop';
import '../components/gradientMap';

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
                .button-container {
                    display: flex;
                    justify-content: space-between;
                }
            `
        ];
    }
    static get properties() {
        return {
            ratios: {type: Array},
            colorResults: {type: Array}
        }
    }
    constructor() {
        super();
        this.ratios = [1.00];
        this.colorResults = ['#FFFFFF'];
    }
    render() {
        return html`
            <section>
                <div class="grid">
                    <div>
                        <div><h2>Contrast ratios</h2></div>
                        <div class="button-container">
                            <button-m title="Sort the ratios from small to large" context="SORT_RATIOS" ><svg-icon icon="sort"></svg-icon></button-m>
                            <button-m title="Distribute contrast equally against the next color" context="DISTRIBUTE_RATIOS" ><svg-icon icon="distribute"></svg-icon></button-m>
                            <button-m title="Add a new ratio to the list" context="ADD_RATIOS" ><svg-icon icon="add"></svg-icon></button-m>
                        </div>
                        
                        ${this.ratios.map((item, key) => {
                        return html`
                            <contrast-stop .contrastRatio=${{ratio: item, key: key}}></contrast-stop>
                    `
                    })} 
                        <button-m buttonText="Clear all" context="CLEAR_RATIOS" ><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                    <div>
                        <gradient-map 
                        .colors=${this.colorResults}
                        .ratios=${this.ratios}
                        ></gradient-map>
                    </div>
                
                </div>
            </section>`
    }
    
}
customElements.define('contrast-ratios', ContrastRatios);