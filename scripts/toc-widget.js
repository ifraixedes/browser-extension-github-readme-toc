'use strict';

//query to append the div element for the TOC '.repository-sidebar.clearfix'

var TOC_DIV_ID = 'chrome-extension-github-readme-toc';
var rightSideCtnElem;
var readmeAElems;
var tocUlElem;
var tocCtnElem = document.getElementById(TOC_DIV_ID);
var readmeElem = document.querySelector('#readme');

if (readmeElem) {
  if (!tocCtnElem) {
    tocCtnElem = document.createElement('div');
    tocCtnElem.setAttribute('id', TOC_DIV_ID);
    tocCtnElem.classList.add('toc-widget-ctn');

    rightSideCtnElem = document.querySelector('.repository-sidebar.clearfix');
    readmeAElems = readmeElem.querySelectorAll('[href^="#"]');

    if (readmeAElems) {
      tocUlElem = document.createElement('ul');
      tocCtnElem.appendChild(tocUlElem);

      [].forEach.call(readmeAElems, function (readmeElem, idx) {
        var tocLiElem = document.createElement('li');
        var tocAElem = document.createElement('a');

        tocAElem.innerHTML = readmeElem.parentElement.textContent.trim();
        tocAElem.setAttribute('href', readmeElem.getAttribute('href'));
        tocLiElem.appendChild(tocAElem);
        tocUlElem.appendChild(tocLiElem);
      });

      rightSideCtnElem.appendChild(tocCtnElem);
      tocCtnElem.classList.add('show');
    }
  }
} else {
  if (tocCtnElem) {
    tocCtnElem.classList.remove('show');
  }
}

