import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';


const Formulario = ({ guardarGasto, guardarCrearGasto }) => {

    //STATES
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const guardarNombreGasto = e => {
        guardarNombre(e.target.value);
    };

    const guardarCantidadGasto = e => {
        guardarCantidad(parseInt(e.target.value, 10));
    };

    //Guardar gastos
    const guardarGastos = e => {
        e.preventDefault();

        if (nombre.trim() === '' || cantidad < 1 || isNaN(cantidad)) {
            guardarError(true);
            return;
        } else {
            guardarError(false);
            const gasto = {
                nombre,
                cantidad,
                id: shortid.generate()
            }

            guardarGasto(gasto);
            guardarCrearGasto(true);

            // Borrar formulario
            guardarNombre('');
            guardarCantidad(0);
        }
    };

    return (
        <form
            onSubmit={guardarGastos}
        >
            <h2>Agrega tus gastos aquí </h2>

            {error ? <Error mensaje="Ambos campos son OBLIGATORIOS, o presupuesto 
            INCORRECTO" /> : null}

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={guardarNombreGasto}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={guardarCantidadGasto}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar gasto"
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;
