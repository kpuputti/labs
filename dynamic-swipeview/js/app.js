(function () {

    function log() {
        if (window.console && console.log && console.log.apply) {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, args);
        }
    }

    function getColor(num) {
        var colors = ['red', 'green', 'blue'];
        return '#eee';//colors[num % 3];
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
        article.className = 'page';
        article.style.backgroundColor = getColor(num);

        var title = document.createElement('h1');
        title.textContent = 'Page ' + num;
        article.appendChild(title);

        article.appendChild(getListOfLength(100));

        return article;
    }

    function start() {
        log('start');
        var gallery = new SwipeView('#gallery', {
            loop: false
        });

        function addPage(index) {
            var master = gallery.masterPages[index];
            master.appendChild(createPage(index));
            master.className += ' overthrow';
        }

        for (var i = 0; i < 3; i++) {
            addPage(i);
        }

        window.gallery = gallery;
    }

    document.addEventListener('DOMContentLoaded', start);
})();
