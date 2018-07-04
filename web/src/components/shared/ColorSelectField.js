import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
    red500,
    pink500,
    purple500,
    deepPurple500,
    indigo500,
    blue500,
    lightBlue500,
    cyan500,
    teal500,
    green500,
    lightGreen500,
    lime500,
    yellow500,
    amber500,
    orange500,
    deepOrange500,
    brown500,
    blueGrey500,
    grey500,
} from 'material-ui/styles/colors';
import Palette from 'material-ui/svg-icons/image/palette';

class ColorSelectField extends Component {
    render() {
        let colors = [ 
            { name: 'Red', color: red500 }, 
            { name: 'Pink', color: pink500 }, 
            { name: 'Purple', color: purple500 }, 
            { name: 'Deep Purple', color: deepPurple500 }, 
            { name: 'Indigo', color: indigo500 }, 
            { name: 'Blue', color: blue500 }, 
            { name: 'Light Blue', color: lightBlue500 }, 
            { name: 'Cyan', color: cyan500 }, 
            { name: 'Teal', color: teal500 }, 
            { name: 'Green', color: green500 }, 
            { name: 'Light Green', color: lightGreen500 }, 
            { name: 'Lime', color: lime500 },
            { name: 'Yellow', color: yellow500 }, 
            { name: 'Amber', color: amber500 }, 
            { name: 'Orange', color: orange500 }, 
            { name: 'Deep Orange', color: deepOrange500 },
            { name: 'Brown', color: brown500 },
            { name: 'Blue Grey', color: blueGrey500 },
            { name: 'Grey', color: grey500 },
        ];

        return (
            <SelectField { ...this.props }>
                {colors.map((color, index) => 
                    <MenuItem 
                        key={index} 
                        value={color.color} 
                        primaryText={color.name}
                        leftIcon={<Palette color={color.color}/>}
                    />
                )}
            </SelectField>
        );
    }
}

export default ColorSelectField;