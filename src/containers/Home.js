import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
import { RaisedButton } from 'material-ui';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {input:"", index:0}
        this.handleType = this.handleType.bind(this);
        this.saveTask = this.saveTask.bind(this);

    }
    handleType(e) {
       this.setState({ input: e.target.value });
    }
    saveTask(){
        this.setState({
            index: this.state.index +1,
            input: ''
        });
        this.props.actions.saveTask(this.state.input, this.state.index);
    }

    render() {
        const { actions, todo } = this.props;
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="text-center"><h1 >to do:</h1>
                    <TextField hintText="What is your task?" onChange={this.handleType} value={this.state.input}/>
                    <RaisedButton label="add" primary={true}  onClick={this.saveTask}/>
                </div>
                <div>
                    {
                        todo && todo.todo.map((item, index) =>
                            <div className="list" key={index}>

                                {
                                    (item.checked ===true)?(
                                        <Checkbox  style={{'textDecoration':'line-through'}} label={item.item} onClick={()=>{actions.toggleCheck(item)}}/>
                                    ):(
                                        <Checkbox   label={item.item} onClick={()=>{actions.toggleCheck(item)}}/>
                                    )
                                }

                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    actions: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    const { todo } = state;
    return {
        todo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
