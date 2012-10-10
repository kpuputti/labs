(function () {

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

    function createPage(num, name) {
        var article = document.createElement('article');
        article.setAttribute('id', 'page-' + num);
        article.className = 'page';

        var title = document.createElement('h1');
        title.textContent = 'Page ' + name;
        article.appendChild(title);

        article.appendChild(getListOfLength(100));

        return article;
    }

    function start() {
        log('start');
        var gallery = new SwipeView('#gallery', {
            loop: false,
            numberOfPages: 3
        });

        function addPage(index) {
            log('add page:', index);
            var master = gallery.masterPages[index];
            master.appendChild(createPage(index));
            master.className += ' overthrow';
        }

        var previous = createPage(0, 'prev 0');
        var current = createPage(1, 'current 1');
        var next = createPage(2, 'next 2');

        var masterPrev = gallery.masterPages[1];
        var masterCurrent = gallery.masterPages[2];
        var masterNext = gallery.masterPages[0];

        masterPrev.appendChild(previous);
        masterCurrent.appendChild(current);
        masterNext.appendChild(next);

        gallery.goToPage(1);

        window.gallery = gallery;
    }

    document.addEventListener('DOMContentLoaded', start);
})();
