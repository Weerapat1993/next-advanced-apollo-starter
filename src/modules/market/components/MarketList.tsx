import React, { Fragment, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from 'styled-components'
import { useMarket } from "../hooks/useMarket"
import ProductItem from './ProductItem';
import Grid from '@mui/material/Grid';


const FormHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px;
`

const MarketList = () => {
  const [server, setServer] = useState(2);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [refine, setRefine] = useState(0);
  const [sort, setSort] = useState('asc');
  const { data, loading } = useMarket({ server, keyword, category, refine, sort })

  const handleChangeServer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServer((event.target as HTMLInputElement).value);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory((event.target as HTMLInputElement).value);
    setRefine(0);
  };
  const handleChangeRefine = (event: SelectChangeEvent) => {
    setRefine((event.target as HTMLInputElement).value);
  };
  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort((event.target as HTMLInputElement).value);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword((event.target as HTMLInputElement).value);
  };

  let isMenuRefine = false
  switch (category) {
    case 'headgear':
    case 'weapon':
    case 'armor':
    case 'shadowgear':
      isMenuRefine = true
  } 

  return (
    <Box>
      <FormHorizontal>
        <RadioGroup
          aria-labelledby="form-server"
          name="server"
          value={server}
          onChange={handleChangeServer}
        >
          <FormControlLabel value={1} control={<Radio />} label="Hela" />
          <FormControlLabel value={2} control={<Radio />} label="Freya" />
        </RadioGroup>
      </FormHorizontal>
      <FormHorizontal>
        <Box sx={{ minWidth: 200 }}>
          <FormControl variant="standard" fullWidth>
            <TextField variant='standard' placeholder='Keyword' value={keyword} size="small" onChange={handleSearch} />
          </FormControl>
        </Box>
        &nbsp; &nbsp;
        <Box sx={{ minWidth: 150 }}>
          <FormControl variant="standard" fullWidth>
            <Select
              id="form-category"
              value={category}
              label="Category"
              onChange={handleChangeCategory}
              displayEmpty
              size="small"
            >
              <MenuItem value=""><em>All</em></MenuItem>
              <MenuItem value="headgear">Headgears</MenuItem>
              <MenuItem value="weapon">Weapons</MenuItem>
              <MenuItem value="armor">Armors</MenuItem>
              <MenuItem value="card">Cards</MenuItem>
              <MenuItem value="shadowgear">Shadow Gears</MenuItem>
              <MenuItem value="costume">Costume</MenuItem>
              <MenuItem value="land">Land NFTs</MenuItem>
              <MenuItem value="usable_item">Usable Item</MenuItem>
              <MenuItem value="etc">ETC.</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {isMenuRefine ? (
          <Fragment>
            &nbsp; &nbsp;
            <Box sx={{ minWidth: 100 }}>
              <FormControl variant="standard" fullWidth>
                <Select
                  id="form-refine"
                  value={refine}
                  label="Refine"
                  onChange={handleChangeRefine}
                  displayEmpty
                  size="small"
                >
                  {Array.from(Array(11).keys()).map((key) => (
                    <MenuItem value={key}><em>+{key}</em></MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Fragment>
        ) : null}
        &nbsp; &nbsp;
        <Box sx={{ minWidth: 200 }}>
          <FormControl variant="standard" fullWidth>
            <Select
              id="form-sort"
              value={sort}
              label="Sort"
              onChange={handleChangeSort}
              displayEmpty
              size="small"
            >
              <MenuItem value="asc"><em>Newest</em></MenuItem>
              <MenuItem value="desc">Oldest</MenuItem>
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </FormHorizontal>
      <Box sx={{ flexGrow: 1, padding: '20px', background: '#111' }}>
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <Grid container spacing={{ xs: 2 }}>
            {data.map(item => {
              const key = item.id
              return (
                <Grid key={key} item xs={6} sm={4} md={3} lg={2}>
                  <ProductItem key={key} item={item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default MarketList