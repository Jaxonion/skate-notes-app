import React from 'react';
import appContext from './appContext';

import skateboard from './pictures/skateboard.png';
import leftShoe from './pictures/leftShoe.png';
import rightShoe from './pictures/rightShoe.png';

class NotesPage extends React.Component {
    static contextType = appContext;
    constructor(props) {
        super(props)
        this.state = {
            leftFoot: {
                angle: '90',
                upDown: '0',
                rightLeft: '0'
            },
            rightFoot: {
                angle: '90',
                upDown: '0',
                rightLeft: '0'
            },
            note: '',
            testNotes: {
                kickflip: {
                    leftFoot: {
                        angle: '90',
                        upDown: '0',
                        rightLeft: '0'
                    },
                    rightFoot: {
                        angle: '90',
                        upDown: '0',
                        rightLeft: '0'
                    }
                }
            }
        }
    }

    saveNote = () => {
        this.context.saveNote(this.state.note)
    }

    changeNote = (event) => {
        this.setState({
            note: event.target.value
        })
    }

    changeSettings = (event) => {
        let parentElement = event.target.parentElement.className;
        let elementClassName = event.target.className;
        let elementValue = event.target.value;
        let other = this.state[parentElement];

        this.setState({
            [parentElement]: {
                ...other,
                [elementClassName]: elementValue
            }
        })
    }

    render() {
        /* LIST OF TRICKS */
        const listElements = ['kickflip', 'heelflip',]
        const element = <li>hey</li>

        /* FEET POSITION HANDLER */
        const rightFootAngle = `rotate(${(this.state.rightFoot.angle/1-90 + 90).toString()}deg`;
        const rightFootUpDown = `${(this.state.rightFoot.upDown) - (-120)}px`;
        const rightFootRightLeft = `${(this.state.rightFoot.rightLeft) -120}px`;
        let rightFootStyle = {
            transform: rightFootAngle,
            top: rightFootUpDown,
            left: rightFootRightLeft
        };

        const leftFootAngle = `rotate(${(this.state.leftFoot.angle/1-90 + 90).toString()}deg`;
        const leftFootUpDown = `${(this.state.leftFoot.upDown) - 80}px`;
        const leftFootRightLeft = `${(this.state.leftFoot.rightLeft) - 70}px`;
        let leftFootStyle = {
            transform: leftFootAngle,
            top: leftFootUpDown,
            left: leftFootRightLeft
        };

        return(
            <div className='NotesPage'>
                <h1>Notes Page</h1>
                <div className='row'>
                    <div className='notes insideRow'>
                        <ul>
                            <li>note 1</li>
                            <li>note 2</li>
                            <li>note 3</li>
                        </ul>
                    </div>
                    <div className='settings insideRow'>
                        <form>
                            <div className='leftFoot'>
                                <h2>Left Foot</h2>
                                <input className='angle' type='range' min='0' max='180' value={this.state.leftFoot.angle} onChange={this.changeSettings} />
                                <input className='rightLeft' type='range' min='-50' max='50' value={this.state.leftFoot.rightLeft} onChange={this.changeSettings} />
                                <input className='upDown' type='range' min='-50' max='50' value={this.state.leftFoot.upDown} onChange={this.changeSettings} />
                            </div>
                            <div className='rightFoot'>
                                <h2>Right Foot</h2>
                                <input className='angle' type='range' min='0' max='180' value={this.state.rightFoot.angle} onChange={this.changeSettings} />
                                <input className='rightLeft' type='range' min='-50' max='50' value={this.state.rightFoot.rightLeft} onChange={this.changeSettings} />
                                <input className='upDown' type='range' min='-50' max='50' value={this.state.rightFoot.upDown} onChange={this.changeSettings} />
                            </div>
                        </form>
                    </div>
                    <div className='picture-container insideRow'>
                        <img src={skateboard} className='skateboard' alt='skateboard' />
                        <img src={leftShoe} className='leftShoe' alt='leftShoe' style={leftFootStyle} />
                        <img src={rightShoe} className='rightShoe' alt='rightShoe' style={rightFootStyle} />
                    </div>
                </div>
                <div className='trickNote'>
                    <h2>Notes</h2>
                   <textarea className='note' onChange={this.changeNote} /> 
                   <button type='submit' onClick={this.saveNote}>Save</button>
                </div>
            </div>
        )
    }
}

export default NotesPage;