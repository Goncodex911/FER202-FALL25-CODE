import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, toggleUserStatus } from "../redux/usersSlice";
import { Card, Table, Button, Spinner, Alert, Image } from "react-bootstrap";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((s) => s.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>User Management</Card.Title>

        {isLoading && <Spinner animation="border" />}

        {error && <Alert variant="danger">{error}</Alert>}

        <Table striped bordered hover className="mt-3 align-middle">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Toggle</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id}>
                <td>
                  <Image
                    src={u.avatar}
                    roundedCircle
                    width={50}
                    height={50}
                  />
                </td>
                <td>{u.fullName}</td>
                <td>{u.role}</td>
                <td>
                  <span
                    className={
                      u.status === "active"
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >
                    {u.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant={u.status === "active" ? "danger" : "success"}
                    onClick={() => dispatch(toggleUserStatus(u))}
                  >
                    {u.status === "active" ? "Block" : "Unblock"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
