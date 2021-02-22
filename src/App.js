import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const result = []; // store rsults of next working days in numerical value
  const [weekdays, setWeekdays] = useState([]); // store numerical values as state to rerender the page when updated
  const [includeToday, setIncludeToday] = useState(true); // determine which day to start from
  let day = includeToday ? new Date().getDay() : new Date().getDay() + 1; // get the starting day as a numerical value

  // store string values of days of the week
  const weekdayStrings = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const isWeekday = (day) => day > 0 && day < 6; // determine if day is a weekday

  // find next 4 consecutive weekdays and store them in 'result'
  while (result.length < 4) {
    if (isWeekday(day)) {
      result.push(day);
    }
    day = (day + 1) % 6;
  }

  useEffect(() => {
    // set weekdays using 'result' and rerender the page
    setWeekdays(result);
  }, [includeToday]);

  return (
    <Container className="d-flex justify-content-center">
      <Form className="mt-5">
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>
            <h3>Next four working days: </h3>
          </Form.Label>
          <Form.Check
            type="checkbox"
            label={'include today'}
            checked={includeToday}
            onChange={() => {
              setIncludeToday(!includeToday);
            }}
            className="mb-3"
          />
          <Form.Control as="select">
            {weekdays.map((day) => {
              return <option>{weekdayStrings[day]}</option>;
            })}
          </Form.Control>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default App;
