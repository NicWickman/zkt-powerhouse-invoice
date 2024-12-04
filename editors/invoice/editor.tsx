/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-bind */
import { useMemo } from 'react';
import { EditorProps } from 'document-model/document';
import {
    InvoiceState,
    InvoiceAction,
    InvoiceLineItem,
    InvoiceLocalState,
    actions,
    EditIssuerInput,
    EditIssuerBankInput,
    EditPayerInput,
    DeleteLineItemInput,
} from '../../document-models/invoice';

import { DateTimeLocalInput } from './dateTimeLocalInput';
import { LegalEntityForm } from './legalEntity';
import { LineItemsTable } from './lineItems';

export default function Editor(
    props: EditorProps<InvoiceState, InvoiceAction, InvoiceLocalState>,
) {
    const { document, dispatch } = props;
    const state = document.state.global;

    const itemsTotalTaxExcl = useMemo(() => {
        return state.lineItems.reduce((total, lineItem) => {
            return total + lineItem.quantity * lineItem.unitPriceTaxExcl;
        }, 0.0);
    }, [state.lineItems]);

    const itemsTotalTaxIncl = useMemo(() => {
        return state.lineItems.reduce((total, lineItem) => {
            return total + lineItem.quantity * lineItem.unitPriceTaxIncl;
        }, 0.0);
    }, [state.lineItems]);

    function handleAddItem(newItem: InvoiceLineItem) {
        dispatch(actions.addLineItem(newItem));
    }

    function handleUpdateItem(updatedItem: InvoiceLineItem) {
        dispatch(actions.editLineItem(updatedItem));
    }

    function handleDeleteItem(input: DeleteLineItemInput) {
        dispatch(actions.deleteLineItem(input));
    }

    function handleUpdateDateIssued(updatedDate: string) {
        dispatch(
            actions.editInvoice({
                ...state,
                dateIssued: updatedDate,
            }),
        );
    }

    function handleUpdateDateDue(updatedDate: string) {
        dispatch(
            actions.editInvoice({
                ...state,
                dateDue: updatedDate,
            }),
        );
    }

    function handleUpdateIssuerInfo(input: EditIssuerInput) {
        dispatch(actions.editIssuer(input));
    }

    function handleUpdateIssuerBank(input: EditIssuerBankInput) {
        dispatch(actions.editIssuerBank(input));
    }

    function handleUpdatePayerInfo(input: EditPayerInput) {
        dispatch(actions.editPayer(input));
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Invoice</h1>
            <div className="flex justify-between mb-8">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Issuer</h3>
                    <label className="mr-2">Issue Date:</label>
                    <DateTimeLocalInput
                        className="w-64 ml-2"
                        defaultValue={state.dateIssued}
                        onChange={(e) => handleUpdateDateIssued(e.target.value)}
                    />
                    <LegalEntityForm
                        legalEntity={state.issuer}
                        onChangeBank={handleUpdateIssuerBank}
                        onChangeInfo={handleUpdateIssuerInfo}
                    />
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Payer</h3>
                    <label className="mr-2">Due Date:</label>
                    <DateTimeLocalInput
                        className="w-64 ml-2"
                        defaultValue={state.dateDue}
                        onChange={(e) => handleUpdateDateDue(e.target.value)}
                    />
                    <LegalEntityForm
                        bankDisabled
                        legalEntity={state.payer}
                        onChangeInfo={handleUpdatePayerInfo}
                    />
                </div>
            </div>

            <LineItemsTable
                currency="USD"
                lineItems={state.lineItems}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
                onUpdateItem={handleUpdateItem}
            />

            {/* Totals */}
            <div className="text-right font-bold space-y-1">
                <p>Total (excl. tax): {itemsTotalTaxExcl.toFixed(2)}</p>
                <p>Total (incl. tax): {itemsTotalTaxIncl.toFixed(2)}</p>
            </div>
        </div>
    );
}
