import $ from 'jquery';
// import '@babel/polyfill';
import './lib/polyfill';
import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import './components/pixislider/pixiSlider';

$(() => {
  sayHello();
  setHTMLClassNames();
  setLazy();
});
