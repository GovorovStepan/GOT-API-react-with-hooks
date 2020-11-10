import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Ul = styled.ul`
        cursor: pointer;
`;
const Li = styled.li`
        cursor: pointer;
        padding: 0.75rem 1.25rem;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
`;

export default class ItemList extends Component {

    state= {
        itemList: null
    }

    componentDidMount(){
        const {getData} = this.props;

        getData()
            .then((itemList)=>{
                this.setState({
                    itemList
                })
            }).catch(() => {this.onError()});
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr){
        return arr.map((item) => { 
            const {id} = item;
            const label = this.props.renderItem(item);
            return(
            <Li 
            key = {id}
            onClick={() => this.props.onItemSelected(id)}>
                {label}
            </Li>
        )

        })
    }

    onError(status){
        this.setState({
            itemList: null,
            error: true
        })
    }

    render() {

        const {itemList, error} = this.state;

        if(error){
            return <ErrorMessage/>
        }

        if (!itemList){ 
            return <Spinner/>

        }

        const items = this.renderItems(itemList);

        return (
            <Ul>
                {items}
            </Ul>
        );
    }
}