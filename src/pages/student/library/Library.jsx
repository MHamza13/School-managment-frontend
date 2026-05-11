import React, { useState } from "react";
import {
  Box, Card, Grid, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableContainer, TableHead, Paper, Chip,
  IconButton, Select, FormControl, Pagination, Stack, MenuItem, alpha,
  Dialog, DialogTitle, DialogContent, DialogActions, Tooltip
} from "@mui/material";

// Lucide Icons
import {
  Search, BookOpen, Filter, Book, CheckCircle, Clock, 
  Hash, X, Bookmark, MapPin, Send
} from "lucide-react";

// Importing your custom styles (Make sure path is correct)
import { StyledTableCell, StyledTableRow } from "../../../components/styles";

const StudentLibrary = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [openRequest, setOpenRequest] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const primaryPurple = "#6a1b9a";

  // Books Data
  const books = [
    { id: 1, title: "Modern Physics", author: "H.C. Verma", isbn: "BK-9021", category: "Science", status: "Available", rack: "A-1" },
    { id: 2, title: "World History", author: "B.V. Rao", isbn: "BK-4432", category: "History", status: "Issued", rack: "C-4" },
    { id: 3, title: "Advanced Calculus", author: "M.J. Strauss", isbn: "BK-1102", category: "Math", status: "Available", rack: "B-2" },
    { id: 4, title: "English Literature", author: "William S.", isbn: "BK-7781", category: "English", status: "Out of Stock", rack: "D-1" },
    { id: 5, title: "Database Systems", author: "R. Elmasri", isbn: "BK-5521", category: "Computer", status: "Available", rack: "E-2" },
  ];

  // Student Library Stats
  const stats = [
    { label: "Library Books", value: "12,450", icon: <Book size={20} />, color: primaryPurple },
    { label: "My Issued Books", value: "2", icon: <Clock size={20} />, color: "#0284c7" },
    { label: "Available Now", value: "8,180", icon: <CheckCircle size={20} />, color: "#059669" },
  ];

  const handleRequestBook = (book) => {
    setSelectedBook(book);
    setOpenRequest(true);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1e293b", letterSpacing: "-1px" }}>
            Student Library
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
            Browse books, check availability, and request for issuance.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Bookmark size={18} />}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, borderColor: "#e2e8f0", color: "#475569", bgcolor: "white" }}
          >
            My Borrow History
          </Button>
        </Stack>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "none" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ p: 1.5, bgcolor: alpha(stat.color, 0.1), color: stat.color, borderRadius: "14px", display: "flex" }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b" }}>{stat.value}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Book Inventory Table */}
      <Paper sx={{ borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "none", overflow: "hidden", bgcolor: "white" }}>
        
        {/* Toolbar */}
        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <TextField
            placeholder="Find your next read..."
            size="small"
            InputProps={{ startAdornment: <InputAdornment position="start"><Search size={18} color="#94a3b8" /></InputAdornment> }}
            sx={{ width: { xs: "100%", md: "400px" }, "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Filter size={18} color="#64748b" />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} sx={{ borderRadius: "10px", fontWeight: 600 }}>
                <MenuItem value="All">All Categories</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="Computer">Computer Science</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <StyledTableRow>
                <StyledTableCell>BOOK INFORMATION</StyledTableCell>
                <StyledTableCell>ISBN / ID</StyledTableCell>
                <StyledTableCell>CATEGORY</StyledTableCell>
                <StyledTableCell>LOCATION</StyledTableCell>
                <StyledTableCell>AVAILABILITY</StyledTableCell>
                <StyledTableCell align="center">ACTION</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <StyledTableRow key={book.id} hover>
                  <StyledTableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ p: 1.2, bgcolor: "#f1f5f9", borderRadius: "10px", color: primaryPurple }}>
                        <BookOpen size={20} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>{book.title}</Typography>
                        <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 500 }}>by {book.author}</Typography>
                      </Box>
                    </Stack>
                  </StyledTableCell>
                  
                  <StyledTableCell>
                    <Typography sx={{ fontWeight: 600, color: "#475569", fontSize: "0.85rem" }}>
                      #{book.isbn}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Chip 
                      label={book.category} 
                      size="small" 
                      sx={{ fontWeight: 700, bgcolor: alpha(primaryPurple, 0.08), color: primaryPurple, borderRadius: "6px" }} 
                    />
                  </StyledTableCell>

                  <StyledTableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: "#64748b" }}>
                      <MapPin size={14} />
                      <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>Rack {book.rack}</Typography>
                    </Stack>
                  </StyledTableCell>

                  <StyledTableCell>
                    <Chip 
                      label={book.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 800, fontSize: "0.65rem",
                        bgcolor: book.status === "Available" ? "#dcfce7" : book.status === "Issued" ? "#eff6ff" : "#fef2f2",
                        color: book.status === "Available" ? "#166534" : book.status === "Issued" ? "#1e40af" : "#991b1b",
                        borderRadius: "6px"
                      }} 
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {book.status === "Available" ? (
                      <Button 
                        size="small" 
                        variant="contained" 
                        disableElevation
                        onClick={() => handleRequestBook(book)}
                        sx={{ textTransform: "none", fontWeight: 700, borderRadius: "8px", bgcolor: primaryPurple }}
                      >
                        Request
                      </Button>
                    ) : (
                      <Tooltip title="Currently Unavailable">
                        <span>
                           <IconButton disabled size="small"><Send size={18} /></IconButton>
                        </span>
                      </Tooltip>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer Pagination */}
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9" }}>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
            Showing 5 results from the vault
          </Typography>
          <Pagination count={5} shape="rounded" size="small" />
        </Box>
      </Paper>

      {/* --- REQUEST BOOK DIALOG --- */}
      <Dialog open={openRequest} onClose={() => setOpenRequest(false)} PaperProps={{ sx: { borderRadius: "24px", p: 1 } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Request Issuance</Typography>
          <IconButton onClick={() => setOpenRequest(false)}><X size={20} /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
            You are requesting to borrow <b>{selectedBook?.title}</b>. An admin will review your request and you'll be notified once it's ready for pickup.
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Purpose (Optional)</Typography>
          <TextField fullWidth multiline rows={2} placeholder="Reason for borrowing..." sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setOpenRequest(false)} sx={{ fontWeight: 700, color: "#64748b" }}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: primaryPurple, borderRadius: "10px", px: 4, fontWeight: 700 }}>Confirm Request</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default StudentLibrary;