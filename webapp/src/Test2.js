import React from 'react';

function Test2(props) {
    return(
        <div className="test">
            <input type="text" name="message" value={props.message} onChange={props.onChange} />
            <input type="submit" value="Hi" />
        </div>
    );
}

export default Test2;