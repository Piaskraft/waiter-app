import { API_URL } from '../config';

/* selectors */
export const getAllTables = state => state.tables;
export const getTableById = (state, id) =>
  state.tables.find(t => t.id === Number(id));

/* action name creator */
const createActionName = actionName => `app/tables/${actionName}`;

/* action types */
const SET_TABLES   = createActionName('SET_ALL');
const UPDATE_TABLE = createActionName('UPDATE_ONE');

/* action creators */
export const setTables   = payload => ({ type: SET_TABLES, payload });
export const updateTable = payload => ({ type: UPDATE_TABLE, payload });

/* thunks */
export const loadTables = () => async dispatch => {
  const res = await fetch(`${API_URL}/tables`);
  if (!res.ok) throw new Error('Failed to load tables');
  const data = await res.json();
  dispatch(setTables(data));
};

// PATCH jednego stolika
export const updateTableRequest = table => async dispatch => {
  const res = await fetch(`${API_URL}/tables/${table.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(table),
  });
  if (!res.ok) throw new Error('Failed to update table');
  const data = await res.json();
  dispatch(updateTable(data));
};

/* reducer */
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case SET_TABLES:
      return Array.isArray(action.payload) ? action.payload : statePart;
    case UPDATE_TABLE:
      return statePart.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
    default:
      return statePart;
  }
};

export default tablesReducer;
