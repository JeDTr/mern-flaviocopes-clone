import React from 'react';

class Hello extends React.Component {
    static defaultProps = {
        name: 'World',
        bar: 'Bar'
    }
    static displayName = 'Foo';
    // static propTypes = { bar: PropTypes.string };

    state = { hello: 'Hello'}

    render() {
        return (
            <div>
                <h1>{this.state.hello} + {this.props.name}</h1>
            </div>
        )
    }
}

export default Hello;