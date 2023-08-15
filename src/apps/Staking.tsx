import { Box, useMediaQuery } from '@mui/material';
import BigNumber from '@multiversx/sdk-core/node_modules/bignumber.js';
import { Text } from 'src/components/StyledComponents/StyledComponents';
import { MainButton } from 'src/components/Theme/StyledComponents';
import { Address, BigUIntValue, BytesValue, U64Value, TokenTransfer } from '@multiversx/sdk-core/out';
import { Formik, Field, Form } from 'formik';
import { mutateSmartContractCall, queryBigUintOnContract, queryNumberOnContract, sendTransactionWithEgld, sendTransactionWithEsdt } from 'src/contracts/MultisigContract';
import { MultisigContractFunction } from 'src/types/multisigFunctionNames';
import { useState } from 'react';

const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgq9e3ek5wlnsac8v88efnfx9wnj7w9cj7x9x2syzm46w";

const InteractStudio = () => {
  const maxWidth600 = useMediaQuery('(max-width:600px)');
  const [lastTime, setLastTime] = useState("");
  const [finishAt, setFinishAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [duration, setDuration] = useState("");
  const [rewardRate, setRewardRate] = useState("");
  const [totalSupply, setTotalSupply] = useState("");

  const handleSetDuration = async (duration: string) => {
    try {
      await mutateSmartContractCall(
        new Address(CONTRACT_ADDRESS),
        new BigUIntValue(0),
        "setRewardsDuration",
        new U64Value(duration)
      );
    } catch (e) {
      console.log({ e });
    }
  };

  const handleNotifyRewardESDT = async (token: string, decimals: number, amount: number) => {
    try {
      await sendTransactionWithEsdt(
        MultisigContractFunction.DEPOSIT,
        TokenTransfer.fungibleFromAmount(token, amount, decimals)
      )

      await mutateSmartContractCall(
        new Address(CONTRACT_ADDRESS),
        new BigUIntValue(0),
        "ESDTTransfer",
        BytesValue.fromUTF8(token),
        new BigUIntValue(new BigNumber(amount * Math.pow(10, decimals))),
        BytesValue.fromUTF8("notifyRewardAmount"),
      );
    } catch (e) {
      console.log({ e });
    }
  };

  const handleNotifyRewardEGLD = async (amount: number) => {
    try {
      await sendTransactionWithEgld(
        MultisigContractFunction.DEPOSIT,
        amount
      )

      await mutateSmartContractCall(
        new Address(CONTRACT_ADDRESS),
        new BigUIntValue(new BigNumber(amount * Math.pow(10, 18))),
        "notifyRewardAmount",
      );
    } catch (e) {
      console.log({ e });
    }
  };

  const handleQueryNumber = async (fn: string, set: any, args: any[]) => {
    try {
      const number = await queryNumberOnContract(
        fn,
        CONTRACT_ADDRESS,
        ...args
      );      
      
      set(number);
    } catch (e) {
      console.log({ e });
    }
  };

  const handleQueryBigUint = async (fn: string, set: any, args: any[]) => {
    try {
      const number = await queryBigUintOnContract(
        fn,
        CONTRACT_ADDRESS,
        ...args
      );      
      
      set(number);
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <Box pb={'70px'}>
      <Box display="flex" gap={maxWidth600 ? 0 : '50px'} alignContent="stretch">
        <Box display="flex" sx={{ width: '100%'}}>
            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" height="100%" width="30%">
              <Text fontSize="1.5rem" fontWeight={700}>Endpoints</Text>
              <Formik
                initialValues={{duration: ''}}
                onSubmit={(values) => handleSetDuration(values.duration)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="duration" placeholder="0" />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Set Rewards Duration
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{amount: 0}}
                onSubmit={(values) => handleNotifyRewardEGLD(values.amount)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="amount" placeholder="0" />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Add Rewards EGLD
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{token: "", decimals: 18, amount: 0}}
                onSubmit={(values) => handleNotifyRewardESDT(values.token, values.decimals, values.amount)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Box display="flex" justifyContent="center" alignItems="center">
                      <Box display="flex" flexDirection="column" marginRight="10px" justifyContent="center" alignItems="center">
                        <Text fontSize="1rem" >Token ID</Text>
                        <Text fontSize="1rem" >Decimals</Text>
                        <Text fontSize="1rem" >Amount</Text>
                      </Box>
                      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Field name="token" placeholder="TOKEN-123456" />
                        <Field name="decimals" placeholder="decimals" />
                        <Field name="amount" placeholder="amount" />
                      </Box>
                      </Box>
                    <MainButton type="submit" disabled={isSubmitting}>
                      Add Rewards ESDT
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" height="100%" width="30%">
              <Text fontSize="1.5rem" fontWeight={700}>Queries</Text>
              <MainButton onClick={() => handleQueryBigUint("rewardRate", setRewardRate, [])}>
                  Get reward rate
              </MainButton>
              <Text fontSize="1.1rem">{rewardRate}</Text>
              <MainButton onClick={() => handleQueryBigUint("totalSupply", setTotalSupply, [])}>
                  Get total supply
              </MainButton>
              <Text fontSize="1.1rem">{totalSupply}</Text>
              <MainButton onClick={() => handleQueryNumber("getLastTimeRewardApplicable", setLastTime, [])}>
                  Get last time reward applicable
              </MainButton>
              <Text fontSize="1.1rem">{lastTime}</Text>
              <MainButton onClick={() => handleQueryNumber("finishAt", setFinishAt, [])}>
                  Get finish at
              </MainButton>
              <Text fontSize="1.1rem">{finishAt}</Text>
              <MainButton onClick={() => handleQueryNumber("updatedAt", setUpdatedAt, [])}>
                  Get updated at 
              </MainButton>
              <Text fontSize="1.1rem">{updatedAt}</Text>
              <MainButton onClick={() => handleQueryNumber("duration", setDuration, [])}>
                  Get duration
              </MainButton>
              <Text fontSize="1.1rem">{duration}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InteractStudio;
