import React, {Fragment} from 'react';

const Layout = props => {
    return (
        <Fragment>
            <h2>Header</h2>
            <main>
                {props.children}
            </main>
        </Fragment>
    );
};

export default Layout;
