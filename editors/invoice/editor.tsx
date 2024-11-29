/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState, useMemo } from 'react';
import { EditorProps } from 'document-model/document';
import {
    InvoiceState,
    InvoiceAction,
    InvoiceLineItem,
    InvoiceLocalState,
    AddLineItemInput,
    actions,
    EditInvoiceInput,
} from '../../document-models/invoice';
import {
    RWAButton,
    Modal,
    Button,
    FormInput,
} from '@powerhousedao/design-system';
import { InvoiceLineItemSchema } from '../../document-models/invoice/gen/schema/zod';
import { DateTimeLocalInput } from './dateTimeLocalInput';

interface LineItemModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onSave: (input: AddLineItemInput) => void;
}

const LineItemModal: React.FC<LineItemModalProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');

    const handleSave = () => {
        // setDescription('');
        // setQuantity('');
        // setUnitPrice('');
        // onSave(description, Number(quantity), Number(unitPrice));
        onClose();
    };

    return (
        <Modal open={isOpen}>
            <div
                style={{
                    padding: '20px',
                    width: '350px',
                    borderRadius: '10px',
                }}
            >
                <h2
                    style={{
                        fontWeight: 'bold',
                        fontSize: '1.5em',
                        marginBottom: '10px',
                    }}
                >
                    Add Line Item
                </h2>
                <div>
                    <label>Description:</label>
                    <FormInput
                        onChange={(e: {
                            target: { value: React.SetStateAction<string> };
                        }) => setDescription(e.target.value)}
                        style={{ width: '100%' }}
                        value={description}
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <FormInput
                        onChange={(e: {
                            target: { value: React.SetStateAction<string> };
                        }) => setQuantity(e.target.value)}
                        style={{ width: '100%' }}
                        type={'number' as 'text'}
                        value={quantity}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Unit Price:</label>
                    <FormInput
                        onChange={(e: {
                            target: { value: React.SetStateAction<string> };
                        }) => setUnitPrice(e.target.value)}
                        style={{ width: '100%' }}
                        type={'number' as 'text'}
                        value={unitPrice}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} style={{ marginRight: '10px' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
        </Modal>
    );
};

export default function Editor(
    props: EditorProps<InvoiceState, InvoiceAction, InvoiceLocalState>,
) {
    const [dateIssued, setDateIssued] = useState('');
    const [dateDue, setDateDue] = useState('');
    const [issuerName, setIssuerName] = useState('');
    const [payerName, setPayerName] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { document, dispatch } = props;
    const state = document.state.global;

    const lineItems = useMemo(() => {
        return state.lineItems.filter(
            (lineItem: unknown) =>
                InvoiceLineItemSchema().safeParse(lineItem).success,
        );
    }, [state.lineItems]);

    const itemsTotalTaxExcl = useMemo(() => {
        return lineItems.reduce((total, lineItem) => {
            return total + lineItem.quantity * lineItem.unitPriceTaxExcl;
        }, 0.0);
    }, [lineItems]);

    const itemsTotalTaxIncl = useMemo(() => {
        return lineItems.reduce((total, lineItem) => {
            return total + lineItem.quantity * lineItem.unitPriceTaxIncl;
        }, 0.0);
    }, [lineItems]);

    const handleAddLineItem = () => {
        setIsModalOpen(true);
    };

    const handleSaveLineItem = (input: AddLineItemInput) => {
        dispatch(actions.addLineItem(input));
    };

    const updateInvoice = (input: EditInvoiceInput) => {
        dispatch(actions.editInvoice(input));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>Invoice</h1>
            <div>
                <label>Issue Date:</label>
                <DateTimeLocalInput
                    defaultValue={state.dateIssued}
                    onChange={(e) => setDateIssued(e.target.value)}
                    style={{
                        marginTop: '10px',
                        marginLeft: '10px',
                        width: '250px',
                    }}
                />
            </div>
            <div>
                <label>Due Date:</label>
                <DateTimeLocalInput
                    defaultValue={state.dateDue}
                    onChange={(e) => setDateDue(e.target.value)}
                    style={{
                        marginTop: '10px',
                        marginLeft: '10px',
                        width: '250px',
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                }}
            >
                <div>
                    <h3>Issuer</h3>
                    <FormInput
                        defaultValue={state.issuer.name || ''}
                        onChange={(e: {
                            target: { value: React.SetStateAction<string> };
                        }) => setIssuerName(e.target.value)}
                        placeholder="Issuer Name"
                        style={{ width: '200px' }}
                    />
                </div>
                <div>
                    <h3>Payer</h3>
                    <FormInput
                        defaultValue={state.payer.name || ''}
                        onChange={(e: {
                            target: { value: React.SetStateAction<string> };
                        }) => setPayerName(e.target.value)}
                        placeholder="Payer Name"
                        style={{ width: '200px' }}
                    />
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <h4 style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        Line Items
                    </h4>
                    <RWAButton
                        onClick={handleAddLineItem}
                        style={{ marginBottom: '10px' }}
                    >
                        Add Line Item
                    </RWAButton>
                </div>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginBottom: '20px',
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                }}
                            >
                                Description
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                }}
                            >
                                Quantity
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                }}
                            >
                                Unit Price (excl. tax)
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                }}
                            >
                                Total (excl. tax)
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                }}
                            >
                                Total (incl. tax)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lineItems.map((item) => (
                            <tr
                                key={item.id}
                                style={{ backgroundColor: '#fff' }}
                            >
                                <td
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                    }}
                                >
                                    {item.description}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                    }}
                                >
                                    {item.quantity}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                    }}
                                >
                                    {item.unitPriceTaxExcl.toFixed(2)}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                    }}
                                >
                                    {(
                                        item.quantity * item.unitPriceTaxExcl
                                    ).toFixed(2)}
                                </td>
                                <td
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                    }}
                                >
                                    {(
                                        item.quantity * item.unitPriceTaxIncl
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    <p>Total (excl. tax): {itemsTotalTaxExcl.toFixed(2)}</p>
                    <p>Total (incl. tax): {itemsTotalTaxIncl.toFixed(2)}</p>
                </div>
            </div>

            <LineItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveLineItem}
            />

            <pre style={{ marginTop: '40px' }}>
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    );
}
