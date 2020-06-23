import React from 'react';
import appContext from './appContext';

import skateboard from './pictures/skateboard.png';
import leftShoe from './pictures/leftShoe.png';
import rightShoe from './pictures/rightShoe.png';
import { API_URL } from './config';

class NotesPage extends React.Component {
    static contextType = appContext;
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            selectedNote: '',
            selectedNoteId: '',
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
            notes: []
        }
    }

    componentDidMount() {
        this.setState({
            username: this.context.username
        });
        this.loadTricks();
    }

    newTrick = () => {
        if(this.context.username) {
            this.context.newTrick('new trick')
                .then(response => {
                    this.loadTricks()
                })
        }
        else {
            alert('need to log in')
        }
    }

    loadTricks = () => {
        if(this.context.username) {
            this.setState({
                notes: []
            });
            fetch(`${API_URL}/api/auth/info`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                username: this.context.username  
                })
            })
                .then(res => {
                    if(!res.ok) {
                        throw new Error('error getting user info')
                    }
                    return res.json()
                })
                    .then(notes => {
                        this.setState({
                            notes: notes.notes
                        });
                    })
        }
    }

    saveNote = () => {
        if(this.context.username) {
            this.context.saveNote(this.state)
                .then(response => {
                    this.loadTricks();
                });
        }
        else {
            alert('need to log in');
        }
    }

    deleteNote = () => {
        if (this.context.username) {
            this.context.deleteNote(this.state.selectedNoteId)
                .then(response => {
                    this.loadTricks();
                })
        }
        else {
            alert('need to log in');
        }
    }

    changeNote = (event) => {
        this.setState({
            note: event.target.value
        });
    }

    changeTrickName = (event) => {
        this.setState({
            selectedNote: event.target.value
        });
    }

    selectedNote = (event) => {
        this.setState({
            selectedNote: '',
            selectedNoteId: ''
        })
    }

    loadTrick = (event) => {
        const { trick_name, id, leftfootangle, leftfootupdown, leftfootrightleft, rightfootangle, rightfootupdown, rightfootrightleft, note} = this.state.notes[event.target.id];
        this.setState({
            selectedNote: trick_name,
            selectedNoteId: id,
            leftFoot: {
                angle: leftfootangle,
                upDown: leftfootupdown,
                rightLeft: leftfootrightleft
            },
            rightFoot: {
                angle: rightfootangle,
                upDown: rightfootupdown,
                rightLeft: rightfootrightleft
            },
            note: note
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

        /* FEET POSITION HANDLER */
        const rightFootAngle = `rotate(${(this.state.rightFoot.angle/1-90 + 90).toString()}deg`;
        const rightFootUpDown = `${(this.state.rightFoot.upDown) - (-120)}px`;
        const rightFootRightLeft = `${(this.state.rightFoot.rightLeft) -80}px`;
        let rightFootStyle = {
            transform: rightFootAngle,
            top: rightFootUpDown,
            left: rightFootRightLeft
        };

        const leftFootAngle = `rotate(${(this.state.leftFoot.angle/1-90 + 90).toString()}deg`;
        const leftFootUpDown = `${(this.state.leftFoot.upDown) - 80}px`;
        const leftFootRightLeft = `${(this.state.leftFoot.rightLeft) - 40}px`;
        let leftFootStyle = {
            transform: leftFootAngle,
            top: leftFootUpDown,
            left: leftFootRightLeft
        };

        return(
            <div className='NotesPage'>
                <h1 className='title'>Notes Page</h1>
                <div className='trickName'>
                    <label><h3>Trick:</h3></label>
                    <input value={this.state.selectedNote} onChange={this.changeTrickName} className='trickInput' placeholder='trick name'></input>
                    <button onClick={this.newTrick} className='notesButton'>New Trick</button>
                    <button onClick={this.deleteNote} className='notesButton'>Delete</button>
                </div>
                <div className='row'>
                    <div className='notes insideRow'>
                        <ul>
                            {this.state.notes.map( (note, index ) => {
                                return ( <li onClick={this.loadTrick} className='noteLi' key={index} id={index} value={note.trick_name}>{note.trick_name}</li> )
                            })}
                        </ul>
                    </div>
                    <div className='settings insideRow'>
                        <form>
                            <div className='leftFoot'>
                                <h2>Left Foot</h2>
                                <span aria-label='rotate' role='img' className='remove'>🔄</span>
                                <input className='angle' type='range' min='0' max='180' value={this.state.leftFoot.angle} onChange={this.changeSettings} />
                                <span aria-label='left-right' role='img' className='remove'>↔️</span>
                                <input className='rightLeft' type='range' min='-50' max='50' value={this.state.leftFoot.rightLeft} onChange={this.changeSettings} />
                                <span aria-label='up-down' role='img' className='remove'>↕️</span>
                                <input className='upDown' type='range' min='-50' max='50' value={this.state.leftFoot.upDown} onChange={this.changeSettings} />
                            </div>
                            <div className='rightFoot'>
                                <h2>Right Foot</h2>
                                <span aria-label='rotate' role='img' className='remove'>🔄</span>
                                <input className='angle' type='range' min='0' max='180' value={this.state.rightFoot.angle} onChange={this.changeSettings} />
                                <span aria-label='right-left' role='img' className='remove'>↔️</span>
                                <input className='rightLeft' type='range' min='-50' max='50' value={this.state.rightFoot.rightLeft} onChange={this.changeSettings} />
                                <span aria-label='up-down' role='img' className='remove'>↕️</span>
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
                   <textarea className='note' value={this.state.note} onChange={this.changeNote} /> 
                   <button type='submit' className='saveButton' onClick={this.saveNote}>Save</button>
                </div>
            </div>
        )
    }
}

export default NotesPage;