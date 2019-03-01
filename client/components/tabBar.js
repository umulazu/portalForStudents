import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from './scss/tabBar.module.scss'
import getClassNames from "../utilities/getClassnames";

class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedId: -1};
    }

    handleChanged = (event) =>{
        const {handleChanged} = this.props;
        const id = event.target.id;
        console.log(id);

        this.setState({selectedId: id});
        handleChanged(id);
    };

    render() {
        const {tabs} = this.props;

        const {tab} = classNames;
        const tab_selected = classNames['tab--selected'];
        const selected = getClassNames({[tab]: true, [tab_selected]: true});
        const notSelected = getClassNames({[tab]: true, [tab_selected]: false});

        const elem = tabs.map((tab) => {
            const isSelected = (this.state.selectedId === tab.id);
            return <button
                id={tab.id}
                className={isSelected ? selected : notSelected}
                onClick={this.handleChanged}>
                {tab.text}
            </button>
        });

        const tab_bar = classNames['tab-selected'];

        return (
            <div className={tab_bar}>
                {elem}
            </div>
        )
    }
}

TabBar.propTypes = {
    handleChanged: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired
};

export default TabBar