(function () {

    var gallery;

    function log() {
        if (window.console && console.log && console.log.apply) {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, args);
        }
    }

    function getListOfLength(len) {
        var ul = document.createElement('ul');
        var li;
        for (var i = 0; i < len; i++) {
            li = document.createElement('li');
            li.textContent = 'Item '+ i;
            ul.appendChild(li);
        }
        return ul;
    }

    function createPage(num) {
        var article = document.createElement('article');
        article.setAttribute('id', 'page-' + num);
        article.setAttribute('data-pageindex', num);
        article.className = 'page';

        var title = document.createElement('h1');
        title.textContent = 'Page ' + num;
        article.appendChild(title);

        article.appendChild(getListOfLength(100));

        return article;
    }

    function onPageChange() {
        log('flip');

        var currentMasterIndex = gallery.currentMasterPage;
        var prevMasterIndex = (3 + gallery.currentMasterPage - 1) % 3;
        var nextMasterIndex = (3 + gallery.currentMasterPage + 1) % 3;

        var prevMaster = gallery.masterPages[prevMasterIndex];
        var currentMaster = gallery.masterPages[currentMasterIndex];
        var nextMaster = gallery.masterPages[nextMasterIndex];

        var currentPage = currentMaster.querySelector('article');

        if (!currentPage) {
            log('no current page');
            gallery.goToPage(2);
            return;
        }

        var currentIndex = window.parseInt(currentPage.getAttribute('data-pageindex'), 10);
        log('current page index:', currentIndex);

        prevMaster.innerHTML = '';
        nextMaster.innerHTML = '';
        var prevIndex = currentIndex - 1;
        var nextIndex = currentIndex + 1;

        if (prevIndex >= 0) {
            prevMaster.appendChild(createPage(currentIndex - 1));
        } else {
            // prevent going to prev page
            prevMaster.setAttribute('data-isempty', 'yes');
        }
        if (nextIndex < 10) {
            nextMaster.appendChild(createPage(currentIndex + 1));
        } else {
            // prevent going to next page
            nextMaster.setAttribute('data-isempty', 'yes');
        }

    }

    function start() {
        log('start');
        gallery = new SwipeView('#gallery', {
            loop: true,
            numberOfPages: 3
        });

        gallery.onFlip(onPageChange);
        gallery.onMoveOut(function (e) {
            log('move out from:', gallery.currentMasterPage);
            var currentMaster = gallery.masterPages[gallery.currentMasterPage];

            if (!currentMaster) {
                log('empty');
            }

        });

        function addPage(index) {
            log('add page:', index);
            var master = gallery.masterPages[index];
            master.appendChild(createPage(index));
            master.className += ' overthrow';
        }

        var previous = createPage(0);
        var current = createPage(1);
        var next = createPage(2);

        var masterPrev = gallery.masterPages[0];
        var masterCurrent = gallery.masterPages[1];
        var masterNext = gallery.masterPages[2];

        masterPrev.appendChild(previous);
        masterCurrent.appendChild(current);
        masterNext.appendChild(next);

        window.gallery = gallery;
    }

    document.addEventListener('DOMContentLoaded', start);
})();
