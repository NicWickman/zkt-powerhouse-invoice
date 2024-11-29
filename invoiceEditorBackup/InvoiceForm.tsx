/* eslint-disable react/jsx-no-bind */
import { InvoiceLineItem } from '../document-models/invoice';
import { ChangeEvent } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { InvoiceFormData } from './editor';

export default function InvoiceForm({
    data,
    handleInputChange,
    submitForm,
}: {
    readonly data: InvoiceFormData;
    readonly handleInputChange: (key: any, value: any) => void;
    readonly submitForm: (arg: any) => void;
}) {
    return (
        <form className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Invoice Information</h2>

            <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('payer', {
                        ...data.payer,
                        name: e.target.value,
                    })
                }
                placeholder="Customer Name"
                value={data.payer.name || ''}
            />
            {/* <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('payer', {
                        ...data.payer,
                        address: e.target.value,
                    })
                }
                placeholder="Customer Address"
                value={data.payer.address || ''}
            /> */}
            <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('dateIssued', e.target.value)
                }
                placeholder="Date Issued"
                type="date"
                value={data.dateIssued || ''}
            />

            <h3 className="text-lg font-semibold">Line Items</h3>
            {data.lineItems.map((item: InvoiceLineItem, index: number) => (
                <div className="space-y-2" key={index}>
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(
                                `lineItems[${index}].quantity`,
                                parseInt(e.target.value, 10),
                            )
                        }
                        placeholder="Quantity"
                        value={item.quantity || ''}
                    />
                    <Input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(
                                `lineItems[${index}].unitPrice`,
                                parseFloat(e.target.value),
                            )
                        }
                        placeholder="Unit Price"
                        value={item.unitPriceTaxExcl || ''}
                    />
                </div>
            ))}

            <h3 className="text-lg font-semibold">Routing Information</h3>
            {/* <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('routing', {
                        ...data.issuer.paymentRouting,
                        address: e.target.value,
                    })
                }
                placeholder="Routing Address"
                value={data.routing.address || ''}
            /> */}

            <Button onClick={() => submitForm(data)} type="submit">
                Save Invoice
            </Button>
        </form>
    );
}
