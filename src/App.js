import React, { Component } from 'react';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import _ from 'lodash';
import DetailRowView from './DetailRowView/DetailRowView';
import ModeSelector from './ModeSelector/ModeSelector';
import ReactPaginate from 'react-paginate';
import TableSearch from './TableSearch/TableSearch'


class App extends Component {
  state = {
    isLoading : false,
    data: [],
    sort: "asc", //desc
    sortField: 'id',
    sortSymbol: '∨',
    row: null,
    isModeSelected: false,
    currentPage: 0,
    search: '',


  }
  handleOnSort = sortField => {
    const clonedData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    


    const sortSymbol = this.state.sortSymbol === '∨' ? '∧' : '∨';
    const orderedData = _.orderBy(clonedData, sortField, sortType);
    this.setState({
      data: orderedData,
      sort: sortType,
      sortField,
      sortSymbol
    })
  }


  handleRowSelect = (row) => {
    this.setState({
      row
    })
  }


  handlePageClick = ({selected}) => {
    this.setState({currentPage: selected})
  }

  getFilteredData(){
    const {data, search} = this.state;

    if(!search){
      return data
    }

    return data.filter(item => {
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
       ||  item['lastName'].toLowerCase().includes(search.toLowerCase())
       ||  item['phone'].toLowerCase().includes(search.toLowerCase());
    })
  }


  handleModeSelector = (url) => {
    this.setState({
      isModeSelected: true,
      isLoading: true
    });
    this.fetchData(url);
  }

  handleSearchTable = search => {
    this.setState({search, currentPage: 0})

  }


  async fetchData(url){
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })

      
  }

  render() {
    const {sort, sortField, sortSymbol } = this.state;
    const pageSize = 50;
    const filteredData = this.getFilteredData();
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage];
    const pageCount = Math.ceil(filteredData.length / pageSize) ;

    if(!this.state.isModeSelected){
      return(
        <div className="container">
          <ModeSelector onSelect={this.handleModeSelector} />
        </div>
      )
    }
    return (
      <div className="container">
        {
          this.state.isLoading
            ? <Loader/> 
            : <React.Fragment>
              <TableSearch onSearch={this.handleSearchTable} />
              <Table
              sortSymbol={sortSymbol}
              sort={sort}
              sortField={sortField}
              data={displayData}
              handleOnSort={this.handleOnSort}
              handleRowSelect={this.handleRowSelect}
            />
            </React.Fragment>
            
        }
        {
          this.state.data.length > pageSize
          ? <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName	={'page-item'}
          previousClassName={'page-item'}
          nextClassName= {'page-item'}
          previousLinkClassName = {'page-link'}
          nextLinkClassName = {'page-link'}
          pageLinkClassName = {"page-link"}
          forcePage={this.state.currentPage}
        />
        : null

        }
        {
          this.state.row
            ? <DetailRowView person={this.state.row}/>
            : null
        }
        
      </div>
    );
  }
}

export default App;
