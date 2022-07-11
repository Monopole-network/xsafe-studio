import { Address } from '@elrondnetwork/erdjs';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { AddressBook } from 'src/pages/Organization/types';
import { addressBookSelector } from 'src/redux/selectors/addressBookSelector';
import { RootState } from 'src/redux/store';
import { SelectedOptionType } from 'src/types/Proposals';
import { useEffect } from 'react';

type ProposeEditOwnerType = {
  selectedOption: SelectedOptionType;
  handleSetAddress: (address: Address) => void;
  handleSetName: (name: string) => void;
};

const EditOwner = ({
  selectedOption,
  handleSetAddress,
  handleSetName,
}: ProposeEditOwnerType) => {
  const addressBook = useSelector<RootState, AddressBook>(addressBookSelector);
  const { t }: { t: any } = useTranslation();
  const address = 'address' in selectedOption! ? selectedOption?.address : '';
  const name = addressBook[address] || '';

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required'),
  });

  const editOwnerForm = useFormik({
    initialValues: {
      name,
    },
    validationSchema,
    validateOnChange: true,
    validateOnMount: true,
  } as any);

  useEffect(() => {
    if (address != null) {
      handleSetAddress(new Address(address));
    }
  }, []);
  useEffect(() => {
    handleSetName(editOwnerForm.values.name);
  }, [editOwnerForm.values.name]);

  if (selectedOption === undefined) {
    return null;
  }

  return (
    <form
      className="modal-controll-container"
      onSubmit={editOwnerForm.handleSubmit}
    >
      <label htmlFor="name">{t('Name')}</label>
      <input
        id="name"
        name="name"
        type="text"
        className="form-control"
        onChange={editOwnerForm.handleChange}
        value={editOwnerForm.values.name}
      />

      <div
        className="h6 mb-spacer text-break remove-user"
        data-testid="delegateSubTitle"
      />
      <div>{t('Address')}</div>
      <div
        className="h6 mb-spacer text-break remove-user"
        data-testid="delegateSubTitle"
      >
        <p className="address">{address}</p>
      </div>
    </form>
  );
};

export default EditOwner;