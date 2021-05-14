import {LitElement, html, css} from 'lit';
import './icon'

class TooltipTrigger extends LitElement {
    render() {
        return html`
            <svg-icon icon="information"></svg-icon>
            `
    }
}
customElements.define('tooltip-trigger', TooltipTrigger)