import { useMediaQuery } from '@mui/material';
import { Text } from 'src/components/StyledComponents/StyledComponents';
import { useOrganizationInfoContext } from 'src/pages/Organization/OrganizationInfoContextProvider';
import { MultisigActionDetailed } from 'src/types/MultisigActionDetailed';
import ShortMemberPresentation from './ShortMemberPresentation';
import * as Styled from './styled';

type Props = {
  action: MultisigActionDetailed;
};

const PendingActionSummary = ({ action }: Props) => {
  const {
    quorumCountState: [quorumCount],
  } = useOrganizationInfoContext();

  console.log(action);
  
  const minWidth600 = useMediaQuery('(min-width: 600px)');
  return (
    <Styled.ActionSummaryContainer>
      <Styled.ActionIdBox>
        <Text>{action?.actionId}</Text>
      </Styled.ActionIdBox>

      <Styled.ActionTitleBox>
        <Text fontWeight={600} style={{ fontSize: '14px' }}>{action?.title()}</Text>
      </Styled.ActionTitleBox>

      <Styled.ActionSignersBox>
        <span>Confirmations:</span>
        <Text fontWeight={500} fontSize={14}>
          {action.signers.length} out of {quorumCount}
        </Text>
      </Styled.ActionSignersBox>

      <Styled.ActionCreatorBox>
        {minWidth600 && (
        <Text fontWeight={500} fontSize={14}>
          Created by:
        </Text>
        )}
        <ShortMemberPresentation address={action.signers[0]?.bech32()} />
      </Styled.ActionCreatorBox>
      <Styled.ActionStatusBox>
        <div className="d-flex align-items-center justify-content-end">
          <Styled.PendingContainerBox>
            Pending
          </Styled.PendingContainerBox>
        </div>
      </Styled.ActionStatusBox>
    </Styled.ActionSummaryContainer>
  );
};

export default PendingActionSummary;
