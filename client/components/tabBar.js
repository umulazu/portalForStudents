import React, {useState} from 'react'
import PropTypes from 'prop-types'
import classNames from './scss/tabBar.module.scss'
import getClassNames from "../utilities/getClassnames";

const handle=(setSelectedId)=>(event) =>{
    const id = event.target.id;
    console.log('id: ' + id);
    setSelectedId(id);
};

function TabBar(props) {
    const [selectedId, setSelectedId] = useState(1);
    const {handleChanged, tabs} = props;

   /* const handleClick = (event) => {
        const id = event.target.id;

        console.log('id: ' + id);

        setSelectedId(id);

        console.log('selectedId: ' + selectedId);

        handleChanged(id);
    };*/

    const {tab} = classNames;
    const tab_selected = classNames['tab--selected'];
    const selected = getClassNames({[tab]: true, [tab_selected]: true});
    const notSelected = getClassNames({[tab]: true, [tab_selected]: false});

    const tab_bar = classNames['tab-selected'];

    //const elements =

    return (
        <div className={tab_bar}>
            {selectedId}
            {tabs.map((tab) => {
                const isSelected = (selectedId.toString() === tab.id.toString());

                console.log('selectedId: ' + selectedId);
                console.log('tab.id.toString(): ' + tab.id.toString());
                console.log('isSelected: ' + isSelected);

                return <button
                    id={tab.id}
                    key={tab.id}
                    className={isSelected ? selected : notSelected}
                    onClick={handle(setSelectedId)}>
                    {tab.text}
                </button>
            })}
        </div>
    )
}

TabBar.propTypes = {
    handleChanged: PropTypes.func.isRequired,
    tabs: PropTypes.array.isRequired
};

export default TabBar