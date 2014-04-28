/*global React: false */

// Create a shallow clone of the given object.
function clone(o) {
    var result = {};
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            result[key] = o[key];
        }
    }
    return result;
}

var Item = React.createClass({
    getInitialState: function() {
        return { editing: false };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        this.setState({ editing: false });
    },
    handleChange: function() {
        var value = this.refs.input.getDOMNode().value.trim();
        this.props.onNameChange(this.props.key, value);
    },
    render: function() {
        var that = this;
        var options = {
            onClick: function() { that.setState({ editing: true }); }
        };
        var content = this.props.name;

        if (this.state.editing) {
            options = null;
            content = React.DOM.form(
                { onSubmit: this.handleSubmit },
                React.DOM.input({
                    ref: 'input',
                    defaultValue: this.props.name,
                    autoFocus: true,
                    onChange: this.handleChange
                })
            );
        }
        return React.DOM.li(
            options,
            content
        );
    }
});

var ItemList = React.createClass({
    render: function() {
        var that = this;

        return React.DOM.ul(
            null,
            this.props.items.map(function(item) {
                var data = clone(item);
                data.onNameChange = that.props.onNameChange;
                return Item(data);
            })
        );
    }
});

var App = React.createClass({
    getInitialState: function() {
        return { items: [] };
    },
    sortItems: function() {
        // Sorting would be cleaner to do in render with some _.sortBy
        // etc. helper that doesn't change the list in-place. But
        // let's stick to VanillaJS and do this instead.

        var items = this.state.items;

        items.sort(function(a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        this.setState({ items: items });
    },
    addItem: function() {
        var items = this.state.items;
        items.push({ name: 'New item', key: Date.now() });
        this.setState({ items: items });
        this.sortItems();
    },
    handleNameChange: function(key, newName) {
        this.setState({
            items: this.state.items.map(function(item) {
                if (item.key === key) {
                    item.name = newName;
                }
                return item;
            })
        });
        this.sortItems();
    },
    render: function() {
        return React.DOM.article(
            null,
            React.DOM.h1(null, 'Editable list demo using React'),
            React.DOM.p(null, 'Add a few items, click to edit, press enter to stop editing. List ordering is update live!'),
            React.DOM.button({ onClick: this.addItem }, 'Add item'),
            ItemList({ items: this.state.items, onNameChange: this.handleNameChange })
        );
    }
});

React.renderComponent(App(), document.body);
