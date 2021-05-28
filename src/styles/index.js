import { css } from "lit";
import reset from "./reset.js";

import keyframes from "./keyframes.js";

export default css`
  /* Imports */
  ${reset}
  ${keyframes}

  /* Defaults */
  *,
  *::before,
  *::after {
    flex-direction: row;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *::selection {
    background-color: var(--foreground);
    color: var(--background);
  }

  /* -- Clearfix--  */
  .f-r,
  .f-l {
    float: none;
  }
  avatar-image.f-r {
    float: right;
  }
  .cf::after {
    content: "";
    display: table;
    clear: both;
  }
  /* -- Media -- */
  img {
    transition: var(--transition);
    display: inline-block;
    width: 100%;
  }
  video {
    display: block;
  }

  /* Typography  */
  /* -- Headings--  */
  h1 {
    font-size: var(--ramp-t1);
    font-weight: 600;
    line-height: 1.2;
  }
  h2 {
    display: inline;
    font-size: var(--ramp-t6);
    font-weight: 600;
    line-height: 1.5rem;
    vertical-align: top;
    
  }
  h3 {
    font-size: var(--ramp-t3);
    font-weight: 600;
    line-height: 1.294117647058824;
  }
  h4 {
    font-size: var(--ramp-t4);
    font-weight: 600;
    line-height: 1.285714285714286;
  }
  h5 {
    font-size: var(--ramp-t5);
    font-weight: 600;
    line-height: 1.4;
  }
  h6 {
    font-size: var(--ramp-t6);
    font-weight: 600;
    line-height: 1.5;
  }
  .subheading {
    font-weight: 300;
  }
  strong,
  b {
    font-size: var(--ramp-t7);
    font-weight: 600;
    line-height: 1.428571428571429;
  }

  p {
    margin-bottom: var(--margin);
  }
  p.p-1 {
    font-size: var(--ramp-t5);
    font-weight: 400;
  }
  p.p-2 {
    font-size: var(--ramp-t6);
  }
  p,
  p.p-3,
  div,
  ul {
    font-size: var(--ramp-t7);
  }
  p.mono,
  pre {
    font-family: "Monaco";
  }
  .emph {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: 100;
  }
  label,
  .label {
    font-size: var(--ramp-t7);
    font-weight: 300;
  }
  small,
  caption {
    font-weight: 300;
  }
  small.c1,
  caption.c1,
  .metatext {
    font-size: var(--ramp-t8);
  }
  small.c1-upper,
  caption.c1-upper {
    text-transform: uppercase;
    font-size: var(--ramp-t8);
  }
  small.c2,
  caption.c2 {
    font-size: var(--ramp-t9);
  }
  small.c2-upper,
  caption.c2-upper {
    text-transform: uppercase;
    font-size: var(--ramp-t9);
  }

  ul {
    list-style-type: none;
  }
  a,
  a:link,
  a:visited,
  a:hover,
  a:focus {
    display: inline-block;
    transition: all ease 0.3s;
    text-decoration: none;
    color: var(--link-rest);
    padding: 0.3rem;
    height: 100%;
  }
  a:hover {
    color: var(--background);
    box-shadow: inset 0 -15em 0 var(--link-hover);
  }
  a:active {
    color: var(--link-active);
  }
  a.block-link:link,
  a.block-link:visited {
    color: var(--foreground);
    display: block;
    width: 100%;
  }
  /* Architecture */
  /* -- Grid--  */
  .grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--margin);
  }
  .flex-container {
    display: flex; 
    flex-wrap: nowrap;
  }

  button,
  a.button,
  input[type="submit"] {
    transition: var(--transition);
    display: inline;
    border: 1px solid var(--foreground);
    border-radius: 4px;
    font-size: var(--tr-t7);
    text-align: center;
    text-transform: none;
    vertical-align: top;
    background: none;
    color: var(--foreground);
    cursor: pointer;
    padding: calc(.75rem - 1px);
    fill: var(--foreground);
  }
  button:hover,
  a.button:hover,
  input[type="submit"]:hover {
    background-color: var(--foreground);
    color: var(--background);
    fill: var(--background) !important;
  }
  button.stealth,
  a.stealth {
    border: none;
  }
  button.stealth:hover,
  a.stealth:hover {
    background: var(--hover-background);
  }
  button + button,
  a.button + a.button
  input[type="submit"] + input[type="submit"], button-m + button-m {
    margin-left: var(--margin);
  }
  /* Form inputs */
  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--margin);
  }

  input,
  textarea, select {
    display: inline-block;
    outline: none;
    padding: .75rem .5rem;
    color: var(--foreground);
    transition: 0.1s ease-out;
    border: 1px solid;
    border-color: var(--foreground);
    border-radius: var(--design-unit);
    background: transparent;
    cursor: text;
    line-height: 1.5;
    width: 100%;
  }
  input:focus {
    border: 1px solid var(--focus);
  }
  input:disabled,
  input:disabled ~ .label {
    opacity: 0.5;
  }


  a:link {color: var(--link-rest);}
  a:visited {color: var(--link-rest);}
  a:hover {color: var(--link-hover);}
  a:active {color: var(--link-active);
  }
  @media (prefers-color-scheme: dark) {
    a:link {color: var(--cr-blue-40);}
    a:visited {color: var(--cr-blue-40);}
    a:hover {color: var(--cr-blue-50);}
    a:active {color: var(--cr-blue-20);}
  }
  :host {
    display: block;
  }
  
`;
