import React from 'react';

export default props => {
  const smallUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

  const bigUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

  return(
    <div style={{display:'flex', justifyContent: "center", padding: "20px"}}>
      <button onClick={ () => {props.onSelect(smallUrl)}}  className="btn btn-primary">32 User</button>
      <button onClick={ () => {props.onSelect(bigUrl)}}  className="btn btn-warning">1000 User</button>
    </div>
  )
}

