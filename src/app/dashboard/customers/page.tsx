'use client';
import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import {useState} from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

//export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [

] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  const [open, setOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // Reset all states when closing the dialog
    setFirstName('');
    setLastName('');
    setEmail('');
    setNewCustomerName('');
    setOpen(false);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomerName(event.target.value);
  };
  const handleAddCustomer = () => {
    console.log('Adding new customer:', { firstName, lastName, email, newCustomerName });
    handleClose();
  };
  const handleFormSubmit = () => {
    console.log(newScriptData); // 这里应该是将数据发送到后端的函数
    handleClose(); // 提交后关闭 Dialog
  };

  const [category, setCategory] = React.useState('');

  // ... 省略其他逻辑

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };



  // ... 省略其他渲染逻辑
 //const DialogWithNoSSR = dynamic(() => import('@mui/material/Dialog'), {
  //  ssr: false,
  //});


  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Scrip List</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button onClick={()=>{
setOpen(true)
          }} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add new scrip
          </Button>

        </div>
      </Stack>
      {/* Dialog component for adding new customer */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Scrip</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="scripName"
            label="Scrip Name"
            type="text"
            fullWidth
            variant="standard"
            value={newCustomerName}
            onChange={handleNameChange}
          />
          <Select value={category}
          onChange={handleCategoryChange}
          displayEmpty
          autoFocus
          fullWidth
          variant="standard">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Category 1">Category 1</MenuItem>
          <MenuItem value="Category 2">Category 2</MenuItem>
          <MenuItem value="Category 3">Category 3</MenuItem>
          {/* ... 更多的 MenuItem */}
        </Select>
          <TextField
            autoFocus
            margin="dense"
            id="creator"
            label="Creator"
            type="text"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />


          {/* <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={e => setEmail(e.target.value)}
          /> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddCustomer}>Add</Button>
        </DialogActions>
      </Dialog>

      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>


  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
