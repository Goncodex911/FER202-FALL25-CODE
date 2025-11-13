import { useEffect, useState } from "react";
import { Card, Table, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentsByUser, createPayment } from "../redux/paymentsSlice";
import { selectTotalAmount } from "../redux/paymentSelectors";

export default function PaymentsPage() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("1");

  const { list, isLoading } = useSelector((s) => s.payments);
  const totalAmount = useSelector(selectTotalAmount);

  const [newPayment, setNewPayment] = useState({
    userId: "",
    semester: "",
    courseName: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    dispatch(fetchPaymentsByUser(userId));
  }, [userId, dispatch]);

  const submitPayment = (e) => {
    e.preventDefault();
    dispatch(createPayment(newPayment));
  };

  return (
    <div className="row g-3">
      <div className="col-md-4">
        <Card>
          <Card.Body>
            <Card.Title>Create Payment</Card.Title>

            <Form onSubmit={submitPayment}>
              <Form.Group className="mb-2">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  value={newPayment.userId}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, userId: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  type="text"
                  value={newPayment.semester}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, semester: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newPayment.courseName}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, courseName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={newPayment.date}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, date: e.target.value })
                  }
                />
              </Form.Group>

              <Button type="submit">Add Payment</Button>
            </Form>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Total Tuition</Card.Title>
            <h4>{totalAmount.toLocaleString()} đ</h4>
          </Card.Body>
        </Card>
      </div>

      <div className="col-md-8">
        <Card>
          <Card.Body>
            <Card.Title>Payments</Card.Title>

            {isLoading && <Spinner animation="border" />}

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Semester</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id}>
                    <td>{p.courseName}</td>
                    <td>{p.semester}</td>
                    <td>{p.amount.toLocaleString()} đ</td>
                    <td>{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
