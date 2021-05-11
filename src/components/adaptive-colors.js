import {LitElement, html, css} from 'lit';

export class AdaptiveColors extends LitElement {
    static get styles() {
        return css `* {color: red}`;
    }
    static get properties() {
        return {
            name: {type: String}
        }
    }

    constructor() {
        super();
        this.name = "Lit";
    }
    render() {
        return html`<h1> Now we're building with ${this.name} </h1>`
    }
} 

customElements.define('adaptive-colors', AdaptiveColors)