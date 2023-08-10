// import { Box, useMediaQuery } from '@mui/material';
// import BigNumber from '@multiversx/sdk-core/node_modules/bignumber.js';
// import { Text } from 'src/components/StyledComponents/StyledComponents';
// import { MainButton } from 'src/components/Theme/StyledComponents';
// import { Address, AddressType, AddressValue, BigUIntValue, VariadicType, VariadicValue, BooleanValue, BytesValue, U32Value, U64Value } from '@multiversx/sdk-core/out';
// import { Formik, Field, Form } from 'formik';
// import { mutateSmartContractCall } from 'src/contracts/MultisigContract';

// const InteractStudio = () => {
//   const maxWidth600 = useMediaQuery('(max-width:600px)');

//   const handleSetDuration = async (duration: string) => {
//     try {
//       await mutateSmartContractCall(
//         new Address("erd1qqqqqqqqqqqqqpgq9e3ek5wlnsac8v88efnfx9wnj7w9cj7x9x2syzm46w"),
//         new BigUIntValue(0),
//         "setRewardsDuration",
//         new U64Value(duration)
//       );
//     } catch (e) {
//       console.log({ e });
//     }
//   };

//   return (
//     <Box pb={'70px'}>
//       <Box display="flex" gap={maxWidth600 ? 0 : '50px'} alignContent="stretch">
//         <Box display="flex" sx={{ width: '100%'}}>
//             <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" height="100%" width="30%">
//               <Text fontSize="1.5rem" fontWeight={700}>Staking</Text>
//               <Formik
//                 initialValues={{duration: ''}}
//                 onSubmit={(values) => handleSetDuration(values.duration)}
//               >
//                 {({ isSubmitting }) => (
//                   <Form>
//                     <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//                     <Field name="duration" placeholder="0" />
//                     <MainButton  type="submit" disabled={isSubmitting}>
//                       Set Rewards Duration
//                     </MainButton>
//                     </Box>
//                   </Form>
//                 )}
//               </Formik>
//             </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default InteractStudio;
