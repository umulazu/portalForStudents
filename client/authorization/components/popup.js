import React, {Component} from 'react'
import * as ReactDOM from 'react-dom';
import classNames from './scss/popup.module.scss';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.modal = document.createElement('div');
        this.modal.className = classNames.popup;
    }

    componentDidMount() {
        document.getElementById('root').appendChild(this.modal);
    }

    componentWillUnmount() {
        document.getElementById('root').removeChild(this.modal);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.modal,
        );
    }
}

export default Popup