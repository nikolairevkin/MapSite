import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from "axios";
import "./Signup.css";
import {Link} from 'react-router-dom';

export default class Signup extends Component {
    userData;
    constructor(props) {
        super(props);
        this.state = {
            signupData : {
                name: "",
                email: "",
                phone: "",
                password: "",
                isLoading: "",
            },
            msg: "",
        };
    }

    onChangehandler = (e, key) => {
        const { signupData } = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({signupData});
    };
    onSubmithandler = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});
        axios
            .post("http://loaclhost:8000/api/user-signup", this.state.signupData)
            .then((response) => {
                this.setState({isLoading: false});
                if(response.data.status === 200) {
                    this.setState({
                        msg: response.data.message,
                        signupData: {
                            name: '',
                            email: '',
                            password: '',
                            phone: '',
                        }
                    });
                    setTimeout(() => {
                        this.setState({msg: ""});
                    }, 2000);
                }

                if(response.data.status === "failed") {
                    this.setState({msg: response.data.message});
                    setTimeout(() => {
                        this.setState({mag: ""});
                    }, 2000);
                }
            });
    };
    render() {
        const isLoading = this.state.isLoading;
        return(
            <div>
                <Form className="containers shadow">
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input 
                            type="name"
                            name="name"
                            placeholder="Enter your name"
                            value={this.state.signupData.name}
                            onChange = {this.onChangehandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email id</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={this.state.signupData.email}
                            onChange={this.onChangehandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone Number</Label>
                        <Input
                            type="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={this.state.signupData.phone}
                            onChange={this.onChangehandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={this.state.signupData.password}
                            onChange={this.onChangehandler}
                        />
                    </FormGroup>
                    <p className="text-white">{this.state.msg}</p>
                    <Button
                        className = "text-center mb-4"
                        color = "success"
                        onClick = {this.onSubmithandler}
                    >
                        Sign Up
                        {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm ml-5"
                                role="status"
                                aria-hidden="true"    
                            >
                            </span>
                        ) : (
                            <span></span>
                        )}
                    </Button>
                    <Link className="text-white ml-5" to="/sign-in">I`m already member</Link>
                </Form>
            </div>
        )
    }
}