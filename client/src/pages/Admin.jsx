import { useEffect, useState } from "react";
import API from "../services/api";
import "./Admin.css";

function Admin() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  // Fetch all leads
  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Lead
  const deleteLead = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/leads/${id}`);
      alert("Lead Deleted Successfully");
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-page">
      <div className="dashboard">

        <h1>📊 Admin Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="cards">

          <div className="card">
            <h3>Total Leads</h3>
            <h1>{leads.length}</h1>
          </div>

          <div className="card">
            <h3>New</h3>
            <h1>
              {leads.filter((l) => l.status === "New").length}
            </h1>
          </div>

          <div className="card">
            <h3>Contacted</h3>
            <h1>
              {leads.filter((l) => l.status === "Contacted").length}
            </h1>
          </div>

          <div className="card">
            <h3>Closed</h3>
            <h1>
              {leads.filter((l) => l.status === "Closed").length}
            </h1>
          </div>

        </div>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by Name or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Budget</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {leads
              .filter((lead) => {
                return (
                  lead.name.toLowerCase().includes(search.toLowerCase()) ||
                  lead.email.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((lead) => (
                <tr key={lead._id}>

                  <td>{lead.name}</td>

                  <td>{lead.email}</td>

                  <td>{lead.budget}</td>

                  <td>{lead.message}</td>

                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        updateStatus(lead._id, e.target.value)
                      }
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteLead(lead._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>

                </tr>
              ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default Admin;