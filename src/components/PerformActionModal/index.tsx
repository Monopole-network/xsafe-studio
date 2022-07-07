import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { mutatePerformAction } from 'src/contracts/MultisigContract';
import {
  SelectedActionToPerform,
  setSelectedPerformedAction,
} from 'src/redux/slices/modalsSlice';
import { gasLimit as defaultGasLimit, maxGasLimit } from 'src/config';
import { MultisigActionType } from 'src/types/MultisigActionType';
import { useState } from 'react';

const gasLimits = {
  [MultisigActionType.Nothing]: 10_000_000,
  [MultisigActionType.AddBoardMember]: 10_000_000,
  [MultisigActionType.AddProposer]: 10_000_000,
  [MultisigActionType.RemoveUser]: 10_000_000,
  [MultisigActionType.ChangeQuorum]: 10_000_000,
  [MultisigActionType.SendTransferExecute]: 60_000_000,
  [MultisigActionType.SendAsyncCall]: 60_000_000,
  [MultisigActionType.SCDeployFromSource]: 80_000_000,
  [MultisigActionType.SCUpgradeFromSource]: 80_000_000,
};

interface PerformActionModalPropsType {
  selectedAction: SelectedActionToPerform;
}

const PerformActionModal = ({
  selectedAction,
}: PerformActionModalPropsType) => {
  const gasLimit =
    selectedAction?.actionType != null
      ? gasLimits[selectedAction.actionType] ?? defaultGasLimit
      : defaultGasLimit;
  const [selectedGasLimit, setSelectedGasLimit] = useState(gasLimit);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  if (selectedAction == null) {
    return null;
  }

  const handleClose = () => {
    dispatch(setSelectedPerformedAction(null));
  };

  const validateGasLimit = () => {
    if (selectedGasLimit < gasLimit) {
      setError(`Gas limit must be greater or equal to ${gasLimit}`);
      setSelectedGasLimit(gasLimit);
      return false;
    }
    if (selectedGasLimit > maxGasLimit) {
      setError(`Gas limit must be lower or equal to ${maxGasLimit}`);
      setSelectedGasLimit(maxGasLimit);

      return false;
    }
    return true;
  };

  const onPerformAction = () => {
    const isGasLimitValid = validateGasLimit();
    if (isGasLimitValid) {
      mutatePerformAction(selectedAction.id, selectedGasLimit);
      handleClose();
    }
  };

  const handleChangeGasLimit = (e: any): boolean => {
    const newValue = Number(e.target.value);
    if (Number.isNaN(newValue)) {
      setError('Invalid number');
      return false;
    }
    setError(null);
    setSelectedGasLimit(newValue);
    return true;
  };

  if (selectedAction == null) {
    return null;
  }

  return (
    <Modal
      show
      size="lg"
      onHide={handleClose}
      className="modal-container"
      animation={false}
      centered
    >
      <div className="card">
        <div className="card-body">
          <div className="modal-control-container">
            <p className="h3 mb-spacer text-center">Perform</p>
            <div className="group-center ">
              <label htmlFor="gasLimit">Select gas limit:</label>
              <Form.Control
                id="gasLimit"
                className="form-control"
                value={selectedGasLimit}
                autoComplete="off"
                isInvalid={error != null}
                onChange={handleChangeGasLimit}
              />
              {error != null && (
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              )}
            </div>
          </div>
          <div>
            <div className="modal-action-btns">
              <button
                onClick={handleClose}
                className="btn btn-primary btn-light "
              >
                <FontAwesomeIcon icon={faTimes} />
                Cancel
              </button>

              <button
                onClick={onPerformAction}
                disabled={error != null}
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faCheck} />
                Perform
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PerformActionModal;
