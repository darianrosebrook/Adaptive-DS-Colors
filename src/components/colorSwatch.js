import {LitElement, html, css} from 'lit';
import { store } from "../redux/store.js";
import { connect } from "pwa-helpers";
import { keyColorActions } from '../redux/actions';

class ColorSwatch extends connect(store)(LitElement) {
    static get styles() {
        return css `input[type='color'] {
            -webkit-appearance: none;
            height: 48px;
            width: 48px;
            border: 0;
            padding: 0;
            margin: 0 0 .5rem 0;
            background-color: transparent;
            border: none;
            border-collapse: collapse;
            outline: none;
            border-radius: 4px;
        }
        input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0px;
  border: none;
}
input[type="color"]::-webkit-color-swatch {
    border: 1px solid var(--df-dark-neutral-dark);
    border-radius: 4px;
}]`;
    }
    static get properties() {
        return {
            colorValue: {
                color: {type: String},
                key: {type: Number}
            }
        }
    }
    constructor() {
        super();
        this.colorValue = {color: '#ffffff', key: 0}
    }

    stateChanged(state) {
        this.colorValue.color = state.keyColors[this.colorValue.key]
    }


    render() {
        return html`
                <input type="color" @change=${this._handleChange} value="${this.colorValue.color}" />
                `
    }
    _handleChange = (e) => {
        this.colorValue.color = e.target.value;
        store.dispatch(
            keyColorActions.updateColor(
                this.colorValue.color, this.colorValue.key
            )
        )
    }
} 
customElements.define('color-swatch', ColorSwatch);