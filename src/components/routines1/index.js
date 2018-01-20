import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ROUTINES } from '../../constants'

class Routines extends Component {
    render() {
        return(
            <div>
                <h1>Routines</h1>
                <ul>
                    {ROUTINES.map(r => 
                        <div>
                            <li>{r.name}</li>
                            <ul>
                                {r.exercises.map(e => {
                                    let exercise = this.props.exercises.find(ex => ex.id === e.id)

                                    return <li key={exercise.id}>{exercise.name}</li>
                                })}
                            </ul>
                        </div>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { exercises: state.exercises }
}

export default connect(mapStateToProps)(Routines)