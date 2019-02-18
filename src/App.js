import 'react-contexify/dist/ReactContexify.min.css'
import logo from './static/logo.svg'
import './style/App.css'

import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'
import FamilyTree from './components/FamilyTree'

const serverUrl = 'bearlog.org/GenTrees';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '???',
            isAuthenticated: false,
            alert: null
        };

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

        this.refUserName = React.createRef();
        this.refPassword = React.createRef();
        this.refPassword2 = React.createRef();
        this.refEmail = React.createRef();
    }

    componentDidMount() {
        fetch('http://gentrees.bearlog.org/Account/TestMessage')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({message: result.Message});
                },
                (error) => {
                    this.setState({message: error.message});
            });
    }

    login(){
        let userName = this.refUserName.current.value;
        let password = this.refPassword.current.value;

        console.log(userName + ' ' + password);

        this.showAlert('login', 'Wrong login or password');

        // fetch()
    }

    register(){

    }

    showAlert(state, error){
        let innerStyle = {
            width: 'auto',
            maxWidth: '70%'
        };
        let errorStyle = {
            color: 'red'
        };

        let errorText = '';
        if(error != null) errorText = (<div style={errorStyle}> {error} </div>);

        if(state === 'login'){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle}
                                title="Login"
                                showCancel
                                onCancel={this.hideAlert}
                                onConfirm={() => this.login()}
                                onClick={(e) => e.stopPropagation()}>
                        <div>
                            {errorText}
                            <div>
                                <label className='edit-form-label' htmlFor='userName'> UserName: </label>
                                <input className='edit-form-input' id='userName' ref={this.refUserName} type='text'/>
                            </div>
                            <div>
                                <label  className='edit-form-label' htmlFor="password"> Password: </label>
                                <input className='edit-form-input' id='password' ref={this.refPassword} type='password'/>
                            </div>
                        </div>
                    </SweetAlert>
                )
            });
        }
        else if(state === 'register'){
            this.setState({
                alert: (
                    <SweetAlert style={innerStyle} showCancel title="Register" onCancel={this.hideAlert}
                                onConfirm={() => this.register()} onClick={(e) => e.stopPropagation()}>
                        <div>
                            <div>
                                <label className='edit-form-label' htmlFor='userName'> UserName: </label>
                                <input className='edit-form-input' id='userName' ref={this.refUserName} type='text'/>
                            </div>
                            <div>
                                <label className='edit-form-label' htmlFor='email'> Email: </label>
                                <input className='edit-form-input' id='email' ref={this.refEmail} type='email'/>
                            </div>
                            <div>
                                <label  className='edit-form-label' htmlFor="password"> Password: </label>
                                <input className='edit-form-input' id='password' ref={this.refPassword} type='password'/>
                            </div>
                            <div>
                                <label  className='edit-form-label' htmlFor="password2"> Repeat Password: </label>
                                <input className='edit-form-input' id='password2' ref={this.refPassword2} type='password'/>
                            </div>
                        </div>
                    </SweetAlert>
                )
            });
        }
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    content() {
        if(this.state.isAuthenticated)
            return (<FamilyTree/>);
        else
            return (
                <div className='field'>
                    Please, <button type="button" className="btn btn-primary" onClick={() => this.showAlert('login')}>Login</button><br/>
                    or <button type="button" className="btn btn-info" onClick={() => this.showAlert('register')}>Register</button>
                </div>
            );
    }

    hideAlert(){
        this.setState({
            alert: null
        })
    }

    processInput(){

    }

    showLoginForm() {
        let innerStyle = {
            width: 'auto',
            maxWidth: '70%'
        };

        this.setState({
            alert: (
                <SweetAlert style={innerStyle} showCancel title="Registering..." onCancel={this.hideAlert}
                            onConfirm={() => this.processInput()} onClick={(e) => e.stopPropagation()}>
                    <div>
                        <div>
                            <label className='edit-form-label' htmlFor='login'> Login: </label>
                            <input className='edit-form-input' id='login' ref={this.refLogin} type='text'/>
                        </div>
                        <div>
                            <label  className='edit-form-label' htmlFor="email"> Email: </label>
                            <input className='edit-form-input' id='email' ref={this.refEmail} type='text'/>
                        </div>
                        <div>
                            <label  className='edit-form-label' htmlFor="password"> Email: </label>
                            <input className='edit-form-input' id='password' ref={this.refEmail} type='text'/>
                        </div>
                        <div>
                            <label  className='edit-form-label' htmlFor="email"> Email: </label>
                            <input className='edit-form-input' id='email' ref={this.refEmail} type='text'/>
                        </div>
                    </div>
                </SweetAlert>
            )
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img style={{float: 'left'}} src={logo} className="App-logo" alt="logo"/>
                    <div style={{float: 'left'}}>
                        <div className="App-title">Genealogy Trees</div>
                        <div className="App-hint">Right-click to see menu</div>
                    </div>
                    <div style={{float: 'right', textAlign: 'right'}} className='App-hint'>
                        <div>v0.0.0.9</div>
                        <div>{this.state.message}</div>
                    </div>
                </header>
                {this.content()}
                {this.state.alert}
            </div>
        );
    }
}

export default App;
