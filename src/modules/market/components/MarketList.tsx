import React, { useState } from 'react'
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  background-color: #2196F3;
  padding: 10px;
`

const FormHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px;
`

const Text = styled.div`
  color: ${props => props.color};
`

const GridItem = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 16px;
  text-align: center;
`

const MarketList = () => {
  const [server, setServer] = useState(2);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('asc');
  const { data, loading } = useMarket({ server, keyword, category, sort })

  const handleChangeServer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServer((event.target as HTMLInputElement).value);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory((event.target as HTMLInputElement).value);
  };
  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort((event.target as HTMLInputElement).value);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword((event.target as HTMLInputElement).value);
  };

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
      <div>
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <Grid>
            {data.map(item => {
              const key = item.id
              const imgUrl = `https://www.divine-pride.net/img/items/collection/iRO/${item.nft.nameid}`
              const {
                refine,
                nameEnglish,
                option0Text,
                option1Text,
                option2Text,
                option3Text,
                option4Text,
                card0Name,
                card1Name,
                card2Name,
                card3Name,
              } = item.nft
              const isNoCard = !card0Name && !card1Name && !card2Name && !card3Name
              return (
                <GridItem key={key}>
                  <img src={imgUrl} width={75} height={100} alt={nameEnglish} />
                  <div>
                    <b>{refine > 0 ? `+${refine} ` : ' '}{nameEnglish}</b>
                    {option0Text ? (
                      <div>
                        <ul>
                          <li><Text color='green'>{option0Text}</Text></li>
                          <li><Text color='green'>{option1Text}</Text></li>
                          <li><Text color='red'>{option2Text}</Text></li>
                          <li><Text color='red'>{option3Text}</Text></li>
                          <li><Text color='red'>{option4Text}</Text></li>
                        </ul>
                      </div>
                    ) : null}
                    
                    <div>{item.price} ION</div>
                    {!isNoCard ? (
                      <p>
                        <div>Card 1: {card0Name}</div>
                        <div>Card 2: {card1Name}</div>
                        <div>Card 3: {card2Name}</div>
                        <div>Card 4: {card3Name}</div>
                      </p>
                    ) : null}
                  </div>
                </GridItem>
              )
            })}
            {/* <pre>{JSON.stringify(data, null, '  ')}</pre> */}
          </Grid>
        )}
      </div>
    </Box>
  )
}

export default MarketList