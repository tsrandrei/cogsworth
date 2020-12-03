import React, { Component } from 'react';
import classes from './ColorPicker.module.css';
import iro from '@jaames/iro';

class ColorPicker extends Component {
    componentDidMount() {
        // create a new iro color picker and pass component props to it
        this.colorPicker = new iro.ColorPicker(this.el, {...this.props, width: 170});
        this.colorPicker.on('color:change', (color) => {
            if (this.props.onColorChange) this.props.onColorChange(color);
        });
    }

    componentDidUpdate() {
        // // update color
        if(this.props.activeLight){
            this.colorPicker.color.set(this.props.activeLight.color);
            this.colorPicker.setState(this.props);
        }

    }

    render() {
        const activeClasses = [classes.Picker];

        if (this.props.activeLight){
            activeClasses.push(classes.Active)
        }

        return (
            <div
                className={activeClasses.join(' ')}
                ref={el => this.el = el} />
        );
    }
}

export default ColorPicker;
