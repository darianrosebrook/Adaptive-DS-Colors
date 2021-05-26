import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/colorSwatch.js'
import '../components/tooltipTrigger'

class keyColors extends LitElement {
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
        this.keyColors = ['#C0FFEE'];
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
                            <color-swatch colorValue="${item}"></color-swatch>
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
                this.keyColors = [...this.keyColors, '#C0FFEE']
                break;
            case 'BULK':
                console.log('Execute BULK');
                break;
            case 'CODE':
                console.log('Execute CODE');
                break;
            case 'CLEAR':
                this.keyColors = ['#C0FFEE']
                break;
            default:
                break;
        }
    }
    
} 

customElements.define('key-colors', keyColors)