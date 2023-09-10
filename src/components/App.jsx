import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

import Section from './section/Section';
import Form from './phonebook/Form';
import ContactsList from './contacts/ContactsList';
import Filter from './filter/Filter';

Notify.init({
  fontSize: '20px',
  width: '400px',
  position: 'top-center',
  cssAnimationDuration: 500,
  cssAnimationStyle: 'zoom',
});

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = evt => {
    evt.preventDefault();
    const contacts = this.state.contacts;
    const form = evt.currentTarget;
    const nameValue = form.elements.name.value;
    const numberValue = form.elements.number.value;
    const currentSubmit = {
      name: nameValue,
      number: numberValue,
      id: nanoid(),
    };
    if (this.checkOriginalNames(contacts, nameValue)) {
      Notify.failure(`${nameValue} is already in contacts list`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, currentSubmit],
      }));
    }
    form.reset();
  };

  onFilterChange = evt => {
    const filterValue = evt.currentTarget.value.toLowerCase();
    this.setState({ filter: filterValue.trim() });
  };

  checkOriginalNames = (contacts, contact) => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === contact.toLowerCase()
    );
  };
  deleteContact = evt => {
    const contacts = this.state.contacts;
    const contactId = evt.currentTarget.id;
    const newArr = contacts.filter(({ id }) => id !== contactId);
    this.setState({ contacts: newArr });
  };
  filter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };
  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={css.container}>
        <Section title="Phonebook">
          <Form addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          {contacts.length !== 0 && (
            <>
              <Filter changeFilter={this.onFilterChange} value={filter} />
              <ContactsList
                filterContacts={this.filter}
                deleteContact={this.deleteContact}
              />
            </>
          )}
        </Section>
      </div>
    );
  }
}
