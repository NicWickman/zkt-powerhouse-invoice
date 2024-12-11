/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createDocumentStory } from 'document-model-libs/utils';
import { reducer, utils } from '../../document-models/invoice';
import Editor from './editor';
import mockInvoiceState from './mock/invoice';

const { meta, CreateDocumentStory: LegalEntity } = createDocumentStory(
    Editor,
    reducer,
    utils.createExtendedState({
        state: { global: {}, local: {} },
    }),
);

export default {
    ...meta,
    title: 'LegalEntity',
    invoice: mockInvoiceState,
};

export { LegalEntity };
