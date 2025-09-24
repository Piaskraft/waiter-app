import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Spinner } from 'react-bootstrap';
import TableForm from '../features/TableForm';
import { getTableById, loadTables, updateTableRequest } from '../../redux/tablesRedux';

export default function TablePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const table = useSelector(state => getTableById(state, id));

  const [loading, setLoading] = useState(!table);
  const [submitting, setSubmitting] = useState(false);

  // Jeśli ktoś wejdzie bezpośrednio na /table/:id, dociągnij listę
  useEffect(() => {
    if (!table) {
      setLoading(true);
      dispatch(loadTables()).finally(() => setLoading(false));
    }
  }, [dispatch, table]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      await dispatch(updateTableRequest(payload));
      navigate('/'); // po zapisie wracamy na listę
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2">
        <Spinner animation="border" size="sm" />
        <span>Loading…</span>
      </div>
    );
  }

  if (!table) {
    return (
      <>
        <Alert variant="danger" className="mb-3">Table not found.</Alert>
        <Button as={Link} to="/">Back</Button>
      </>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Edit table #{table.id}</h2>
        <Button as={Link} to="/" variant="secondary" size="sm">Back</Button>
      </div>

      <TableForm
        initial={table}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}
