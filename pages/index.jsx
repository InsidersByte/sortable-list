import React from 'react';
import ReactDOM from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies
import { SortableContainer, SortableItem, move } from '../src';
import './index.styl';

const styles = {
    code: {
        backgroundColor: '#f9f2f4',
        borderRadius: 4,
        color: '#c7254e',
        fontSize: '90%',
        padding: '2px 4px',
    },
    item: {
        cursor: 'move',
    },
};

const createItem = number => ({ id: number, position: number * 1000000 });
const createItems = (length = 5) => {
    const items = [];

    for (let i = 1; i <= length; i++) {
        items.push(createItem(i));
    }

    return items;
};

class App extends React.Component {
    state = {
        items: createItems(),
    };

    onMove = ({ sourceId, targetId }) => {
        const items = move({ sourceId, targetId, data: this.state.items });
        this.setState({ items });
    };

    onDrop() {
        alert('Why don\'t you do something cool on drop!');
    }

    render() {
        const { items } = this.state;

        return (
            <div>
                <SortableContainer>
                    {items.map(item =>
                        <SortableItem
                            key={item.id}
                            id={item.id}
                            onMove={this.onMove}
                            onDrop={this.onDrop}
                        >
                            <p style={styles.item}>
                                {item.id}
                            </p>
                        </SortableItem>
                    )}
                </SortableContainer>

                <pre>
                    <code style={styles.code}>
                        {JSON.stringify(items, null, 2)}
                    </code>
                </pre>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
