import React from "react";
import { v4 as chave } from 'uuid';

export default function ({ Listadecontactos }) {
    return (
        <div className="my-4">
        {Listadecontactos.map(contacto => {
            return (
                <div key={chave()} className="bg-white p-4 mb-2 rounded shadow-md">
                    <span className="font-bold">{contacto.nome}</span> - {contacto.telefone}
                </div>
            )
        })}
    </div>
    
    )
}