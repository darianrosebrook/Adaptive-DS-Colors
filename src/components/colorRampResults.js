import {LitElement, html, css} from 'lit';

class ColorRampResults extends LitElement {
    static get styles() {
        return css`
            .container {
                display: grid;
                grid-template-columns: 1fr 5fr;
                gap: 1rem;
            }
            p {
                display:inline;
            }
            input {
                width: 100%;
            }
        `
    }
    render() {
        return html`
            <div class="container">
                <div>
                    <input type="text" />
                </div>
                <div>
                    <div>
                        <p>1.1</p><p>#FFFFFF</p>
                    </div>
                </div>
            </div>
            
        `
    }
}
customElements.define('color-results', ColorRampResults)