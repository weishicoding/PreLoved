import React from 'react'
import {Login} from './Login'
import {ArrowBack, ArrowBackIosNew} from '@mui/icons-material'
import {Box, Typography} from '@mui/material'

export const Feedbar = () => {
  return (
    <>
      <Box sx={{mt: 5, ml: 5, display: 'flex', alignItems: 'center'}}>
        <ArrowBackIosNew></ArrowBackIosNew>
        <Typography variant="subtitle1">Back</Typography>
      </Box>
      <Login></Login>
    </>
  )
}
