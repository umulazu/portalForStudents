import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from './scss/tabBar.module.scss'
import getClassNames from "../utilities/getClassnames";

class TabBar extends Component {
    /*constructor(props){
        super(props);
        this.state = {selectedId: 1};
    }*/

    handleClick = (event) => {
        const id = event.target.id;
        //this.setState({selectedId: id});
        this.props.handleChanged(id);
    };

    render() {
        const {tabs, selectedId} = this.props;
        const {tab} = classNames;
        const tab_selected = classNames['tab--selected'];
        const selected = getClassNames({[tab]: true, [tab_selected]: true});
        const notSelected = getClassNames({[tab]: true, [tab_selected]: false});

        const tab_bar = classNames['tab-selected'];

        return (
            <div className={tab_bar}>
                {tabs.map((tab) => {
                    const isSelected = (selectedId.toString() === tab.id.toString());
                    return <button
                        id={tab.id}
                        key={tab.id}
                        className={isSelected ? selected : notSelected}
                        onClick={this.handleClick}>
                        {tab.text}
                    </button>
                })}
            </div>
        )
    }
}

TabBar.propTypes = {
    handleChanged: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired
};

export default TabBar