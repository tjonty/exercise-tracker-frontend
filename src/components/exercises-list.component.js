import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./CSS/component.css";

const Exercise = props => (
    <tr>
        <td>{ props.exercise.username }</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }} >delete</a>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []}
    }

    componentDidMount() {
        axios.get('https://exercise-tracker-nr.herokuapp.com/exercises/')
            .then(res => {
                this.setState({ exercises: res.data })
            })
            .catch((err) => console.log(err));
    }

    deleteExercise(id) {
        axios.delete('https://exercise-tracker-nr.herokuapp.com/exercises/'+id)
            .then(res => console.log(res))
            
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })        
    }

    exerciseList() {
        return this.state.exercises.map( currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={ this.deleteExercise } key={currentexercise._id} />;
        })
    }
    
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.exerciseList() }
                </tbody>
            </table>
        )
    }
}