import {LitElement, html, css} from 'lit';
import styles from '../styles'
import '../components/button'
class ContrastStop extends LitElement {
    static get styles() {
        return [
            styles,
            css`
                input {
                    width: 8rem;
                }
                .grid {
                    grid-template-columns: auto 1fr;
                    margin-bottom: .5rem;
                }
            `
        ];
    }
    render() {
        return html`
            <div class='grid'>
                <input type="text" placeholder="4.5" />
                <button-m><svg-icon icon="clear"></svg-icon></button-m>
            </div>
        `
    }
}
customElements.define('contrast-stop', ContrastStop)