/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { ProposalsTypes } from 'src/types/Proposals';
import { useDispatch } from 'react-redux';
import {
  setProposeMultiselectSelectedOption,
  setSelectedNftToSend,
} from 'src/redux/slices/modalsSlice';
import { NFTType } from 'src/types/nfts';
import { useOrganizationInfoContext } from 'src/pages/Organization/OrganizationInfoContextProvider';
import { useTheme } from 'styled-components';
import { adjustTextByWidth } from 'src/utils/stringUtils';
import { useIsAlreadyProposedMap } from 'src/utils/useIsAlreadyProposedMap';
import { CardBox } from './nft-style';
import * as Styled from './styled';
import PendingNftProposalAnnouncer from './PendingNftProposalAnnouncer';
import { Text } from '../StyledComponents/StyledComponents';

type Props = {
  nft: NFTType;
};

function NftCard({ nft }: Props) {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const { isInReadOnlyMode } = useOrganizationInfoContext();
  const { isAlreadyProposed } = useIsAlreadyProposedMap();

  const handleOptionSelected = useCallback((option: ProposalsTypes, nft: NFTType) => {
    dispatch(setProposeMultiselectSelectedOption({ option }));
    dispatch(
      setSelectedNftToSend(nft),
    );
  }, [dispatch]);

  const handleSendNftClick = useCallback((nft: NFTType) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleOptionSelected(
      'balance' in nft
        ? ProposalsTypes.send_sft
        : ProposalsTypes.send_nft, nft);
    event.currentTarget.blur();
  }, [handleOptionSelected]);

  const typographyRef = useRef<HTMLDivElement>(null);

  const [adjustedText, setAdjustedText] = useState<string>(nft.name);

  useEffect(() => {
    if (typographyRef.current) {
      setAdjustedText(adjustTextByWidth({
        text: nft.name, containerWidth: typographyRef.current?.offsetWidth ?? 0, containerPadding2X: 25,
      }));
    }
  }, [nft.name, typographyRef]);

  return (
    <CardBox sx={{
      position: 'relative',
      border: `1px solid ${theme.palette.background.disabled}`,
      borderRadius: '4px',
      cursor: 'pointer',
    }}
    >
      {isAlreadyProposed[nft.identifier] && (
      <PendingNftProposalAnnouncer />
      )}
      <Styled.CardMediaContainer>
        <CardMedia
          component="img"
          height="auto"
          image={`${nft.media?.[0].thumbnailUrl}?w=150&h=150&fit=crop&auto=format`}
          alt="nft"
          loading="lazy"
          sx={{
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
          }}
        />
        {'balance' in nft && (
        <Box
          sx={{
            position: 'absolute',
            left: 5,
            bottom: 5,
            background: theme.palette.background.secondary,
            borderRadius: '4px',
            padding: '8px',
            minWidth: '34px',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Text textAlign="center" width="100%" fontWeight={700} fontSize={12}>{nft.balance as string}</Text>
        </Box>
        )}
      </Styled.CardMediaContainer>
      <Styled.NftCardContent>
        <Typography
          gutterBottom
          ref={typographyRef}
          variant="h6"
          component="span"
          sx={{
            color: theme.palette.text.primary,
            fontSize: '16px !important',
            fontFamily: 'IBM Plex Sans',
            whiteSpace: 'nowrap',
            display: 'block',
          }}
        >
          {adjustedText}
        </Typography>
        <Styled.SendNFTButton
          disabled={isInReadOnlyMode || isAlreadyProposed[nft.identifier]}
          onClick={handleSendNftClick(nft)}
          sx={{
            width: '30px important',
          }}
        >
          {'balance' in nft ? 'Send SFT' : 'Send NFT'}
        </Styled.SendNFTButton>
      </Styled.NftCardContent>
    </CardBox>
  );
}

export default React.memo(NftCard);