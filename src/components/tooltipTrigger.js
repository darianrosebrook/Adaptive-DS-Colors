import {LitElement, html, css} from 'lit';
import './icon'
import styles from '../styles'

class TooltipTrigger extends LitElement {
    static get styles() {
        return [styles, css`
            :host {
                display: inline;
            }
        
        `];
    }
    render() {
        return html`
            <svg-icon icon="information"></svg-icon>
            `
    }
}
customElements.define('tooltip-trigger', TooltipTrigger)