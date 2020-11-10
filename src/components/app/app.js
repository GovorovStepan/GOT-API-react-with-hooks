import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {BookPage, CharacterPage, HousePage, BooksItem} from '../pages';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotServices';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';



export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    

    render(){
        const char = this.state.showRandomChar ? <RandomChar getData={ this.gotService.getCharacter} /> : null;
        
        if (this.state.error){
            return <ErrorMessage/>
        }

        return (
        
        <Router>
            <div className='app'>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <Button className ='toggle-btn' color="info" onClick={this.toggleRandomChar}> Toggle random character </Button>
                        </Col>
                    </Row>
                    <Route path='/' component={() => <h1>Welcome to GOT DataBase. Here you can find all information about GOT</h1>} exact/>
                    <Route path='/characters' component={CharacterPage}/>
                    <Route path='/houses' component={HousePage}/>
                    <Route path='/books' exact component={BookPage}/>
                    <Route path='/books/:id' render={
                        ({match}) =>{
                            const {id} = match.params;
                         return <BooksItem bookId={id}/>}
                    }/>

                </Container>
            </div>
        </Router>
    );}
};
