import React from 'react';

import styles from './Logout.module.sass';

function Logout() {
    return (<button className={styles["app"]} onClick={() => {
            document.cookie = 'x-session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            window.location.href = '/'
    }}>logout</button>);
}

export default Logout;