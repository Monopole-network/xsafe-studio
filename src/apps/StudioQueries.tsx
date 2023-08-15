import { Box, useMediaQuery } from '@mui/material';
import { Text } from 'src/components/StyledComponents/StyledComponents';
import { MainButton } from 'src/components/Theme/StyledComponents';
import { Address, AddressValue } from '@multiversx/sdk-core/out';
import { Formik, Field, Form } from 'formik';
import { queryAddressArrayOnContract, queryAddressOnContract, queryBooleanArrayOnContract, queryBooleanOnContract, queryNumberOnContract } from 'src/contracts/MultisigContract';
import { useState } from 'react';

const CONTRACT_ADDRESS = "erd1qqqqqqqqqqqqqpgqsmddxe7vzf0pm0m69sm5hkjfttx7xh0c9x2swpz84h";

const InteractStudio = () => {
  const maxWidth600 = useMediaQuery('(max-width:600px)');

  const [feesReceiver, setFeesReceiver] = useState("");
  const [saleTemplate, setSaleTemplate] = useState("");
  const [listedTemplate, setListedTemplate] = useState("")
  const [allowlist, setAllowlist] = useState({full: "", trimmed: ""})
  const [isAllowed, setIsAllowed] = useState("")
  const [allowlistCount, setAllowlistCount] = useState("")
  const [isProject, setIsProject] = useState("")
  const [isSaleProject, setIsSaleProject] = useState("")
  const [isListedProject, setIsListedProject] = useState("")
  const [isTrustedProject, setIsTrustedProject] = useState("")
  const [projectsLength, setProjectsLength] = useState("")
  const [saleProjectsLength, setSaleProjectsLength] = useState("")
  const [listedProjectsLength, setListedProjectsLength] = useState("")
  const [trustedProjectsLength, setTrustedProjectsLength] = useState("")
  const [projectByAddress, setProjectByAddress] = useState("")
  const [allProjects, setAllProjects] = useState({full: "", trimmed: ""})
  const [allSaleProjects, setAllSaleProjects] = useState({full: "", trimmed: ""})
  const [allListedProjects, setAllListedProjects] = useState({full: "", trimmed: ""})
  const [allTrustedProjects, setAllTrustedProjects] = useState({full: "", trimmed: ""})

  const handleQueryAddress = async (fn: string, set: any, args: any[]) => {
    try {
      const address = await queryAddressOnContract(
        fn,
        CONTRACT_ADDRESS,
        ...args
      );      
      set(address.bech32());
    } catch (e) {
      console.log({ e });
    }
  };

  const handleQueryBoolean = async (fn: string, set: any, args: any[]) => {
    try {
      const boolean = await queryBooleanOnContract(
        fn,
        CONTRACT_ADDRESS,
        ...args
      );      
      
      set(boolean ? "yes" : "no");
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

  const handleQueryAddressArray = async (endpoint: string, fn: any) => {
    try {
      const array = await queryAddressArrayOnContract(
        endpoint,
        CONTRACT_ADDRESS,
      );      
      const full = array.map((addr) => addr.bech32() + " ");
      const trimmed = array.map((addr) => " .." + addr.bech32().slice(-5));
      fn({full, trimmed})
    } catch (e) {
      console.log({ e });
    }
  };

  const handleQueryProjectByAddress = async (addr: string) => {
    console.log(addr);
    
    try {
      const array = await queryBooleanArrayOnContract(
        "getProjectByAddress",
        CONTRACT_ADDRESS,
        new AddressValue(new Address(addr.trim()))
      );      
      setProjectByAddress(`sale: ${array[0] ? "yes" : "no"}, listed: ${array[1] ? "yes" : "no"}, trusted: ${array[2] ? "yes" : "no"}`)
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <Box pb={'70px'}>
      <Box display="flex" gap={maxWidth600 ? 0 : '50px'} alignContent="stretch">
        <Box display="flex" justifyContent="space-around" sx={{ width: '100%'}}>
            <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center" height="100%" width="30%">
              <Text fontSize="1.5rem" fontWeight={700}>Storage</Text>
                <MainButton onClick={() => handleQueryAddress("getFeesReceiver", setFeesReceiver, [])}>
                  Get Fees Receiver
                </MainButton>
                <Text fontSize="0.7rem">{feesReceiver}</Text>
                <Text fontSize="1.1rem">{feesReceiver.slice(0, 5)}...{feesReceiver.slice(-5)}</Text>
                <MainButton onClick={() => handleQueryAddress("getSaleTemplateAddress", setSaleTemplate, [])}>
                  Get Sale Template Address
                </MainButton>
                <Text fontSize="0.7rem">{saleTemplate}</Text>
                <Text fontSize="1.1rem">{saleTemplate.slice(0, 5)}...{saleTemplate.slice(-5)}</Text>
                <MainButton onClick={() => handleQueryAddress("getListedTemplateAddress", setListedTemplate, [])}>
                  Get Listed Template Address
                </MainButton>
                <Text fontSize="0.7rem">{listedTemplate}</Text>
                <Text fontSize="1.1rem">{listedTemplate.slice(0, 5)}...{listedTemplate.slice(-5)}</Text>
                <MainButton onClick={() => handleQueryAddressArray("getAllowlist", setAllowlist)}>
                  Get Allowlist
                </MainButton>
                <Text fontSize="0.7rem">{allowlist.full}</Text>
                <Text fontSize="1.1rem">{allowlist.trimmed ? allowlist.trimmed : "..."}</Text>
                <MainButton onClick={() => handleQueryNumber("getAllowlistCount", setAllowlistCount, [])}>
                  Get Allowlist Count
                </MainButton>
                <Text fontSize="1.1rem">{allowlistCount}</Text>
                <Formik
                  initialValues={{addr: ''}}
                  onSubmit={(values) => handleQueryBoolean("isAllowed", setIsAllowed, [new AddressValue(new Address(values.addr.trim()))])}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Field name="addr" placeholder="erd1..." />
                      <MainButton  type="submit" disabled={isSubmitting}>
                        Get is Allowed
                      </MainButton>
                      <Text fontSize="1.1rem">{isAllowed}</Text>
                      </Box>
                    </Form>
                  )}
                </Formik>
            </Box>


            <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center" height="100%" width="30%">
              <Text fontSize="1.5rem" fontWeight={700}>Projects</Text>
                <MainButton onClick={() => handleQueryNumber("getProjectsLength", setProjectsLength, [])}>
                  Get Projects Length
                </MainButton>
                <Text fontSize="1.1rem">{projectsLength}</Text>
                <MainButton onClick={() => handleQueryNumber("getSaleProjectsLength", setSaleProjectsLength, [])}>
                  Get Sale Projects Length
                </MainButton>
                <Text fontSize="1.1rem">{saleProjectsLength}</Text>
                <MainButton onClick={() => handleQueryNumber("getListedProjectsLength", setListedProjectsLength, [])}>
                  Get Listed Projects Length
                </MainButton>
                <Text fontSize="1.1rem">{listedProjectsLength}</Text>
                <MainButton onClick={() => handleQueryNumber("getTrustedProjectsLength", setTrustedProjectsLength, [])}>
                  Get Trusted Projects Length
                </MainButton>
                <Text fontSize="1.1rem">{trustedProjectsLength}</Text>
                <MainButton onClick={() => handleQueryAddressArray("getAllProjects", setAllProjects)}>
                  Get All  Projects
                </MainButton>
                <Text fontSize="0.7rem">{allProjects.full}</Text>
                <Text fontSize="1.1rem">{allProjects.trimmed ? allProjects.trimmed : "..."}</Text>
                <MainButton onClick={() => handleQueryAddressArray("getAllSaleProjects", setAllSaleProjects)}>
                  Get All Sale Projects
                </MainButton>
                <Text fontSize="0.7rem">{allSaleProjects.full}</Text>
                <Text fontSize="1.1rem">{allSaleProjects.trimmed ? allSaleProjects.trimmed : "..."}</Text>
                <MainButton onClick={() => handleQueryAddressArray("getAllListedProjects", setAllListedProjects)}>
                  Get All Listed Projects
                </MainButton>
                <Text fontSize="0.7rem">{allListedProjects.full}</Text>
                <Text fontSize="1.1rem">{allListedProjects.trimmed ? allListedProjects.trimmed : "..."}</Text>
                <MainButton onClick={() => handleQueryAddressArray("getAllProjects", setAllTrustedProjects)}>
                  Get All Trusted Projects
                </MainButton>
                <Text fontSize="0.7rem">{allTrustedProjects.full}</Text>
                <Text fontSize="1.1rem">{allTrustedProjects.trimmed ? allTrustedProjects.trimmed : "..."}</Text>
              </Box>
              
            <Box display="flex" flexDirection="column" justifyContent="space-around" alignItems="center" height="100%" width="30%">
              <Text fontSize="1.5rem" fontWeight={700}>Project</Text>
                <Formik
                  initialValues={{addr: ''}}
                  onSubmit={(values) => handleQueryBoolean("isProject", setIsProject, [new AddressValue(new Address(values.addr.trim()))])}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Field name="addr" placeholder="erd1..." />
                      <MainButton  type="submit" disabled={isSubmitting}>
                        Get is Project
                      </MainButton>
                      <Text fontSize="1.1rem">{isProject}</Text>
                      </Box>
                    </Form>
                  )}
                </Formik>
                <Formik
                  initialValues={{addr: ''}}
                  onSubmit={(values) => handleQueryBoolean("isSaleProject", setIsSaleProject, [new AddressValue(new Address(values.addr.trim()))])}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Field name="addr" placeholder="erd1..." />
                      <MainButton  type="submit" disabled={isSubmitting}>
                        Get is Sale Project
                      </MainButton>
                      <Text fontSize="1.1rem">{isSaleProject}</Text>
                      </Box>
                    </Form>
                  )}
                </Formik>
                <Formik
                  initialValues={{addr: ''}}
                  onSubmit={(values) => handleQueryBoolean("isListedProject", setIsListedProject, [new AddressValue(new Address(values.addr.trim()))])}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Field name="addr" placeholder="erd1..." />
                      <MainButton  type="submit" disabled={isSubmitting}>
                        Get is Listed Project
                      </MainButton>
                      <Text fontSize="1.1rem">{isListedProject}</Text>
                      </Box>
                    </Form>
                  )}
                </Formik>
                <Formik
                  initialValues={{addr: ''}}
                  onSubmit={(values) => handleQueryBoolean("isTrustedProject", setIsTrustedProject, [new AddressValue(new Address(values.addr.trim()))])}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Field name="addr" placeholder="erd1..." />
                      <MainButton  type="submit" disabled={isSubmitting}>
                        Get is Trusted Project
                      </MainButton>
                      <Text fontSize="1.1rem">{isTrustedProject}</Text>
                      </Box>
                    </Form>
                  )}
                </Formik>
                <Formik
                  initialValues={{addr: ''}}
                  onSubmit={(values) => handleQueryProjectByAddress(values.addr)}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Field name="addr" placeholder="erd1..." />
                      <MainButton  type="submit" disabled={isSubmitting}>
                        Get project by address
                      </MainButton>
                      <Text fontSize="1.1rem">{projectByAddress}</Text>
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
