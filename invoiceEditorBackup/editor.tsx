import { EditorProps } from 'document-model/document';
import {
    InvoiceState,
    InvoiceAction,
    InvoiceLocalState,
} from '../document-models/invoice';
import InvoiceInfo from './invoiceInfo';

export type IProps = EditorProps<
    InvoiceState,
    InvoiceAction,
    InvoiceLocalState
>;

export type InvoiceFormData = InvoiceState;

function InvoiceEditor(props: IProps) {
    const { document, dispatch } = props;
    const {
        state: { global: state },
    } = document;

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <InvoiceInfo invoice={state} />
        </div>
    );
}

export default InvoiceEditor;
