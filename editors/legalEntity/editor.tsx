/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-bind */
import { useMemo } from 'react';
import { EditorProps } from 'document-model/document';
import {
    LegalEntityState,
    LegalEntityAction,
    LegalEntityLocalState,
    actions,
    EditLegalEntityInput,
    EditLegalEntityBankInput,
    EditLegalEntityWalletInput,
} from '../../document-models/legal-entity';

import { LegalEntityForm } from './legalEntity';

export default function Editor(
    props: EditorProps<
        LegalEntityState,
        LegalEntityAction,
        LegalEntityLocalState
    >,
) {
    const { document, dispatch } = props;
    const state = document.state.global;

    function handleUpdateLegalEntityInfo(input: EditLegalEntityInput) {
        dispatch(actions.editLegalEntity(input));
    }

    function handleUpdateLegalEntityBank(input: EditLegalEntityBankInput) {
        dispatch(actions.editLegalEntityBank(input));
    }

    function handleUpdateLegalEntityWallet(input: EditLegalEntityWalletInput) {
        // dispatch(actions.editLegalEntityBank(input));
        throw new Error('Unimplemented');
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">LegalEntity</h1>
                </div>
            </div>
            <div className="flex justify-between mb-8">
                <LegalEntityForm
                    legalEntity={state}
                    onChangeBank={handleUpdateLegalEntityBank}
                    onChangeInfo={handleUpdateLegalEntityInfo}
                />
            </div>
        </div>
    );
}
