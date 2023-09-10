import PropTypes from 'prop-types';
import css from './Form.module.css';

export default function Form({ addContact }) {
  return (
    <form className={css.form} onSubmit={addContact}>
      <input
        type="text"
        name="name"
        className={css.input}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        placeholder="Write name"
      />
      <input
        type="tel"
        name="number"
        className={css.input}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        placeholder="Write number"
      />
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = { addContact: PropTypes.func.isRequired };
