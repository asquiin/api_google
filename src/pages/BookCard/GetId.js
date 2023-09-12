import React from 'react';
import { useParams } from 'react-router';
import Card from './Card';

function GetId() {
    const { id } = useParams();
    return (
        <div>
            <Card userId={id} />
        </div>
    );
}

export default GetId;