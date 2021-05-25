import {LitElement, html, css} from 'lit';
import styles from '../styles'

class ColorRampResults extends LitElement {
    static get styles() {
        return [styles, css`
            .container {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 1rem;
            }
            p {
                display:inline;
                margin: 0;
            }
            input {
                width: 100%;
                margin-bottom: .5rem;
            }
            .ramp-results {
                border-radius: 4px;
                overflow: hidden;
            }
            .ramp-item {
                display: grid;
                grid-template-columns: 1fr 1fr;
                justify-content: space-between;
                color: #000;
                padding: 1.25rem .5rem;
            }
        `]
    }
    render() {
        return html`
            <div class="container">
                <div>
                    
                        <input type="text" placeholder="100" />
                    
                    
                        <input type="text" placeholder="200" />
                    
                    
                        <input type="text" placeholder="300" />
                    
                    
                        <input type="text" placeholder="400" />
                    
                    
                        <input type="text" placeholder="500" />
                    
                </div>
                
                <div class="ramp-results">
                    <div class="ramp-item" style="background:#FFEAE5;">
                        <p>1.11</p><p>#FFEAE5</p>
                    </div>
                    <div class="ramp-item" style="background:#EF927C;">
                        <p>2.22</p><p>#EF927C</p>
                    </div>
                    <div class="ramp-item" style="background:#E0634B;">
                        <p>3.33</p><p>#E0634B</p>
                    </div>
                    <div class="ramp-item" style="background:#D33D2A;">
                        <p>4.5</p><p>#D33D2A</p>
                    </div>
                    <div class="ramp-item" style="background:#CA1614;">
                        <p>5.55</p><p>#CA1614</p>
                    </div>
                </div>
            </div>
            
        `
    }
}
customElements.define('color-results', ColorRampResults)