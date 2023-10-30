import React, { useState, useRef, useEffect } from "react";
import ListadeContactos from "./Componente/ListadeContactos";
export default function App() {

    //state-----------------------------------------

    const [contacto, setContacto] = useState(() => {
        return {
            nome: '',

            telefone: ''
        }
    })

    const [listadecontacto, setListadecontacto] = useState(() => { return [] })
    // useref
    const inputNome = useRef()
    const inputNumero = useRef()

    //metodos----------------------------------------


    function definirNome(event) {
        setContacto({ ...contacto, nome: event.target.value })
    }

    function definirNumero(event) {
        setContacto({ ...contacto, telefone: event.target.value })
    }

    //button

    function AdicionarContacto() {


        if (contacto.nome === '' || contacto.telefone === '') return (
            alert('Preencha o campo em branco')
        )


        //verificar se o contact ja existe

        let duplicado = listadecontacto.find((ct) => ct.nome === contacto.nome && ct.telefone === contacto.telefone)

        if (typeof duplicado !== 'undefined') {

            alert('Numero de telefone ja existente')

            inputNumero.current.focus()

            return
        }

        //undefined

        setListadecontacto([...listadecontacto, contacto])

        //deixando os input limpos

        setContacto({ nome: '', telefone: '' })

        //colocando focus

        inputNome.current.focus()


    }

    function enter(event) {

        if (event.code === 'NumpadEnter') {

            return AdicionarContacto()
        }

        if (event.code === 'Enter') {

            return AdicionarContacto()
        }
    }

    // local storage
    //actualizar a lista de contactos no local storage
    //procurrar se existe um item e se exeste carrega para a minha lista de contactos
    useEffect(() => { 
        if(localStorage.getItem('meus_contactos')!== null){
            setListadecontacto(JSON.parse(localStorage.getItem('meus_contactos')))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('meus_contactos', JSON.stringify(listadecontacto))
    }, [listadecontacto])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Minha Lista de Contatos</h1>
            <hr className="my-4 border-t border-gray-300" />

            <div className="mb-4">
                <label htmlFor="nome" className="block">Nome:</label>
                <input type="text" id="nome" ref={inputNome} onChange={definirNome} value={contacto.nome} placeholder="Introduza o seu nome" className="w-full px-3 py-2 border rounded" />
            </div>

            <div className="mb-4">
                <label htmlFor="telefone" className="block">Telefone:</label>
                <input type="number" id="telefone" ref={inputNumero} onChange={definirNumero} onKeyUp={enter} value={contacto.telefone} placeholder="Introduza o seu número" className="w-full px-3 py-2 border rounded" />
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={AdicionarContacto}>Adicionar Contato</button>
            <hr className="my-4 border-t border-gray-300" />
            <h3 className="text-xl">Lista de Contatos:</h3>
            <ListadeContactos Listadecontactos={listadecontacto} />
        </div>

    )
}