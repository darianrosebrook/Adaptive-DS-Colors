import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import { keyColorActions } from '../redux/actions';
import styles from '../styles'
import '../components/colorSwatch.js'
import '../components/tooltipTrigger'


class keyColors extends connect(store)(LitElement) {
    static get styles() {
        return [styles, css `
            color-swatch {
                margin-right: 1rem;
                margin-bottom: .5rem;
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
            keyColors: {type: Array}
        }
    }
    constructor() {
        super();
        this.keyColors = ['#ffffff'];
    }
    stateChanged(state) {
        this.keyColors = state.keyColors;
      }
    render() {
        return html`
            <section>
                <div class="grid">
                    <div><h2>Key colors</h2><tooltip-trigger></tooltip-trigger></div>
                    <div>
                        <button-m data-event="ADD" @click=${this._handleClick}><svg-icon icon="add"></svg-icon></button-m>
                        <button-m data-event="BULK" @click=${this._handleClick}><svg-icon icon="bulk"></svg-icon></button-m>
                        <button-m data-event="CODE" @click=${this._handleClick}><svg-icon icon="code"></svg-icon></button-m>
                        <button-m data-event="CLEAR" @click=${this._handleClick}><svg-icon icon="clear"></svg-icon></button-m>
                    </div>
                </div>
                <div class="colorGrid">
                    ${this.keyColors.map((item, key) => {
                        return html`
                            <color-swatch .colorValue="${{color: item, key}}"></color-swatch>
                    `
                    })} 
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
                    keyColorActions.addNewColor(
                        this.keyColors[this.keyColors.length - 1],

                    )
                )
                break;
            case 'BULK':
                console.log('Execute BULK');
                break;
            case 'CODE':
                console.log('Execute CODE');
                break;
            case 'CLEAR':
                store.dispatch(
                    keyColorActions.clearKeyColors('#ffffff')
                )
            default:
                break;
        }
    }
    
} 

customElements.define('key-colors', keyColors)