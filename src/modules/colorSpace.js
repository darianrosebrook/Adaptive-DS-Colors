import {LitElement, html, css} from 'lit';
import { store } from '../redux/store.js';
import { connect } from "pwa-helpers";
import { colorSpaceActions } from '../redux/actions';
import styles from '../styles'
class ColorSpace extends connect(store)(LitElement) {
    static get styles() {
        return [
            styles,
            css`
                div { margin-bottom: .5rem;}
                select {
                    width: auto;
                    cursor: pointer;
                }
            `
        ];
    }
    static get properties() {
        return {
            colorSpace: {type: String}
        }
    }

    constructor() {
        super();
        this.colorSpace = ''
    }
    stateChanged(state) {
        this.colorSpace = state.colorSpace
    }
    render() {
        return html`
            <section>
                <div>
                    <h2>Color space</h2>
                </div>
                <select @change=${this._handleChange}>
                    <option>CIECAM02</option>
                    <option>LCH</option>
                    <option>LAB</option>
                    <option>HSL</option>
                    <option>HSLuv</option>
                    <option>RGB</option>
                    <option>HSV</option>
                    <option>HEX</option>
                </select>
            </section>`
    }
    _handleChange = (e) => {
        store.dispatch(
            colorSpaceActions.updateColorSpace(
                e.target.value
            )
        )
    }
} 
customElements.define('color-space', ColorSpace)