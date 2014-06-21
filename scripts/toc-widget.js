'use strict';

(function (window, document) {
  var TOC_DIV_ID = 'chrome-extension-github-readme-toc';
  var rightSideCtnElem;
  var readmeAElems;
  var tocUlElem;
  var tocHeader;
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
        tocHeader = document.createElement('li');
        tocHeader.innerHTML = 'Table of contents';
        tocUlElem.appendChild(tocHeader);

        [].forEach.call(readmeAElems, function (readmeElem, idx) {
          var tocLiElem = document.createElement('li');
          var tocAElem = document.createElement('a');

          tocAElem.innerHTML = readmeElem.parentElement.textContent.trim();
          tocAElem.setAttribute('href', readmeElem.getAttribute('href'));
          tocLiElem.setAttribute('title', tocAElem.innerHTML);
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
})(window, document);

