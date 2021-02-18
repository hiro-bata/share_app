import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthAccess: React.FC = () => {
    
    let loginStatus = localStorage.getItem('token');

    if(loginStatus === 'true') {
        return <div>aaaaaa</div>
    } else {
        return <Redirect to="/auth" />
    }
}

export default AuthAccess;