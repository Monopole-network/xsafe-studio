import { Box, useMediaQuery } from '@mui/material';
import BigNumber from '@multiversx/sdk-core/node_modules/bignumber.js';
import { Text } from 'src/components/StyledComponents/StyledComponents';
import { MainButton } from 'src/components/Theme/StyledComponents';
import { Address, AddressType, AddressValue, BigUIntValue, VariadicType, VariadicValue, BooleanValue, BytesValue, U32Value, U64Value } from '@multiversx/sdk-core/out';
import { Formik, Field, Form } from 'formik';
import { mutateSmartContractCall } from 'src/contracts/MultisigContract';

const InteractStudio = () => {
  const maxWidth600 = useMediaQuery('(max-width:600px)');

  const handleSubmit = async (fn: string, args: any[]) => {
    try {
      await mutateSmartContractCall(
        new Address("erd1qqqqqqqqqqqqqpgqsmddxe7vzf0pm0m69sm5hkjfttx7xh0c9x2swpz84h"),
        new BigUIntValue(0),
        fn,
        ...args
      );
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <Box pb={'70px'}>
      <Box display="flex" gap={maxWidth600 ? 0 : '50px'} alignContent="stretch">
        <Box display="flex" sx={{ width: '100%'}}>
            <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" height="100%" width="30%">
              <Text fontSize="1.5rem" fontWeight={700}>Fees Receiver, Templates, Allowlist</Text>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("changeFeesReceiver", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Change Fees Receiver Address
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("setSaleTemplateAddress", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Set Sale Template Address
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("setListedTemplateAddress", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Set Listed Template Address
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={() => handleSubmit("clearAllowlist", [])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Clear Allowlist
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("addToAllowlist", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Add To Allowlist
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("removeFromAllowlist", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      remove from allowlist
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => {
                  let address = new AddressType();
                  let variadicType = new VariadicType(address);
                  let array;
                  if (values.addr.includes(" ")) {
                    array = values.addr.trim().split(" ");
                  } else if (values.addr.includes(",")) {
                    array = values.addr.trim().split(",");
                  }
                  let mapped = array!.map((addr) => new AddressValue(new Address(addr)))
                  handleSubmit("batchAddToAllowlist", [new VariadicValue(variadicType, mapped)])
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Batch Add To Allowlist (separate with comma or space)
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => {
                  let address = new AddressType();
                  let variadicType = new VariadicType(address);
                  let array;
                  if (values.addr.includes(" ")) {
                    array = values.addr.trim().split(" ");
                  } else if (values.addr.includes(",")) {
                    array = values.addr.trim().split(",");
                  }
                  let mapped = array!.map((addr) => new AddressValue(new Address(addr)))
                  handleSubmit("batchRemoveFromAllowlist", [new VariadicValue(variadicType, mapped)])
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Batch Remove From Allowlist (separate with comma or space)
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" height="100%" width="30%">
              <Text fontSize="1.5rem" fontWeight={700}> Project Lists </Text>
              <Formik
                initialValues={{addr: '', trusted: false}}
                onSubmit={(values) => handleSubmit("addSaleProject", [new AddressValue(new Address(values.addr.trim())), new BooleanValue(values.trusted)])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <Field as="select" name="trusted">
                      <option value="true">Trusted</option>
                      <option value="false">Non Trusted</option>
                    </Field>
                    <MainButton  type="submit" disabled={isSubmitting}>
                      Add Sale project
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: '', trusted: false}}
                onSubmit={(values) => handleSubmit("addListedProject", [new AddressValue(new Address(values.addr.trim())), new BooleanValue(values.trusted)])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <Field as="select" name="trusted">
                      <option value="true">Trusted</option>
                      <option value="false">Non Trusted</option>
                    </Field>
                    <MainButton  type="submit" disabled={isSubmitting}>
                      add listed project
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("addTrustedProject", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      add trusted project
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("removeSaleProject", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      remove sale project
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("removeListedProject", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      remove listed project
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: ''}}
                onSubmit={(values) => handleSubmit("removeTrustedProject", [new AddressValue(new Address(values.addr.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="erd1..." />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      remove trusted project
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" height="100%" width="30%">
              <Text fontSize="1.5rem" fontWeight={700}> Create Projects </Text>
              <Formik
                initialValues={{name: '', uri: '', trusted: false}}
                onSubmit={(values) => handleSubmit("createListedProject", [new BooleanValue(values.trusted), BytesValue.fromUTF8(values.name.trim()), BytesValue.fromUTF8(values.uri.trim())])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="name" placeholder="name" />
                    <Field name="uri" placeholder="uri" />
                    <Field as="select" name="trusted">
                      <option value="true">Trusted</option>
                      <option value="false">Non Trusted</option>
                    </Field>
                    <MainButton  type="submit" disabled={isSubmitting}>
                      create listed project
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{trusted: false, token_id: '', fees: '', price: '', max_supply: '', max_per_user: '', uri: '', fees_receiver: ''}}
                onSubmit={(values) => handleSubmit("createSaleProject", [
                  new BooleanValue(values.trusted), 
                  BytesValue.fromUTF8(values.token_id.trim()),
                  new BigUIntValue(new BigNumber(values.fees.trim())),
                  new BigUIntValue(new BigNumber(values.price.trim())),
                  new U32Value(new BigNumber(values.max_supply.trim())),
                  new U32Value(new BigNumber(values.max_per_user.trim())),
                  BytesValue.fromUTF8(values.uri.trim()),
                  new AddressValue(new Address(values.fees_receiver.trim())),
                ])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="token_id" placeholder="token_id" />
                    <Field name="uri" placeholder="uri" />
                    <Field as="select" name="trusted">
                      <option value="true">Trusted</option>
                      <option value="false">Non Trusted</option>
                    </Field>
                    <Field name="fees" placeholder="fees" />
                    <Field name="price" placeholder="price" />
                    <Field name="max_supply" placeholder="max_supply" />
                    <Field name="max_per_user" placeholder="max_per_user" />
                    <Field name="fees_receiver" placeholder="fees_receiver" />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      create Sale project
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: '', ticker: '', name: ''}}
                onSubmit={(values) => handleSubmit("issueTokenOnChildContract", [new AddressValue(new Address(values.addr.trim())), BytesValue.fromUTF8(values.ticker.trim()), BytesValue.fromUTF8(values.name.trim())])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="name" placeholder="name" />
                    <Field name="addr" placeholder="sale contract address" />
                    <Field name="ticker" placeholder="token ticker" />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      issue token on sale contract
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: '', nonce: '', name: ''}}
                onSubmit={(values) => handleSubmit("createSftNonceOnChildContract", [new AddressValue(new Address(values.addr.trim())), new U64Value(values.nonce.trim()), BytesValue.fromUTF8(values.name.trim())])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="name" placeholder="name" />
                    <Field name="addr" placeholder="sale contract address" />
                    <Field name="nonce" placeholder="nonce (should be 0)" />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      mint sft supply on sale contract
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
              <Formik
                initialValues={{addr: '', new_owner: ''}}
                onSubmit={(values) => handleSubmit("createSftNonceOnChildContract", [new AddressValue(new Address(values.addr.trim())), new AddressValue(new Address(values.new_owner.trim()))])}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Field name="addr" placeholder="sale contract address" />
                    <Field name="new_owner" placeholder="new owner" />
                    <MainButton  type="submit" disabled={isSubmitting}>
                      change contract owner
                    </MainButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InteractStudio;
