
import React from 'react';
import { Table, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext';
import AvatarImg from './common/AvatarImg';

const UserTable = () => {
  const navigate = useNavigate();
  const { view, banUser } = useUsers();

  const onBan = async (u) => {
    if (u.status === 'blocked') return;
    if (window.confirm(`Ban account "${u.username}" ?`)) {
      await banUser(u.id);
    }
  };

  const badge = (status) => {
    const map = { active: 'success', blocked: 'danger', locked: 'secondary' };
    return <Badge bg={map[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Table bordered hover responsive className="shadow-sm align-middle">
      <thead>
        <tr>
          <th style={{ width: 70 }}>Avatar</th> {/* ⬅️ thêm */}
          <th>ID</th>
          <th>username</th>
          <th>fullName</th>
          <th>Role</th>
          <th>Status</th>
          <th style={{width: 240}}>Action</th>
        </tr>
      </thead>
      <tbody>
        {view.map(u => (
          <tr key={u.id}>
            <td>
              <AvatarImg src={u.avatar} size={36} /> {/* ⬅️ thêm */}
            </td>
            <td>{u.id}</td>
            <td>{u.username}</td>
            <td>{u.fullName}</td>
            <td>{u.role}</td>
            <td>{badge(u.status)}</td>
            <td>
              <ButtonGroup size="sm">
                <Button variant="outline-primary" onClick={()=>navigate(`/users/${u.id}`)}>View Details</Button>
                <Button variant="outline-danger" onClick={()=>onBan(u)} disabled={u.status==='blocked'}>
                  Ban Account
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
        {view.length === 0 && (
          <tr><td colSpan={7} className="text-center text-muted">No users</td></tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;