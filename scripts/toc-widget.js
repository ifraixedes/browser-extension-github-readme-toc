'use strict';

(function (window, document) {
  var headerLevelRegExp = /h([\d]*)/i;
  var TOC_DIV_ID = 'chrome-extension-github-readme-toc';
  var rightSideCtnElem;
  var readmeAElems;
  var tocUlElem;
  var tocHeader;
  var tocCtnElem = document.getElementById(TOC_DIV_ID);
  var readmeElem = document.querySelector('#readme');
  var rightSideLastElem; // This elements help to identify when TOC must change to move the element when scrolling
  var floating = false; // Flag to identify faster if the TOC element is floating wiht scrooling

  // Enable it only for the intial page of the repository
  if (readmeElem) {
    if (!tocCtnElem) {
      tocCtnElem = document.createElement('div');
      tocCtnElem.setAttribute('id', TOC_DIV_ID);
      tocCtnElem.classList.add('toc-widget-ctn');

      rightSideCtnElem = document.querySelector('.repository-sidebar.clearfix');
      rightSideLastElem = document.querySelector('.only-with-full-nav');

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
          var hParse = headerLevelRegExp.exec(readmeElem.parentElement.nodeName);
          var level;

          if (hParse !== null) {
            level = parseInt(hParse[1]);
            if (!isNaN(level) && (level > 1)) {
              level--;
              tocAElem.setAttribute('style', 'padding-left: ' + (level * 0.8) + 'em;')
            }
          }

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
    // if it isn't the intial page of the repository and TOC element exists, don't show it
    if (tocCtnElem) {
      tocCtnElem.classList.remove('show');
    }
  }

  function tocBehaviourWhenScrolling() {
    if (tocCtnElem && rightSideLastElem) {
      if (rightSideLastElem.getClientRects()[0].bottom <= 0) {
        if (!floating) {
          tocCtnElem.setAttribute('style', 'position: fixed; top: 0;');
          floating = true;
        }
      } else if (floating) {
          tocCtnElem.setAttribute('style', '');
          floating = false;
      }
    }
  }

  window.onscroll = tocBehaviourWhenScrolling;
})(window, document);

