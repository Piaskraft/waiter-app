import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Badge } from 'react-bootstrap';
import { getAllTables, loadTables } from '../../redux/tablesRedux';

export default function HomePage() {
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ściągamy dane przy pierwszym wejściu
    dispatch(loadTables()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h2 className="mb-3">Tables</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>People</th>
            <th>Bill</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tables.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>
                <Badge bg={
                  t.status === 'Busy' ? 'danger' :
                  t.status === 'Free' ? 'success' :
                  t.status === 'Reserved' ? 'warning' : 'secondary'
                }>
                  {t.status}
                </Badge>
              </td>
              <td>{t.peopleAmount} / {t.maxPeopleAmount}</td>
              <td>{t.bill} €</td>
              <td>
                <Button as={Link} to={`/table/${t.id}`} size="sm">Show</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
