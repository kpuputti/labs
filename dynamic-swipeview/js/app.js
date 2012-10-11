(function () {

    var gallery;

    var slides = [
        {index: 0, name: 'a'},
        {index: 1, name: 'b'},
        {index: 2, name: 'c'},
        {index: 3, name: 'd'},
        {index: 4, name: 'e'},
        {index: 5, name: 'f'},
        {index: 6, name: 'g'}
    ];

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

    function createPage(slide) {
        var article = document.createElement('article');
        article.setAttribute('id', 'page-' + slide.index);
        article.className = 'page';

        var title = document.createElement('h1');
        title.textContent = 'Page ' + slide.index + ': ' + slide.name;
        article.appendChild(title);

        article.appendChild(getListOfLength(100));

        return article;
    }

    function onFlip() {
        log('flip');

        var currentMasterIndex = gallery.currentMasterPage;
        var prevMasterIndex = (3 + gallery.currentMasterPage - 1) % 3;
        var nextMasterIndex = (3 + gallery.currentMasterPage + 1) % 3;

        log('current master index:', currentMasterIndex);

        var prevMaster = gallery.masterPages[prevMasterIndex];
        var currentMaster = gallery.masterPages[currentMasterIndex];
        var nextMaster = gallery.masterPages[nextMasterIndex];

        currentMaster.scrollTop = 0;

        var masterPage, upcomingIndex, pageIndex, page;

        for (var i = 0; i < 3; i++) {
            masterPage = gallery.masterPages[i];
            page = masterPage.querySelector('.page');
            upcomingIndex = masterPage.dataset.upcomingPageIndex;
            pageIndex = masterPage.dataset.pageIndex;

            log('i:', i,
                'upcoming:', upcomingIndex,
                'page index:', pageIndex);

            if (upcomingIndex !== pageIndex) {
                log('upcoming != pageIndex', upcomingIndex, pageIndex);
                masterPage.innerHTML = '';
                masterPage.appendChild(createPage(slides[upcomingIndex]));
            }
        }

    }

    function start() {
        log('start');

        var galleryEl = document.getElementById('gallery');
        galleryEl.style.height = (window.innerHeight - 50) + 'px';

        gallery = new SwipeView('#gallery', {
            loop: false,
            numberOfPages: slides.length
        });

        gallery.onFlip(onFlip);

        var previous = createPage(slides[slides.length - 1]);
        var current = createPage(slides[0]);
        var next = createPage(slides[1]);

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
