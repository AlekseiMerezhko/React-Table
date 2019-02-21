import React from 'react';
import './table.css';

export default props => (
    <table className="table">
      <thead>
        <tr>
          <th onClick={props.handleOnSort.bind(null, 'id')}>
              Id {props.sortField === 'id' ? <small>{props.sortSymbol}</small> : null}
          </th>
          <th onClick={props.handleOnSort.bind(null, 'firstName')}>
              FirstName {props.sortField === 'firstName' ? <small>{props.sortSymbol}</small> : null}
          </th>
          <th onClick={props.handleOnSort.bind(null, 'lastName')}>
              LastName {props.sortField === 'lastName' ? <small>{props.sortSymbol}</small> : null}
          </th>
          <th onClick={props.handleOnSort.bind(null, 'email')}>
              Email {props.sortField === 'email' ? <small>{props.sortSymbol}</small> : null}
          </th>
          <th onClick={props.handleOnSort.bind(null, 'phone')}>
              Phone {props.sortField === 'phone' ? <small>{props.sortSymbol}</small> : null}
          </th>          
        </tr>
      </thead>
      <tbody>
        {props.data.map(item => (
            <tr key={item.id + item.phone} onClick={props.handleRowSelect.bind(null, item)}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
        ))}
      </tbody>
    </table>
)