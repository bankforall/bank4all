import React, { useState } from 'react'
import {Box, Button, Container, Grid, List, ListItem, ListItemText, Stack, Typography} from '@mui/material'

export const UserDashboardPage = () => {
  const [balance, setBalance] = useState("10,000")
  const [interestRate, setInterestRate] = useState("3.4")
  const [communityLenderList, setCommunityLenderList] = useState(["David", "Sally", "Micheal", "Katherine"])
  return (
    <div>
      <Container>
        <Grid container justifyContent={"center"} spacing={4}>
          <Grid item>
            <Typography variant='h6'>Balance</Typography>
            <Typography variant='body1'>{balance} Baht</Typography>
          </Grid>
          <Grid item>
            <Typography variant='h6'>Interest Rate</Typography>
            <Typography variant='body1'>{interestRate} %</Typography>
          </Grid>
          <Grid item>
            <Stack spacing={2} direction="row">
              <Button variant="contained">Deposit</Button>
              <Button variant="outlined">Borrow</Button>
            </Stack>
          </Grid>
        </Grid>
        <Box>
          <List>
            {communityLenderList.map((lender, i) => {
              return (
                <ListItem>
                  <ListItemText key={i} primary={lender}></ListItemText>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Container>
    </div>
  )
}