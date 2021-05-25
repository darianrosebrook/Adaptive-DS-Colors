import {LitElement, html, css} from 'lit';
import styles from '../styles'

const addIcon = html`<svg width="10" height="10" viewBox="0 0 10 10"  xmlns="http://www.w3.org/2000/svg">
<path d="M9.32825 4.4375H5.57825V0.6875C5.57825 0.59375 5.4845 0.5 5.39075 0.5H4.64075C4.52356 0.5 4.45325 0.59375 4.45325 0.6875V4.4375H0.703247C0.58606 4.4375 0.515747 4.53125 0.515747 4.625V5.375C0.515747 5.49219 0.58606 5.5625 0.703247 5.5625H4.45325V9.3125C4.45325 9.42969 4.52356 9.5 4.64075 9.5H5.39075C5.4845 9.5 5.57825 9.42969 5.57825 9.3125V5.5625H9.32825C9.422 5.5625 9.51575 5.49219 9.51575 5.375V4.625C9.51575 4.53125 9.422 4.4375 9.32825 4.4375Z" />
</svg>`

const bulkIcon = html`<svg width="15" height="12" viewBox="0 0 15 12"  xmlns="http://www.w3.org/2000/svg">
<path d="M14.7314 3.125L13.5829 0.710938C13.5126 0.59375 13.3954 0.5 13.2548 0.5L7.65323 1.25C7.65323 1.25 2.05167 0.5 2.02823 0.5C1.88761 0.5 1.77042 0.59375 1.70011 0.710938L0.551672 3.125C0.457922 3.33594 0.551672 3.59375 0.786047 3.66406L1.93448 4.01562V8.96094C1.93448 9.3125 2.16886 9.61719 2.47355 9.6875L7.30167 10.9766C7.60636 11.0469 7.84073 11 7.98136 10.9766L12.8095 9.6875C13.1142 9.61719 13.3485 9.3125 13.3485 8.96094V4.01562L14.497 3.66406C14.7314 3.59375 14.8251 3.33594 14.7314 3.125ZM2.23917 1.29688L6.45792 1.85938L5.12198 4.20312L1.37198 3.07812L2.23917 1.29688ZM2.66105 4.22656C5.40323 5.07031 5.21573 5 5.28605 5C5.42667 5 5.54386 4.95312 5.59073 4.83594L7.27823 1.88281V10.1797L2.66105 8.96094V4.22656ZM12.622 8.96094L8.0048 10.1797V1.88281L9.6923 4.8125C9.76261 4.92969 9.8798 5 9.99698 5C10.0673 5 9.8798 5.04688 12.622 4.22656V8.96094ZM10.161 4.20312L8.82511 1.85938L13.0673 1.29688L13.911 3.07812L10.161 4.20312Z" />
</svg>`

const clearIcon = html`<svg width="12" height="13" viewBox="0 0 12 13"  xmlns="http://www.w3.org/2000/svg">
<path d="M6.07977 0.5C2.86884 0.5 0.267273 3.10156 0.267273 6.3125C0.267273 9.52344 2.86884 12.125 6.07977 12.125C9.29071 12.125 11.8923 9.52344 11.8923 6.3125C11.8923 3.10156 9.29071 0.5 6.07977 0.5ZM6.07977 11.375C3.29071 11.375 1.01727 9.125 1.01727 6.3125C1.01727 3.54688 3.26727 1.25 6.07977 1.25C8.8454 1.25 11.1423 3.52344 11.1423 6.3125C11.1423 9.10156 8.86884 11.375 6.07977 11.375ZM8.2829 4.69531C8.40009 4.57812 8.40009 4.41406 8.2829 4.29688L8.0954 4.10938C7.97821 3.99219 7.81415 3.99219 7.69696 4.10938L6.07977 5.72656L4.43915 4.10938C4.3454 3.99219 4.1579 3.99219 4.04071 4.10938L3.85321 4.29688C3.73602 4.41406 3.73602 4.57812 3.85321 4.69531L5.4704 6.3125L3.85321 7.95312C3.73602 8.04688 3.73602 8.23438 3.85321 8.35156L4.04071 8.53906C4.1579 8.65625 4.3454 8.65625 4.43915 8.53906L6.07977 6.92188L7.69696 8.53906C7.81415 8.65625 7.97821 8.65625 8.0954 8.53906L8.2829 8.35156C8.40009 8.23438 8.40009 8.04688 8.2829 7.95312L6.66571 6.3125L8.2829 4.69531Z" />
</svg>`

const codeIcon = html`<svg width="15" height="13" viewBox="0 0 15 13"  xmlns="http://www.w3.org/2000/svg">
<path d="M6.12274 12.4827C6.19305 12.5061 6.2868 12.4592 6.2868 12.3889L9.59149 0.834222C9.61493 0.763909 9.56805 0.693597 9.49774 0.670159L8.9118 0.506097C8.84149 0.482659 8.77118 0.529534 8.74774 0.599847L5.44305 12.1545C5.41962 12.2248 5.46649 12.2952 5.5368 12.3186L6.12274 12.4827ZM4.34149 9.55297L4.7868 9.06078C4.83368 9.01391 4.83368 8.9436 4.76337 8.89672L1.92743 6.48266L4.76337 4.09203C4.83368 4.04516 4.83368 3.97485 4.7868 3.92797L4.34149 3.43578C4.31805 3.38891 4.2243 3.38891 4.17743 3.43578L0.802429 6.41235C0.755554 6.45922 0.755554 6.52953 0.802429 6.57641L4.17743 9.55297C4.2243 9.59985 4.31805 9.59985 4.34149 9.55297ZM10.8571 9.55297L14.2321 6.57641C14.279 6.52953 14.279 6.45922 14.2321 6.41235L10.8571 3.43578C10.8102 3.38891 10.7399 3.38891 10.6931 3.43578L10.2477 3.92797C10.2009 3.97485 10.2243 4.04516 10.2712 4.09203L13.1071 6.48266L10.2712 8.89672C10.2243 8.9436 10.2009 9.01391 10.2477 9.06078L10.6931 9.55297C10.7165 9.59985 10.8102 9.59985 10.8571 9.55297Z" />
</svg>`

const distributeIcon = html`<svg width="16" height="11" viewBox="0 0 16 11"  xmlns="http://www.w3.org/2000/svg">
<path d="M4.64076 3.10156C4.96889 3.10156 5.13295 2.70312 4.89858 2.46875L3.02358 0.59375C2.95326 0.546875 2.83608 0.5 2.74233 0.5C2.67201 0.5 2.55483 0.546875 2.48451 0.59375L0.609514 2.46875C0.398577 2.67969 0.515764 3.10156 0.890764 3.10156H2.39076V8.35156H0.890764C0.539202 8.35156 0.375139 8.77344 0.609514 9.00781L2.48451 10.8828C2.55483 10.9297 2.67201 10.9766 2.76576 10.9766C2.83608 10.9766 2.95326 10.9297 3.02358 10.8828L4.89858 9.00781C5.10951 8.77344 4.99233 8.35156 4.64076 8.35156H3.14076V3.10156H4.64076ZM3.7267 9.10156L2.76576 10.0859L1.78139 9.10156H3.7267ZM2.39076 2.35156H1.78139L2.76576 1.39062L3.7267 2.35156H2.39076ZM15.3283 5.35156H6.70326C6.58608 5.35156 6.51576 5.44531 6.51576 5.53906V5.91406C6.51576 6.03125 6.58608 6.10156 6.70326 6.10156H15.3283C15.422 6.10156 15.5158 6.03125 15.5158 5.91406V5.53906C15.5158 5.44531 15.422 5.35156 15.3283 5.35156ZM15.3283 8.35156H6.70326C6.58608 8.35156 6.51576 8.44531 6.51576 8.53906V8.91406C6.51576 9.03125 6.58608 9.10156 6.70326 9.10156H15.3283C15.422 9.10156 15.5158 9.03125 15.5158 8.91406V8.53906C15.5158 8.44531 15.422 8.35156 15.3283 8.35156ZM15.3283 2.35156H6.70326C6.58608 2.35156 6.51576 2.44531 6.51576 2.53906V2.91406C6.51576 3.03125 6.58608 3.10156 6.70326 3.10156H15.3283C15.422 3.10156 15.5158 3.03125 15.5158 2.91406V2.53906C15.5158 2.44531 15.422 2.35156 15.3283 2.35156Z" />
</svg>`

const informationIcon = html`<svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
<path d="M8.01575 0.5C3.8595 0.5 0.515747 3.875 0.515747 8C0.515747 12.1562 3.8595 15.5 8.01575 15.5C12.1407 15.5 15.5157 12.1562 15.5157 8C15.5157 3.875 12.1407 0.5 8.01575 0.5ZM8.01575 14.5C4.422 14.5 1.51575 11.5938 1.51575 8C1.51575 4.4375 4.422 1.5 8.01575 1.5C11.5782 1.5 14.5157 4.4375 14.5157 8C14.5157 11.5938 11.5782 14.5 8.01575 14.5ZM8.01575 5.75C8.422 5.75 8.76575 5.4375 8.76575 5C8.76575 4.59375 8.422 4.25 8.01575 4.25C7.57825 4.25 7.26575 4.59375 7.26575 5C7.26575 5.4375 7.57825 5.75 8.01575 5.75ZM9.51575 11H8.51575V7.5C8.51575 7.25 8.26575 7 8.01575 7H7.01575C6.7345 7 6.51575 7.25 6.51575 7.5C6.51575 7.78125 6.7345 8 7.01575 8H7.51575V11H6.51575C6.2345 11 6.01575 11.25 6.01575 11.5C6.01575 11.7812 6.2345 12 6.51575 12H9.51575C9.76575 12 10.0157 11.7812 10.0157 11.5C10.0157 11.25 9.76575 11 9.51575 11Z" />
</svg>`

const lockIcon = html`<svg width="15" height="17" viewBox="0 0 15 17"  xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 7.5H11.5V4.5C11.5 2.3125 9.6875 0.5 7.5 0.5C5.28125 0.5 3.5 2.3125 3.5 4.5V7.5H2.5C1.375 7.5 0.5 8.40625 0.5 9.5V14.5C0.5 15.625 1.375 16.5 2.5 16.5H12.5C13.5938 16.5 14.5 15.625 14.5 14.5V9.5C14.5 8.40625 13.5938 7.5 12.5 7.5ZM4.5 4.5C4.5 2.875 5.84375 1.5 7.5 1.5C9.125 1.5 10.5 2.875 10.5 4.5V7.5H4.5V4.5ZM13.5 14.5C13.5 15.0625 13.0312 15.5 12.5 15.5H2.5C1.9375 15.5 1.5 15.0625 1.5 14.5V9.5C1.5 8.96875 1.9375 8.5 2.5 8.5H12.5C13.0312 8.5 13.5 8.96875 13.5 9.5V14.5Z" />
</svg>`

const sortIcon = html`<svg width="13" height="12" viewBox="0 0 13 12"  xmlns="http://www.w3.org/2000/svg">
<path d="M5.14062 8.46875C5.09375 8.42188 5.02344 8.39844 4.95312 8.39844C4.88281 8.39844 4.78906 8.42188 4.76562 8.46875L3.5 9.71094V0.6875C3.5 0.59375 3.40625 0.5 3.3125 0.5H2.9375C2.82031 0.5 2.75 0.59375 2.75 0.6875V9.6875L1.48438 8.46875C1.4375 8.42188 1.34375 8.39844 1.27344 8.39844C1.20312 8.39844 1.13281 8.42188 1.08594 8.46875L0.945312 8.60938C0.898438 8.65625 0.851562 8.72656 0.851562 8.79688C0.851562 8.86719 0.898438 8.96094 0.945312 9.00781L2.91406 10.9297C2.96094 10.9766 3.05469 11.0234 3.10156 11.0234C3.17188 11.0234 3.26562 10.9766 3.3125 10.9297L5.28125 9.00781C5.32812 8.96094 5.375 8.86719 5.375 8.79688C5.375 8.72656 5.32812 8.65625 5.28125 8.60938L5.14062 8.46875ZM6.96875 4.25H10.5312C10.7891 4.25 11 4.0625 11 3.78125V0.96875C11 0.710938 10.7891 0.5 10.5312 0.5H6.96875C6.6875 0.5 6.5 0.710938 6.5 0.96875V3.78125C6.5 4.0625 6.6875 4.25 6.96875 4.25ZM7.25 1.25H10.25V3.5H7.25V1.25ZM11.8438 5.75H7.15625C6.78125 5.75 6.5 6.05469 6.5 6.40625V10.3438C6.5 10.7188 6.78125 11 7.15625 11H11.8438C12.1953 11 12.5 10.7188 12.5 10.3438V6.40625C12.5 6.05469 12.1953 5.75 11.8438 5.75ZM11.75 10.25H7.25V6.5H11.75V10.25Z" />
</svg>`

const icon = (icon) => {
    switch(icon) {
        case 'add':
            return addIcon;
            break;
        case 'bulk':
            return bulkIcon;
            break;
        case 'clear':
            return clearIcon;
            break;
        case 'code':
            return codeIcon;
            break;
        case 'distribute':
            return distributeIcon;
            break;
        case 'information':
            return informationIcon;
            break;
        case 'lock':
            return lockIcon;
            break;
        case 'sort':
            return sortIcon;
            break;
        default:
            return addIcon;
            break;
    }
}
class SVGIcon extends LitElement {
    static get properties() {
        return {
            icon: {type: String}
        }
    }
    static get styles() {
        return [styles,css`
            :host {
                display: inline;
            }
            div {
                display: inline-block;
                position: relative;
                height: 24px;
                width: 24px;
            }
            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        `]
    }
    render() {
        return html`<div>${icon(this.icon)}</div>`
    }

}
customElements.define('svg-icon', SVGIcon)