import {LitElement, html, css} from 'lit';

class AdaptiveColors extends LitElement {
    static get styles() {
        return css `
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }`;
    }
    static get properties() {
        return {
        }
    }

    constructor() {
        super();
    }
    render() {
        return html`<main>
            <key-colors></key-colors>
            <section class="grid">
                <base-color></base-color>
                <color-space></color-space>
                <contrast-ratios></contrast-ratios>
                <color-ramp></color-ramp>
            </section>
            <reference-code></reference-code>
        </main>`
    }
} 

export class keyColors extends LitElement {
    static get styles() {
        return css ``;
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
                <h2>Key colors</h2>
            </section>`
    }
} 

export class BaseColor extends LitElement {
    static get styles() {
        return css ``;
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
                <h2>Base color</h2>
            </section>`
    }
} 
export class ColorSpace extends LitElement {
    static get styles() {
        return css ``;
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
                <h2>Color space</h2>
            </section>`
    }
} 
export class ContrastRatios extends LitElement {
    static get styles() {
        return css ``;
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
                <h2>Contrast Ratios</h2>
            </section>`
    }
} export class ColorRamp extends LitElement {
    static get styles() {
        return css ``;
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
                <h2>Color ramp</h2>
            </section>`
    }
} 
export class ReferenceCode extends LitElement {
    static get styles() {
        return css ``;
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
                <h2>Reference code</h2>
            </section>`
    }
} 
customElements.define('reference-code', ReferenceCode)
customElements.define('color-ramp', ColorRamp)
customElements.define('contrast-ratios', ContrastRatios)
customElements.define('color-space', ColorSpace)
customElements.define('base-color', BaseColor)
customElements.define('key-colors', keyColors)
customElements.define('adaptive-colors', AdaptiveColors)