import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onTermChange=(e)=>{
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    };

    render() {
        const {term} = this.state;

        return (
            <input type="text"
                   className="form-control search-input"
                   onChange={this.onTermChange}
                   value={term}
                   placeholder="type to search"/>
        )
    }
}