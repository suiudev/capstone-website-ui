import React from 'react';
import './Cards.css';
import CardItem from './Carditem';

function Cards() {
return (
<div className='cards'>
    <h1>Our commitment to the hospitality industry</h1>
    <div className='cards__container'>
    <div className='cards__wrapper'>
        <ul className='cards__items'>
        <CardItem
            src='images/pool6.png'
            text='Quality Service'
            label='Pool'
            description='Experience the thrill of adventure with our exclusive packages.'
        />
        <CardItem
            src='images/pool1.png'
            text='Quality Service'
            label='Pool'
            description='Experience the thrill of adventure with our exclusive packages.'
        />
        <CardItem
            src='images/lafam.jpg'
            text='Quality Service'
            label='Accomodation'
            description='Experience the thrill of adventure with our exclusive packages.'
        />
        </ul>
    </div>
    </div>
</div>
);
}

export default Cards;
