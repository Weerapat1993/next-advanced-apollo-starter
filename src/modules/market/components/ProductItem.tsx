import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import styled from 'styled-components'
import CardCollapse from '@components/CardCollapse/CardCollapse';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Text = styled.span`
  color: ${props => props.color};
  font-size: ${props => props.size || 14}px;
  font-family: Tahoma;
`

const TitleBox = styled.div`
  text-align: left;
  color: white;
  font-size: 14px;
  font-family: Tahoma;
  background: #333;
  padding: 10px;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    background: #33cc33;
    font-weight: bold;
    text-align: center;
    &:before {
      content: "Buy Now";
    }
  }
  &:hover span {
    display: none;
  }
`

const BuyNowLink = styled.a`
  text-decoration: none;
  font-size: 14px;
  font-family: Tahoma;
`

const PriceBox = styled.div`
  text-align: right;
  padding: 5px;
  color: white;
  font-size: 14px;
  font-family: Tahoma;
`

const ProductImageBg = styled.div`
  position: relative;
  &::before {
    content: ${props => props.isBroken ? '"This Item is broken"' : '""'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    color: white;
    font-size: 10px;
    font-family: Tahoma;
    ${props => props.isBroken ? 'background-color: #aa231a;' : ''}
  }
  div {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 5px solid #ccc;
    img {
      display: block;
      height: 200px;
    }
  }
`

const EMPTY_SLOT = 'https://apps.maxion.gg/_next/image?url=%2Fimages%2Froverse%2Fcard%2Fempty.png&w=48&q=75'
const OPTION_ICON = 'https://apps.maxion.gg/_next/image?url=%2Fimages%2Froverse%2Ffront%2Fenchant.png&w=48&q=75' 
const ION_ICON = 'https://apps.maxion.gg/images/tokens/ion.svg'
const HAVE_CARD = 'https://apps.maxion.gg/_next/image?url=%2Fimages%2Froverse%2Fcard%2Fslotted.png&w=48&q=75'
const NO_SLOT = 'https://apps.maxion.gg/_next/image?url=%2Fimages%2Froverse%2Fcard%2Fnoslot.png&w=48&q=75'

const imgItem = (id) => `https://apps.maxion.gg/_next/image?url=https%3A%2F%2Frop2e-collection-cdn.s3-bkk.nipa.cloud%2F${id}.png&w=1080&q=75` 
const iconItem = (id) => `https://apps.maxion.gg/_next/image?url=https%3A%2F%2Fcdn.maxion.gg%2Flandverse%2Fimage%2Fitem%2F${id}.png&w=48&q=75`

const ProductItem = ({ item }) => {
  const isBroken = item.nft.attribute === 2
  const renderCard = (item) => {
      const {
        card0Name,
        card1Name,
        card2Name,
        card3Name,
        slots,
      } = item.nft
      const slot0 = slots >= 1
      const slot1 = slots >= 2
      const slot2 = slots >= 3
      const slot3 = slots >= 4
      return (
        <div>
          {renderToolTips(card0Name, slot0)} &nbsp;
          {renderToolTips(card1Name, slot1)} &nbsp;
          {renderToolTips(card2Name, slot2)} &nbsp;
          {renderToolTips(card3Name, slot3)}
        </div>
      )
    }
  
    const renderToolTips = (card, slot) => {
      const SLOT = slot && !card ? EMPTY_SLOT : NO_SLOT
      return card ? (
        <Tooltip title={card} placement="top">
          <img alt={card} src={card ? HAVE_CARD : SLOT} />
        </Tooltip>
      ) : (
        <img alt="No Card" src={card ? HAVE_CARD : SLOT} />
      )
    }
  
    const renderOptionIcon = () => {
      return (
        <img alt="Option" src={OPTION_ICON} width={16} height={16} style={{ marginTop: -15 }} />
      )
    }

  const imgUrl = imgItem(item.nft.nameid)
  const iconUrl = iconItem(item.nft.nameid)
  // const imgUrl = `https://www.divine-pride.net/img/items/collection/iRO/${item.nft.nameid}`
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
    slots,
  } = item.nft
  const isHaveSlots = slots > 0 || card0Name || card1Name || card2Name || card3Name 
  return (
    <Box sx={{ border: '1px solid #333', borderRadius: '5px' }}>
      <ProductImageBg isBroken={isBroken}>
        <div>
          <img src={imgUrl} height={100} alt={nameEnglish} />
        </div>
      </ProductImageBg>
      <div>
        {isHaveSlots ? (
          <CardCollapse defaultVisible={Boolean(option0Text)} title={renderCard(item)} action={option0Text ? renderOptionIcon() : null}>
            <div>- <Text color='#00aa00'>{option0Text}</Text></div>
            <div>- <Text color='#00aa00'>{option1Text}</Text></div>
            <div>- <Text color='#ff6699'>{option2Text}</Text></div>
            <div>- <Text color='#ff6699'>{option3Text}</Text></div>
            <div>- <Text color='#ff6699'>{option4Text}</Text></div>
          </CardCollapse>
        ) : (
          <Card sx={{ background: '#ccc', borderRadius: 0 }}>
            <CardHeader 
              title={''}
              sx={{ height: 0 }}
              titleTypographyProps={{ variant:'inherit' }}
            />
          </Card>
        )}
        <Grid container>
          <Grid xs={6}>
            <Button size="small">
              <Text color="white">#{item.nft.id}</Text>
            </Button>
          </Grid>
          <Grid xs={6}>
            <PriceBox><img src={ION_ICON} width={15} height={15} /> {item.price} ION</PriceBox>
          </Grid>
        </Grid>
        <BuyNowLink href={`https://apps.maxion.gg/roverse/detail/${item.id}`} target='_blank'>
          <TitleBox>
            <span><img src={iconUrl} alt={item.nft.nameid} width={16} /> {refine > 0 ? `+${refine} ` : ' '}{nameEnglish}</span>
          </TitleBox>
        </BuyNowLink>
      </div>
    </Box>
  )
}

export default ProductItem