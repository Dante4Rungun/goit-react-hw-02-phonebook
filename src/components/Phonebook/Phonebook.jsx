import React, { Component } from "react";
import styled from "./Phonebook.module.css"
import { ContactForm } from "components/ContactForm/ContactForm";
import { nanoid } from 'nanoid'
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";
import Notiflix from "notiflix";

export class Phonebook extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        name: ''
    }
    
    addContact = () => {
        const name = document.getElementById('name').value
        const number = document.getElementById('number').value
        const id = nanoid()
        if (name === "" || number === "") {
            Notiflix.Notify.warning("Please fill all contact data")
        }
        else {
            this.setState(state => ({
                contacts: [...state.contacts, ...[{ id, name, number }]]
            }))
        }
    }

    setFilter = (event) => {
        this.setState({
            name: document.getElementById('contact-search').value
        })
    }

    search = (event) => {
        this.setFilter(document.getElementById('contact-search').value)
    }

    addContactWithCheck = (event) => {
        const name = document.getElementById('name').value
        if (this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) === undefined) {
            this.addContact()
        }
        else {
            alert(`${name} is already in contacts`)
        }
        console.log(this.state.contacts)
    }

    removeFromContacts = (event) => {  
        const changed = this.state.contacts
        console.log(this.state.contacts.findIndex(contact => contact.id === event.target.getAttribute("data-delete")))
        changed.splice(this.state.contacts.findIndex(contact => contact.id === event.target.getAttribute("data-delete")),1)
        this.setState(state => ({
            contacts: changed
        }))
    }

    render() {
        const {contacts,name} = this.state
        return (
            <div className={styled.phonebook}>
                <h1 className={styled.phonebook__title}>Phonebook</h1 >
                <ContactForm addContact={this.addContactWithCheck} />
                <h2 className={styled.phonebook__contacts}>Contacts</h2>
                <Filter setFilter={this.setFilter} />
                <ContactList contacts={contacts} filter={name} removeFromContacts={this.removeFromContacts} />
            </div>
        )
    }
}