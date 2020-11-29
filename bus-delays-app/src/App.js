import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [lineNumbers, setLineNumbers] = useState([]);
  const [lineNumbersLoaded, setLineNumbersLoaded] = useState(false);
  const [filteredByLineNumbers, setFilteredByLineNumbers] = useState(false);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    setLineNumbersLoaded(false);
    const lineNumbers = originalData.map(busDeparture => busDeparture.line);
    const lineNumbersWithoutDuplicates = lineNumbers.filter((lineNumber, index) => lineNumbers.indexOf(lineNumber) === index);
    setLineNumbers(lineNumbersWithoutDuplicates);
    setLineNumbersLoaded(true);
  }, [originalData]);
  
  const fetchData = () => {
      axios.get('http://localhost:8080/alldepartures')
      .then(response => {
        setData(response.data.allDepartures)
        setOriginalData(response.data.allDepartures)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const filterByLineNumber = (e) => {
    setData(originalData.filter(d => d.line === e.target.value));
    const dirs = originalData.filter(d => d.line === e.target.value).map(d => d.direction);
    const directionsWithoutDuplicates = dirs.filter((direction, index) => dirs.indexOf(direction) === index);
    setDirections(directionsWithoutDuplicates);
  }

  const filterByLineNumberAndDirection = (e) => {
    setData(originalData.filter(d => d.direction === e.target.value));
  }

  const columns = useMemo(() => [
      {
        Header: 'Linja',
        accessor: 'line'
      },
      {
        Header: 'Määränpää',
        accessor: 'direction',
      },
      {
        Header: 'Myöhässä',
        accessor: 'delay'
      }
    ],
    []
  )

  const tableInstance = useTable({ columns, data })

  const {

    getTableProps,
 
    getTableBodyProps,
 
    headerGroups,
 
    rows,
 
    prepareRow,
 
  } = tableInstance

  return (
    <>
      <Container style={{padding: 30}}>
        {console.log(directions)}
        <Row>
          <Col>
            <h1>Bussien myöhästymiset pysäkillä U Uhlandstraße (Berliini)</h1>

            <h2>Suodata tuloksia</h2>

            {lineNumbersLoaded ?
            <div>
              <select id='linenumber' onChange={e => filterByLineNumber(e)}>
              <option>Linjanumero:</option>
              {lineNumbers.map((lineNumber, index) => (
                <option key={index} value={lineNumber}>{lineNumber}</option>
              ))}
            </select>
            </div>
            :
            <div>Ladataan linjanumeroita...</div>}

            {directions ?
            <div>
              <select id='direction' onChange={e => filterByLineNumberAndDirection(e)}>
              <option>Määränpää:</option>
              {directions.map((direction, index) => (
                <option key={index} value={direction}>{direction}</option>
              ))}
            </select>
            </div>
            :
            <div>Ladataan määränpäitä...</div>}

   <Table striped bordered hover {...getTableProps()}>

     <thead>

       {// Loop over the header rows

       headerGroups.map(headerGroup => (

         // Apply the header row props

         <tr {...headerGroup.getHeaderGroupProps()}>

           {// Loop over the headers in each row

           headerGroup.headers.map(column => (

             // Apply the header cell props

             <th {...column.getHeaderProps()}>

               {// Render the header

               column.render('Header')}

             </th>

           ))}

         </tr>

       ))}

     </thead>

     {/* Apply the table body props */}

     <tbody {...getTableBodyProps()}>

       {// Loop over the table rows

       rows.map(row => {

         // Prepare the row for display

         prepareRow(row)

         return (

           // Apply the row props

           <tr {...row.getRowProps()}>

             {// Loop over the rows cells

             row.cells.map(cell => {

               // Apply the cell props

               return (

                 <td {...cell.getCellProps()} >

                   {// Render the cell contents

                   cell.render('Cell')}

                 </td>

               )

             })}

           </tr>

         )

       })}

     </tbody>

   </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;
