/*global React: false */

var TodoItem = React.createClass({
    onClick: function() {
        this.props.onClick(this.props.key);
    },
    render: function() {
        var done = this.props.done;
        return React.DOM.li(
            {
                className: 'TodoItem' + (done ? ' item-done' : ''),
                title: 'Toggle ' + (done ? 'undone' : 'done'),
                onClick: this.onClick
            },
            this.props.text
        );
    }
});

var TodoList = React.createClass({
    render: function() {
        var that = this;
        var count = this.props.items.length;

        return React.DOM.div(
            { className: 'TodoList' },
            React.DOM.p(null, count, count === 1 ? ' item' : ' items'),
            React.DOM.ul(
                null,
                this.props.items.map(function(item) {
                    item.onClick = that.props.onItemClick;
                    return TodoItem(item);
                })
            )
        );
    }
});

var TodoApp = React.createClass({
    getInitialState: function() {
        return { items: [] };
    },
    addItem: function(text) {
        this.setState({
            items: this.state.items.concat({
                key: Date.now(),
                text: text,
                done: false
            })
        });
    },
    toggleItem: function(key) {
        this.setState({
            items: this.state.items.map(function(item) {
                if (item.key === key) {
                    item.done = !item.done;
                }
                return item;
            })
        });
    },
    onSubmit: function(e) {
        e.preventDefault();
        var node = this.refs.newItem.getDOMNode();
        var value = node.value.trim();
        this.addItem(value);
        node.value = '';
    },
    removeDoneItems: function() {
        this.setState({
            items: this.state.items.filter(function(item) {
                return !item.done;
            })
        });
    },
    render: function() {
        var removeButton = null;
        var doneItemCount = this.state.items.reduce(function(result, item) {
            return result + (item.done ? 1 : 0);
        }, 0);

        if (doneItemCount > 0) {
            removeButton = React.DOM.button(
                { className: 'remove-button', onClick: this.removeDoneItems },
                'Remove done items'
            );
        }

        return React.DOM.section(
            { className: 'TodoApp' },
            React.DOM.h1(null, '// Todo'),
            React.DOM.form(
                { onSubmit: this.onSubmit },
                React.DOM.input({ ref: 'newItem', placeholder: 'Add item' })
            ),
            TodoList({ items: this.state.items, onItemClick: this.toggleItem }),
            removeButton
        );
    }
});

React.renderComponent(TodoApp(), document.body);
