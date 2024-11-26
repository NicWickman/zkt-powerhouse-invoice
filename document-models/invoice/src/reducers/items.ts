/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { EditLineItemInput, InvoiceLineItem } from 'document-models/invoice';
import { InvoiceItemsOperations } from '../../gen/items/operations';

export const reducer: InvoiceItemsOperations = {
    addLineItemOperation(state, action, dispatch) {
        try {
            const item = {
                ...action.input,
            };

            if (state.lineItems.find((x) => x.id === item.id))
                throw new Error('Duplicate input.id');

            validatePrices(item);

            state.lineItems.push(item);
        } catch (e) {
            console.error(e);
        }
    },

    editLineItemOperation(state, action, dispatch) {
        try {
            const stateItem = state.lineItems.find(
                (x) => x.id === action.input.id,
            );
            if (!stateItem) throw new Error('Item matching input.id not found');

            const sanitizedInput = Object.fromEntries(
                Object.entries(action.input).filter(
                    ([, value]) => value !== null,
                ),
            ) as Partial<InvoiceLineItem>;

            const nextItem: InvoiceLineItem = {
                ...stateItem,
                ...sanitizedInput,
            };

            validatePrices(nextItem);
            Object.assign(stateItem, nextItem);
        } catch (e) {
            console.error(e);
        }
    },

    deleteLineItemOperation(state, action, dispatch) {
        try {
            state.lineItems = state.lineItems.filter(
                (x) => x.id !== action.input.id,
            );
        } catch (e) {
            console.error(e);
        }
    },
};

function validatePrices(item: InvoiceLineItem) {
    const calcPriceIncl = item.quantity * item.unitPriceTaxIncl;
    const calcPriceExcl = item.quantity * item.unitPriceTaxExcl;

    if (calcPriceIncl !== item.totalPriceTaxIncl)
        throw new Error(
            'Calculated unitPriceTaxIncl does not match input total',
        );

    if (calcPriceExcl !== item.totalPriceTaxExcl)
        throw new Error(
            'Calculated unitPriceTaxExcl does not match input total',
        );

    if (
        item.unitPriceTaxExcl.toFixed(2) !==
        (
            item.unitPriceTaxIncl -
            (item.taxPercent / 100) * item.unitPriceTaxIncl
        ).toFixed(2)
    )
        throw new Error(
            'Tax inclusive/exclusive unit prices failed comparison.',
        );

    if (
        calcPriceExcl.toFixed(2) !==
        (calcPriceIncl - (item.taxPercent / 100) * calcPriceIncl).toFixed(2)
    )
        throw new Error('Tax inclusive/exclusive totals failed comparison.');
}
