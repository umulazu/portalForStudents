import React, { Component } from 'react'
import UserControls from '../authorization/components/userControls'
import DateControl from '../components/dateControl'
import ButtonPanel from '../buttonPanel/components/buttonPanel'
import classNames from './scss/appbar.module.scss';
import TabBar from "../components/tabBar";

class Appbar extends Component {
    render() {
        let tabs=[
            {
                id: 1,
                text: "oneoneone"
            },
            {
                id:2,
                text: "twotwotwo"
            }
        ]
        return (
            <div className={classNames.appbar}>
                <DateControl/>
                <ButtonPanel/>
                <TabBar handleChanged={(id) => console.log(id)} tabs={tabs}/>
                <UserControls/>
            </div>
        )
    }
}

export default Appbar
