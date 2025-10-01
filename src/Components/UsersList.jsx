import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearch, addUser, updateUser, deleteUser } from '../redux/usersSlice';
import styles from './UsersList.module.css';

function UsersList() {
  const dispatch = useDispatch();
  const { loading, data, error, search } = useSelector(state => state.users);

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  // edit mode states
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filtered = data.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  function onAdd(e) {
    e.preventDefault();
    if (!nameInput || !emailInput) return;
    dispatch(addUser({ name: nameInput, email: emailInput, phone: '' }));
    setNameInput('');
    setEmailInput('');
  }

  function onEditSave(id) {
    if (!editName || !editEmail) return;
    dispatch(updateUser({ id, name: editName, email: editEmail }));
    setEditId(null);
    setEditName('');
    setEditEmail('');
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          className={styles.search}
          placeholder="Search by name..."
          value={search}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
        <form className={styles.addForm} onSubmit={onAdd}>
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Name"
            className={styles.input}
          />
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Email"
            className={styles.input}
          />
          <button className={styles.btn}>Add</button>
        </form>
      </div>

      {loading && <div className={styles.loading}>Loading users...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}

      <ul className={styles.list}>
        {filtered.map(user => (
          <li key={user.id} className={styles.card}>
            <div className={styles.cardHeader}>
  {editId === user.id ? (
    <div className={styles.editInputs}>
      <input
        className={styles.input}
        value={editName}
        onChange={e => setEditName(e.target.value)}
        placeholder="Name"
      />
      <input
        className={styles.input}
        value={editEmail}
        onChange={e => setEditEmail(e.target.value)}
        placeholder="Email"
      />
    </div>
  ) : (
    <h3 className={styles.name}>{user.name}</h3>
  )}

  <div className={editId === user.id ? styles.editActions : styles.actions}>
    {editId === user.id ? (
      <button
        className={styles.saveBtn}
        onClick={() => onEditSave(user.id)}
      >
        Save
      </button>
    ) : (
      <button
        className={styles.editBtn}
        onClick={() => {
          setEditId(user.id);
          setEditName(user.name);
          setEditEmail(user.email);
        }}
      >
        Edit
      </button>
    )}

    <button
      className={styles.delBtn}
      onClick={() => dispatch(deleteUser(user.id))}
    >
      Delete
    </button>
  </div>
</div>


            {editId !== user.id && (
              <>
                <p className={styles.email}>{user.email}</p>
                <p className={styles.small}>{user.company?.name || '—'}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;