import React, { useState, useEffect, useRef } from 'react'
import SideImage from './SideImage'
import FormClient from './FormClient'
import ListClients from './ListClients'

const AppBody = () => {

  const [list, setList] = useState([])
  const childRef = useRef()
  const [nextClient, setNextClient] = useState('')

  useEffect(() => {
    setList(localStorage.getItem('clients')
      ? JSON.parse(localStorage.getItem('clients'))
      : [])
  }, [])

  const updateList = (data) => {
    setList(data)
  }

  const handleNormalAtendance = (e) => {
    e.preventDefault()

    const clients = JSON.parse(localStorage.getItem('clients'))
    let exist = false

    for (let i = 0; i < clients.length; i++) {
      if (clients[i].type === "Normal") {
        setNextClient(clients[i].name)
        clients.splice([i], 1)
        exist = true
        break
      }
    }

    if (!exist) {
      setNextClient("Não há clientes nesta fila.")
    }

    localStorage.setItem('clients', JSON.stringify(clients))

    setList(clients)
  }

  const handlePreferentialAtendance = (e) => {
    e.preventDefault()

    const clients = JSON.parse(localStorage.getItem('clients'))
    let exist = false


    for (let i = 0; i < clients.length; i++) {
      if (clients[i].type === "Preferencial") {
        setNextClient(clients[i].name)
        clients.splice([i], 1)
        exist = true
        break
      }
    }

    if (!exist) {
      setNextClient("Não há clientes nesta fila.")
    }

    localStorage.setItem('clients', JSON.stringify(clients))

    setList(clients)
  }
  

  return (
    <div className="row mt-5">
      <SideImage />

      <div className="col-sm-8 mt-2">
        <FormClient 
          list={list}
          updateList={updateList}
          ref={childRef}
        />
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary ml-3" onClick={handleNormalAtendance}>Atendimento Normal</button>
          <button className="btn btn-success ml-3" onClick={handlePreferentialAtendance}>Atendimento Preferencial</button>
        </div>


          <h1 className="my-5 d-flex justify-content-center">{nextClient}</h1>

      
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th>Nome do Cliente</th>
              <th>Idade</th>
              <th>Tipo de Atendimento</th>
            </tr>
          </thead>
          <tbody>
            {list.map((client) => {
              return (ListClients(client))
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppBody