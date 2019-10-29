import { takeLatest, put, select } from 'redux-saga/effects';
import { ACCOUNT_ACTIONS } from './constants';
import {
  accountCreateSetCredentials,
  accountSetCreate,
  accountSetCreateStage,
  accountAddAccount,
  accountCreateSetRestoreCredentials,
  accountCreateClear,
} from './actions';
import { ACCOUNT_CREATION_STAGES, IAccountState, ACCOUNT_INITIAL_STATE } from '.';
import { accountMnemonicToKeys } from '~/utility/account';
import bip from 'bip39';
import { selectAccountCreate } from './selectors';
import { push } from 'connected-react-router';
import { URLS } from '~/constants/urls';
import { Fantom } from '~/utility/web3';

function* createSetCredentials({ create }: ReturnType<typeof accountCreateSetCredentials>) {
  const mnemonic: string = bip.generateMnemonic();
  const { publicAddress: public_address } = accountMnemonicToKeys(mnemonic);

  yield put(
    accountSetCreate({
      ...create,
      stage: ACCOUNT_CREATION_STAGES.INFO,
      public_address,
      mnemonic,
    })
  );
}

function* createSetRestoreCredentials({ create }: ReturnType<typeof accountCreateSetRestoreCredentials>) {
  const mnemonic: string = bip.generateMnemonic();
  const { publicAddress: public_address } = accountMnemonicToKeys(mnemonic);

  yield put(
    accountSetCreate({
      ...create,
      stage: ACCOUNT_CREATION_STAGES.INFO,
      public_address,
      mnemonic,
    })
  );
}

function* createSetInfo() {
  yield put(accountSetCreateStage(ACCOUNT_CREATION_STAGES.CONFIRM));
}

function* createSetConfirm() {
  const { mnemonic, password, name, icon, public_address }: IAccountState['create'] = yield select(
    selectAccountCreate
  );

  if (!name || !password || !icon || !public_address || !mnemonic)
    return yield put(accountSetCreate(ACCOUNT_INITIAL_STATE.create));

  const keys = Fantom.mnemonicToKeys(mnemonic);
  const keystore = Fantom.getKestore(keys.privateKey, password);

  yield put(
    accountAddAccount({
      name,
      icon,
      keystore,
      public_address,
    })
  );
  yield put(push(URLS.ACCOUNT_LIST));
}

function* createCancel() {
  yield put(accountCreateClear());
  yield put(push('/'));
}

export function* accountSaga() {
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CREDENTIALS, createSetCredentials);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_RESTORE_CREDENTIALS, createSetRestoreCredentials);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_INFO, createSetInfo);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_SET_CONFIRM, createSetConfirm);
  yield takeLatest(ACCOUNT_ACTIONS.CREATE_CANCEL, createCancel);
}
