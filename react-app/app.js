/*global React: false */

var Link = React.createClass({
    displayName: 'Link',
    render: function() {
        return React.DOM.a({ href: '#' + this.props.href }, this.props.text);
    }
});

var Navigation = React.createClass({
    displayName: 'Navigation',
    render: function() {
        var that = this;
        return React.DOM.nav(
            { className: 'Navigation' },
            React.DOM.ul(
                null,
                this.props.pages.map(function(page) {
                    var isSelected = that.props.currentPath === page.path;
                    return React.DOM.li(
                        { className: isSelected ? 'selected' : null, key: page.path },
                        Link({ href: page.path, text: page.name })
                    );
                })
            )
        );
    }
});

var IndexPage = React.createClass({
    displayName: 'IndexPage',
    render: function() {
        return React.DOM.section(
            null,
            React.DOM.h1(null, 'Index page'),
            React.DOM.p(null, 'Index page contents.')
        );
    }
});

var AboutPage = React.createClass({
    displayName: 'AboutPage',
    render: function() {
        return React.DOM.section(
            null,
            React.DOM.h1(null, 'About page'),
            React.DOM.p(null, 'About page contents.')
        );
    }
});

var ContactPage = React.createClass({
    displayName: 'ContactPage',
    render: function() {
        return React.DOM.section(
            null,
            React.DOM.h1(null, 'Contact page'),
            React.DOM.p(null, 'Contact page contents.')
        );
    }
});

var NotFoundPage = React.createClass({
    displayName: 'NotFoundPage',
    render: function() {
        return React.DOM.section(
            null,
            React.DOM.h1(null, 'Page not found'),
            React.DOM.p(null, 'No page for path: ', this.props.path)
        );
    }
});

var App = React.createClass({
    displayName: 'App',
    getInitialState: function() {
        return {
            path: '',
            pageRegistry: [
                { path: '', name: 'Index', constructor: IndexPage },
                { path: 'about', name: 'About', constructor: AboutPage },
                { path: 'contact', name: 'Contact', constructor: ContactPage }
            ]
        };
    },
    updatePathFromHash: function() {
        this.setState({ path: window.location.hash.replace(/^#/, '') });
    },
    componentWillMount: function() {
        this.updatePathFromHash();
        window.addEventListener('hashchange', this.updatePathFromHash);
    },
    componentWillUnmount: function() {
        window.removeEventListener('hashchange', this.updatePathFromHash);
    },
    getPageForPath: function(path) {
        var pages = this.state.pageRegistry.filter(function(page) {
            return page.path === path;
        });
        if (pages.length === 1) {
            return pages[0].constructor();
        } else {
            return NotFoundPage({ path: path });
        }
    },
    render: function() {
        return React.DOM.section(
            null,
            React.DOM.h1(null, 'React App'),
            Navigation({ pages: this.state.pageRegistry, currentPath: this.state.path }),
            this.getPageForPath(this.state.path)
        );
    }
});

React.renderComponent(App(), document.body);
