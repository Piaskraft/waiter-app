import { useEffect, useMemo, useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

const STATUSES = ['Free', 'Busy', 'Reserved', 'Cleaning'];

export default function TableForm({ initial, onSubmit, submitting = false }) {
  // startowe wartości
  const [status, setStatus] = useState(initial?.status ?? 'Free');
  const [people, setPeople] = useState(initial?.peopleAmount ?? 0);
  const [maxPeople, setMaxPeople] = useState(initial?.maxPeopleAmount ?? 4);
  const [bill, setBill] = useState(initial?.bill ?? 0);

  // pomocnicze „korygowanie” wartości
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  // reguły zależne od statusu
  useEffect(() => {
    // poza Busy rachunek zawsze 0
    if (status !== 'Busy' && bill !== 0) setBill(0);
    // przy statusach innych niż Busy ludzie = 0 (rezerwacja/czyszczenie/free)
    if (status !== 'Busy' && people !== 0) setPeople(0);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  // walidacja prosta jak dla 5-latka
  const errors = useMemo(() => {
    const e = {};
    if (!STATUSES.includes(status)) e.status = 'Nieprawidłowy status.';
    if (maxPeople < 1 || maxPeople > 10) e.maxPeople = 'Dozwolone 1–10.';
    if (people < 0 || people > maxPeople) e.people = '0…max.';
    if (status === 'Busy' && people === 0) e.people = 'Przy Busy musi być > 0.';
    if (status === 'Busy' && bill < 0) e.bill = 'Rachunek nie może być ujemny.';
    if (status !== 'Busy' && bill !== 0) e.bill = 'Poza Busy rachunek = 0.';
    return e;
  }, [status, people, maxPeople, bill]);

  const isValid = Object.keys(errors).length === 0;

  // handlery
  const onStatusChange = e => setStatus(e.target.value);

  const onPeopleChange = e => {
    const val = Number(e.target.value || 0);
    const clamped = clamp(val, 0, maxPeople);
    setPeople(clamped);
    // automatyczna zmiana statusu Free<->Busy
    if (clamped > 0 && status === 'Free') setStatus('Busy');
    if (clamped === 0 && status === 'Busy') setStatus('Free');
  };

  const onMaxPeopleChange = e => {
    const val = Number(e.target.value || 0);
    const clamped = clamp(val, 1, 10);
    setMaxPeople(clamped);
    if (people > clamped) setPeople(clamped);
  };

  const onBillChange = e => {
    const val = Number(e.target.value || 0);
    setBill(Math.max(0, val));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit?.({
      id: initial?.id,
      status,
      peopleAmount: people,
      maxPeopleAmount: maxPeople,
      bill: status === 'Busy' ? bill : 0,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="gy-3">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={onStatusChange}>
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Form.Select>
            {errors.status && <div className="text-danger small">{errors.status}</div>}
          </Form.Group>
        </Col>

        <Col xs={6} md={3}>
          <Form.Group>
            <Form.Label>People</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                min={0}
                max={maxPeople}
                value={people}
                onChange={onPeopleChange}
              />
              <InputGroup.Text>/ {maxPeople}</InputGroup.Text>
            </InputGroup>
            {errors.people && <div className="text-danger small">{errors.people}</div>}
          </Form.Group>
        </Col>

        <Col xs={6} md={3}>
          <Form.Group>
            <Form.Label>Max people</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={10}
              value={maxPeople}
              onChange={onMaxPeopleChange}
            />
            {errors.maxPeople && <div className="text-danger small">{errors.maxPeople}</div>}
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Bill (€)</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={bill}
              onChange={onBillChange}
              disabled={status !== 'Busy'}
            />
            {errors.bill && <div className="text-danger small">{errors.bill}</div>}
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Button type="submit" disabled={!isValid || submitting}>
            {submitting ? 'Saving…' : 'Save changes'}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
