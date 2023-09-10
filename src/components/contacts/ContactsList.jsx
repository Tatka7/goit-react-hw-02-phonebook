import PropTypes from 'prop-types';
import css from './ContactsList.module.css';

export default function ContactsList({ filterContacts, deleteContact }) {
  return (
    <ul className={css.list}>
      {filterContacts().map(({ id, name, number }) => {
        return (
          <li key={id} className={css.item}>
            <span className={css.data}>
              {name}: {number}
              <button
                type="button"
                className={css.button}
                id={id}
                onClick={deleteContact}
              >
                Delete
              </button>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

ContactsList.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
