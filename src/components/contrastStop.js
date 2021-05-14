import {LitElement, html, css} from 'lit';
import '../components/button'
class ContrastStop extends LitElement {
    render() {
        return html`
            <input type="text" placeholder="4.5" />
            <button-m><svg-icon icon="clear"></svg-icon></button-m>
        `
    }
}
customElements.define('contrast-stop', ContrastStop)