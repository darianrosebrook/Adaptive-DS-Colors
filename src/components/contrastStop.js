import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import { contrastRatioActions } from '../redux/actions';
import styles from '../styles'
import '../components/button'
class ContrastStop extends connect(store)(LitElement) {
    render() {
        return html`
            <div class='grid'>
                <input @change=${this._handleChange} type="text" placeholder="4.5" value="${this.contrastRatio.ratio}" />
                <button-m @click=${this._handleRemove} ><svg-icon icon="clear"></svg-icon></button-m>
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
                ratio: {type: String},
                key: {type: Number}
            }
        }
    }
    constructor() {
        super();
        this.contrastRatio = {ratio: 1, key: 0}
    }

    stateChanged(state) {
        this.contrastRatio.ratio = state.contrastStops[this.contrastRatio.key]
    }
    _handleChange = (e) => {
        this.contrastRatio.ratio = e.target.value;
        store.dispatch(
            contrastRatioActions.updateStop(
                this.contrastRatio.ratio, this.contrastRatio.key
            )
        )
    }
    _handleRemove = (e) => {
        store.dispatch(
            contrastRatioActions.clearStopItem(
                this.contrastRatio.ratio, this.contrastRatio.key
            )
        )
    }
}
customElements.define('contrast-stop', ContrastStop)