import React from 'react'

const ListClients = ({name, age, type}, index) => {

  return (
    <tr key={index}>
      <td>{name}</td>
      <td>{age}</td>
      <td>{type}</td>
    </tr>
  )
}

export default ListClients