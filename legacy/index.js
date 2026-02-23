import './style.css';
import  LayoutView  from './views/LayoutView.js';
import logo from './assets/flavor-fusion-logo.svg'
import { createElement } from './utils.js';

// Add the logo to the page
const head  = document.head;
const link = createElement('link',null, null,{
    rel: 'icon',
    href: logo
})
head.appendChild(link)
const layout = LayoutView()



