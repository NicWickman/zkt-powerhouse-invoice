/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { InvoiceGeneralOperations } from '../../gen/general/operations';

export const reducer: InvoiceGeneralOperations = {
    editInvoiceOperation(state, action, dispatch) {
        try {
            const newState = { ...state };
            newState.currency = action.input.currency || state.currency;
            newState.dateDelivered =
                action.input.dateDelivered || state.dateDelivered;
            newState.dateDue = action.input.dateDue || state.dateDue;
            newState.dateIssued = action.input.dateIssued || state.dateIssued;
            newState.invoiceNo = action.input.invoiceNo || state.invoiceNo;
            newState.title = action.input.title || state.title;
        } catch (e) {
            console.error(e);
        }
    },
    editStatusOperation(state, action, dispatch) {
        try {
            state.status = action.input.status;
        } catch (e) {
            console.error(e);
        }
    },
    addRefOperation(state, action, dispatch) {
        // try {
        //     if (!action.input.id) throw new Error('No input.id');
        //     if (!action.input.value) throw new Error('No input.value');
        //     //@ts-ignore  Gotta add ID to refs
        //     if (state.refs.find((r) => r.id == action.input.id))
        //         throw new Error('Ref already exists with provided input.id');
        //     state.refs.push(action.input);
        // } catch (e) {
        //     console.error(e);
        // }
        try {
            throw new Error('Not implemented');
        } catch (e) {
            console.error(e);
        }
    },
    editRefOperation(state, action, dispatch) {
        // TODO: Implement "editRefOperation" reducer
        try {
            throw new Error('Reducer "editRefOperation" not yet implemented');
        } catch (e) {
            console.error(e);
        }
    },
    deleteRefOperation(state, action, dispatch) {
        // TODO: Implement "deleteRefOperation" reducer
        throw new Error('Reducer "deleteRefOperation" not yet implemented');
    },
};
