import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useTable } from 'react-table';

const App = () => {
  const [data, setData] = useState([]);
  const [lineNumbers, setLineNumbers] = useState([]);

  useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData();
    }, 30000)
  }, [])

  useEffect(() => {
    const lineNumbers = data.map(busDeparture => busDeparture.line);
    const lineNumbersWithoutDuplicates = lineNumbers.filter((lineNumber, index) => lineNumbers.indexOf(lineNumber) === index);
    setLineNumbers(lineNumbersWithoutDuplicates);
  }, [data]);
  
  const fetchData = () => {
    axios.get('http://localhost:8080/alldepartures')
      .then(response => {
        setData(response.data.allDepartures)
      })
      .catch(error => {
        console.log(error);
      })
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
        <Row>
          <Col>
            {console.log(lineNumbers)}
            <h1>Bussien myöhästymiset pysäkillä U Uhlandstraße (Berliini)</h1>

   <table {...getTableProps()}>

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

                 <td {...cell.getCellProps()} style={{textAlign: 'center'}}>

                   {// Render the cell contents

                   cell.render('Cell')}

                 </td>

               )

             })}

           </tr>

         )

       })}

     </tbody>

   </table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App;
