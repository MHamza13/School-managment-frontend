import React, { useState } from "react";
import {
  Box, Card, Grid, Typography, Button, TextField, InputAdornment,
  Table, TableBody, TableContainer, TableHead, Paper, Chip,
  IconButton, Select, FormControl, Pagination, Stack, MenuItem, alpha,
  Dialog, DialogTitle, DialogContent, DialogActions, Menu
} from "@mui/material";

// Lucide Icons
import {
  Search, Plus, BookOpen, Filter, MoreVertical, 
  CheckCircle, Clock, Book, User, Hash, X, 
  Edit3, Trash2, ExternalLink, Bookmark
} from "lucide-react";

// Importing your custom styles
import { StyledTableCell, StyledTableRow } from "../../../components/styles";

const Library = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const primaryPurple = "#6a1b9a";

  // Dummy Data for Books
  const books = [
    { id: 1, title: "Modern Physics", author: "H.C. Verma", isbn: "BK-9021", category: "Science", status: "Available", rack: "A-1" },
    { id: 2, title: "World History", author: "B.V. Rao", isbn: "BK-4432", category: "History", status: "Issued", rack: "C-4" },
    { id: 3, title: "Advanced Calculus", author: "M.J. Strauss", isbn: "BK-1102", category: "Math", status: "Available", rack: "B-2" },
    { id: 4, title: "English Literature", author: "William S.", isbn: "BK-7781", category: "English", status: "Lost", rack: "D-1" },
  ];

  // Stats for Library
  const stats = [
    { label: "Total Books", value: "4,520", icon: <Book size={20} />, color: primaryPurple },
    { label: "Issued", value: "340", icon: <Clock size={20} />, color: "#0284c7" },
    { label: "Available", value: "4,180", icon: <CheckCircle size={20} />, color: "#059669" },
  ];

  // Handlers
  const handleMenuOpen = (event, book) => {
    setAnchorEl(event.currentTarget);
    setSelectedBook(book);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBook(null);
  };

  return (
    <Box sx={{ minHeight: "100vh"}}>
      
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: primaryPurple, letterSpacing: "-1px" }}>
            Library Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Manage book inventory, categories, and lending records.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Bookmark size={18} />}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, borderColor: "#e2e8f0", color: "#475569" }}
          >
            Categories
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<Plus size={18} />}
            sx={{ borderRadius: "12px", textTransform: "none", fontWeight: 600, bgcolor: primaryPurple, "&:hover": { bgcolor: "#4a148c" } }}
          >
            Add New Book
          </Button>
        </Stack>
      </Box>

      {/* Library Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ p: 2.5, borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ p: 1.5, bgcolor: alpha(stat.color, 0.1), color: stat.color, borderRadius: "12px", display: "flex" }}>
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>{stat.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#1e293b" }}>{stat.value}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Inventory Table */}
      <Paper sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "none", overflow: "hidden" }}>
        
        {/* Search & Filter Toolbar */}
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#fff", flexWrap: "wrap", gap: 2 }}>
          <TextField
            placeholder="Search books by title, author or ISBN..."
            size="small"
            InputProps={{ startAdornment: <InputAdornment position="start"><Search size={18} color="#94a3b8" /></InputAdornment> }}
            sx={{ width: { xs: "100%", md: "400px" }, "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#f8fafc" } }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Filter size={18} color="#64748b" />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} sx={{ borderRadius: "10px", fontWeight: 600 }}>
                <MenuItem value="All">All Categories</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="History">History</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Book Details</StyledTableCell>
                <StyledTableCell>ISBN / ID</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Rack Location</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <StyledTableRow key={book.id} hover>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ p: 1, bgcolor: "#f1f5f9", borderRadius: "8px" }}><BookOpen size={20} color={primaryPurple} /></Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1e293b" }}>{book.title}</Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>{book.author}</Typography>
                      </Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontWeight: 600, color: "#475569" }}>{book.isbn}</StyledTableCell>
                  <StyledTableCell>
                    <Chip label={book.category} size="small" sx={{ fontWeight: 600, bgcolor: alpha(primaryPurple, 0.05), color: primaryPurple }} />
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontWeight: 700, color: "#64748b" }}>{book.rack}</StyledTableCell>
                  <StyledTableCell>
                    <Chip 
                      label={book.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 800, fontSize: "0.7rem",
                        bgcolor: book.status === "Available" ? "#ecfdf5" : book.status === "Issued" ? "#eff6ff" : "#fef2f2",
                        color: book.status === "Available" ? "#059669" : book.status === "Issued" ? "#2563eb" : "#dc2626"
                      }} 
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, book)} size="small">
                      <MoreVertical size={18} color="#94a3b8" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9" }}>
          <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>Showing 1-4 of 4,520 Books</Typography>
          <Pagination count={10} shape="rounded" size="small" />
        </Box>
      </Paper>

      {/* --- ACTIONS MENU --- */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem sx={{ gap: 1.5, fontWeight: 600, fontSize: '14px' }} onClick={handleMenuClose}><ExternalLink size={16}/> View Details</MenuItem>
        <MenuItem sx={{ gap: 1.5, fontWeight: 600, fontSize: '14px' }} onClick={handleMenuClose}><Edit3 size={16} color="#0284c7"/> Edit Book</MenuItem>
        <MenuItem sx={{ gap: 1.5, fontWeight: 600, fontSize: '14px', color: '#dc2626' }} onClick={handleMenuClose}><Trash2 size={16}/> Delete</MenuItem>
      </Menu>

      {/* --- ADD BOOK DIALOG --- */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "20px" } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: primaryPurple }}>Add New Book</Typography>
          <IconButton onClick={() => setOpen(false)}><X size={20} /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3, pt: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Book Title</Typography>
              <TextField fullWidth placeholder="Enter book title" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Author</Typography>
              <TextField fullWidth placeholder="Author Name" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>ISBN Number</Typography>
              <TextField fullWidth placeholder="e.g. BK-2022" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Category</Typography>
              <FormControl fullWidth size="small">
                <Select defaultValue="Science" sx={{ borderRadius: "12px", bgcolor: "#f8fafc" }}>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Math">Math</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Rack Number</Typography>
              <TextField fullWidth placeholder="e.g. A-10" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#f8fafc" } }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 700, color: "#64748b" }}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: primaryPurple, borderRadius: "10px", px: 4, fontWeight: 700 }}>Save Book</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Library;