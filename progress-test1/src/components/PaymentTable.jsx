import React from 'react';
import { Table, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../contexts/PaymentContext';
import { formatCurrency } from '../utils/formatter';

const PaymentTable = () => {
  const navigate = useNavigate();
  const { view, totalAmount, deletePayment } = usePaymentContext();

  const handleDelete = async (id) => {
    if (window.confirm('Delete this payment?')) {
      await deletePayment(id);
    }
  };

  return (
    <>
      <Table bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Semester</th>
            <th>Course</th>
            <th className="text-end">Amount</th>
            <th style={{width: 250}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {view.map((p, idx) => (
            <tr key={p.id}>
              <td>{idx + 1}</td>
              <td>{p.semester}</td>
              <td>{p.course}</td>
              <td className="text-end">{formatCurrency(p.amount)}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button variant="outline-primary" onClick={() => navigate(`/payments/${p.id}`)}>
                    View Details
                  </Button>
                  <Button variant="outline-warning" onClick={() => navigate(`/payments/${p.id}/edit`)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(p.id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
          {view.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">No data</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="text-end">
        <Badge bg="success" pill>
          Total Amount: {formatCurrency(totalAmount)}
        </Badge>
      </div>
    </>
  );
};

export default PaymentTable;
