/*global React: false */

var Item = React.createClass({
    render: function() {
        return React.DOM.li(
            null,
            this.props.name
        );
    }
});

var ItemList = React.createClass({
    render: function() {
        return React.DOM.ul(
            null,
            this.props.items.map(function(item) {
                return Item(item);
            })
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return { items: [], lastKey: 0 };
    },
    getNewKey: function() {
        // ascending order:
        //return Date.now();

        // random order:
        //return Math.random();

        // descending order:
        return this.state.lastKey - 1;
    },
    addNewItem: function() {
        var key = this.getNewKey();
        var items = this.state.items;

        items.push({
            name: 'Item ' + key,
            key: key
        });

        // sort by the key property
        items.sort(function(a, b) {
            if (a.key < b.key) return -1;
            if (a.key > b.key) return 1;
            return 0;
        });

        this.setState({
            items: items,
            lastKey: key
        });
    },
    render: function() {
        return React.DOM.article(
            null,
            React.DOM.button({ onClick: this.addNewItem }, 'Add new item'),
            ItemList({ items: this.state.items })
        );
    }
});

React.renderComponent(App(), document.body);
