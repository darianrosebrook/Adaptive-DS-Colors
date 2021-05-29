import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import { contrastRatioActions } from '../redux/actions';
import styles from '../styles'
import '../components/button'
import '../components/contrastStop'
import '../components/tooltipTrigger'
import '../components/gradientMap'

class ContrastRatios extends connect(store)(LitElement) {
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
            keyColors: {type: Array}
        }
    }
    constructor() {
        super();
        this.keyColors = ['#ffffff'];
        this.ratios = [1.00];
    }
    stateChanged(state) {
        this.keyColors = state.keyColors;
        this.ratios = [...state.contrastStops];
      }
    render() {
        return html`
            <section>
                <div class="grid">
                    <div>
                        <div><h2>Contrast Ratios</h2><tooltip-trigger></tooltip-trigger></div>
                        <div class="button-container">
                            <button-m data-event="SORT" @click=${this._handleClick}><svg-icon icon="sort"></svg-icon></button-m>
                            <button-m data-event="DISTRIBUTE" @click=${this._handleClick}><svg-icon icon="distribute"></svg-icon></button-m>
                            <button-m data-event="ADD" @click=${this._handleClick}><svg-icon icon="add"></svg-icon></button-m>
                        </div>
                        
                        ${this.ratios.map((item, key) => {
                        return html`
                            <contrast-stop .contrastRatio=${{ratio: item, key}}></contrast-stop>
                    `
                    })} 
                        <button-m buttonText="Clear all" data-event="CLEAR" @click=${this._handleClick}><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                    <div>
                        <gradient-map></gradient-map>
                    </div>
                
                </div>
            </section>`
    }
    _handleClick = (e) => {
        let target;
        e.target.parentElement.tagName === "BUTTON-M" ?
            target = e.target.parentElement :
            target = e.target;
        this._executeAction(target.dataset.event)
    }
    _executeAction = action => {
        switch (action) {
            case 'ADD':
                store.dispatch(
                    contrastRatioActions.addNewStop(
                        this.ratios.length + 1
                    )
                )
                break;
            case 'SORT':
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        this.ratios.sort(function(a, b){return a-b})
                        )
                )
                break;
            case 'DISTRIBUTE':
                let sorted = this.ratios.sort(function(a, b){return a-b});
                function makeArr(startValue, stopValue, cardinality) {
                    var arr = [];
                    var step = (stopValue - startValue) / (cardinality - 1);
                    for (var i = 0; i < cardinality; i++) {
                      arr.push(parseFloat((startValue + (step * i)).toFixed(2)))
                    }
                    return arr;
                  }
                
                store.dispatch(
                    contrastRatioActions.updateRatios(
                        makeArr(sorted[0], sorted[sorted.length - 1], sorted.length)
                        )
                )
                break;
            case 'CLEAR':
                store.dispatch(
                    contrastRatioActions.clearContrastStops(1)
                )
            default:
                break;
        }
    }
}
customElements.define('contrast-ratios', ContrastRatios);