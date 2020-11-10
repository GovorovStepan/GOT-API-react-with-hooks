import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';


const Ul = styled.ul`
        cursor: pointer;
`;
const Li = styled.li`
        cursor: pointer;
        padding: 0.75rem 1.25rem;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
`;

 function ItemList({getData, renderItem, onItemSelected}){

    const [itemList, updateList] = useState([]);

    useEffect(()=>{
        getData()
        .then((data)=>{
            updateList(data)
        })
    }, [])




   function  renderItems(arr){
        return arr.map((item) => { 

            const {id} = item;

            const label = renderItem(item);

            return(
            <Li 
            key = {id}
            onClick={() => onItemSelected(id)}>
                {label}
            </Li>
        )

        })
    }

        if (!itemList){ 
            return <Spinner/>

        }

        const items = renderItems(itemList);

        return (
            <Ul>
                {items}
            </Ul>
        );
    
}

export default ItemList;