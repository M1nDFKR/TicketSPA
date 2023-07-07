import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'src/styles/custom.css';

interface Ticket {
  id: number;
  title: string;
  description: string;
}

interface Comment {
  id: number;
  text: string;
}

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [order, setOrder] = useState('most_recent');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [page, setPage] = useState(1);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      await axios.post('http://localhost:8000/api/logout/', {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      // After logging out, remove the auth token and redirect the user to the login page
      localStorage.removeItem('authToken');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
      const response = await axios.get<Ticket[]>(`http://127.0.0.1:8000/api/tickets`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setTickets(prevTickets => [...prevTickets, ...response.data]);
    };

    fetchTickets();
  }, [search, filter, order, page]);

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedTicket) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
        const response = await axios.get<Comment[]>(`http://127.0.0.1:8000/api/comments`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setComments(response.data);
      }
    };

    fetchComments();
  }, [selectedTicket]);

  const handleCommentSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
    const response = await axios.post<Comment>(`http://127.0.0.1:8000/api/comments`, {
      text: newComment,
    }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // Add the new comment to the list of comments
    setComments(prevComments => [...prevComments, response.data]);

    // Clear the new comment input
    setNewComment('');
  };

  const getUsername = () => {
    return typeof window !== 'undefined' ? localStorage.getItem('username') : '';
  };

  return (
    <div>
      <nav className="navbar navbar-light justify-content-between">
        <img
          src="/Logo.png"
          alt="Logo"
          className="d-inline-block align-text-top"
          style={{ width: '165px' }}
        />
        <span className="navbar-text text-light">
          <strong>
            <h2 className="d-flex align-items-end">
              Tickets Kit Escola Digital
            </h2>
          </strong>
        </span>
        <div>
          <div className="navbar-text text-light">
            Logged in as: <strong>{getUsername()}</strong>
          </div>
        </div>
        <div>
        <strong><button className="btn btn-light large-button" onClick={handleLogout}>Logout</button></strong>
          </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <input type="text" className="form-control" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="col">
            <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All tickets</option>
              <option value="open">Open tickets</option>
              <option value="closed">Closed tickets</option>
            </select>
          </div>
          <div className="col">
            <select className="form-select" value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="most_recent">Most recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="row mt-4">
          {tickets.map(ticket => (
            <div className="col-md-4" key={ticket.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ticket.title}</h5>
                  <p className="card-text">{ticket.description}</p>
                  <button className="btn btn-primary" onClick={() => setSelectedTicket(ticket)}>View Details</button>
                  <Collapse in={selectedTicket && selectedTicket.id === ticket.id}>
                    <div>
                      <h6 className="mt-3">Ticket Details</h6>
                      {/* Display ticket details here */}
                      <h6 className="mt-3">Comments</h6>
                      {comments.map(comment => (
                        <p key={comment.id}>{comment.text}</p>
                      ))}
                      <form onSubmit={handleCommentSubmit}>
                        <div className="mb-3">
                          <label className="form-label">New Comment</label>
                          <textarea className="form-control" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary" onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
