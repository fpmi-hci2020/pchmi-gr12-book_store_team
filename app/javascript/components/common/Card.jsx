import React from 'react';

const card = ({ size, active, text, link }) => {
    const type = active ? 'active' : null;
    return (
        // <div className={`card ${size} ${type}`}>
        //     <NavLink to={link} activeStyle={{textDecoration: 'none', color: 'black', active: 'none'}}>
        //         <p className={'title'}>{text}</p>
        //     </NavLink>
        // </div>

        <a href={link} className={`card ${size} ${type}`}>
            <p className={'title'}>{text}</p>
        </a>
    )
}

export default card;