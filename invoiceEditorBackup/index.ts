/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { lazyWithPreload } from 'document-model-libs/utils';

export const module = {
    Component: lazyWithPreload(() => import('./editor')),
    documentTypes: ['*'],
    config: {
        id: 'invoice-editor',
        disableExternalControls: false,
    },
};

export default module;
