import React, { useImperativeHandle, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import DivMessageErrors from './DivMessageErrors'

const FormClient = forwardRef(({ updateList, list }, ref) => {
  const {register, handleSubmit, formState: { errors }, setValue} = useForm();


  const onSubmit = (data) => {

    const clients = localStorage.getItem('clients')
    ? JSON.parse(localStorage.getItem('clients'))
    : ''

    localStorage.setItem('clients', JSON.stringify([...clients, data]))

    updateList([...list, data])

    setValue("name", "")
    setValue("age", "")
    setValue("type", "")
  }

  const onLoadData = ({name, age,}) => {
    setValue("name", name);
    setValue("age", age);
  }

  useImperativeHandle(ref, () => ({
    onLoadData
  }))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <div className="input-group-prepend">
            <span className="input-group-text">Nome:</span>
          </div>
          <input
            type="text"
            className="form-control"
            {...register("name", {
              required: true,
              minLenght: 2,
            })}
            autoFocus
          />
        <div className="input-group-prepend">
          <span className="input-group-text">Idade:</span>
        </div>
        <input 
          type="number" 
          className="form-control" 
          {...register("age", {
            required: true,
            max: 99
          })}
        />
      </div>
      <DivMessageErrors errors={errors} />
      <div className="form-check-inline mt-3 mb-5">
        <label className="form-check-label">
          <input 
            type="radio" 
            className="form-check-input" 
            name="opt" 
            value="Normal"
            {...register("type", {
              required: false,
            })}
          />Normal
        </label>
      </div>
      <div className="form-check-inline">
        <label className="form-check-label">
          <input 
            type="radio" 
            className="form-check-input" 
            name="opt" 
            value="Preferencial"
            {...register("type", {
              required: false,
            })}
          />Preferencial
        </label>
      </div>
      <input type="submit" className="btn btn-primary ml-3" value="Adicionar" />
    </form>
  )
})

export default FormClient