// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import React, { useState } from 'react';
// import { Button } from './components/ui/button';
// import { Card } from './components/ui/card';
// import { Badge } from './components/ui/badge';
// import { Dialog } from './components/ui/dialog';

// import InvoiceForm from './InvoiceForm';
// import { EditorProps } from 'document-model/document';
// import {
//     actions,
//     InvoicingState,
//     InvoicingAction,
//     InvoicingLocalState,
//     CreateInvoiceInput,
//     EditInvoiceInput,
//     DeleteInvoiceInput,
//     Scalars,
//     Invoice,
// } from '../../document-models/invoicing';

// export type IProps = EditorProps<
//     InvoicingState,
//     InvoicingAction,
//     InvoicingLocalState
// >;

// export type InvoiceFormData = Omit<EditInvoiceInput, 'invoice'> & {
//     invoice?: Invoice;
// };

// function InvoicingEditor(props: IProps) {
//     const { document, dispatch } = props;
//     const {
//         state: { global: state },
//     } = document;

//     const [invoiceFormData, setInvoiceFormData] = useState<InvoiceFormData>({});
//     const [newInvoiceView, setNewInvoiceView] = useState<boolean>(false);
//     const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(
//         null,
//     );
//     const [editMode, setEditMode] = useState<boolean>(false);

//     function createInvoice(input: CreateInvoiceInput) {
//         dispatch(actions.createInvoice(input));
//     }

//     function editInvoice(input: EditInvoiceInput) {
//         dispatch(actions.editInvoice(input));
//     }

//     function deleteInvoice(input: DeleteInvoiceInput) {
//         dispatch(actions.deleteInvoice(input));
//     }

//     function submitInvoiceForm(data: InvoiceFormData) {
//         if (selectedInvoice && data.invoice) {
//             editInvoice(data as EditInvoiceInput);
//         } else {
//             createInvoice(data as CreateInvoiceInput);
//         }
//         setNewInvoiceView(false);
//         setEditMode(false);
//     }

//     function handleInputChange(key: keyof InvoiceFormData, value: any) {
//         setInvoiceFormData(prev => ({
//             ...prev,
//             [key]: value,
//         }));
//     }

//     const handleInvoiceSelect = (invoice: Invoice) => {
//         setSelectedInvoice(invoice);
//         setEditMode(false);
//         setInvoiceFormData(invoice);
//     };

//     return (
//         <div className="flex gap-6 p-6 font-sans">
//             {/* Left Side: List of Invoices */}
//             <div className="w-1/4">
//                 <Card>
//                     <h2 className="text-xl font-semibold mb-4">Invoices</h2>
//                     {!newInvoiceView && (
//                         <Button
//                             className="secondary"
//                             onClick={() => setNewInvoiceView(true)}
//                         >
//                             New Invoice
//                         </Button>
//                     )}
//                     <ul className="mt-4 space-y-2">
//                         {state.invoices.map(invoice => (
//                             <li key={invoice.id}>
//                                 <Button
//                                     variant="ghost"
//                                     onClick={() => handleInvoiceSelect(invoice)}
//                                     className="justify-start"
//                                 >
//                                     <Badge>{invoice.invoiceNo}</Badge> -{' '}
//                                     {invoice.payer.name}
//                                 </Button>
//                             </li>
//                         ))}
//                     </ul>
//                 </Card>
//             </div>

//             {/* Right Side: Invoice Details or Invoice Form */}
//             <div className="w-2/3">
//                 <Card>
//                     {newInvoiceView ? (
//                         <Dialog
//                             open={newInvoiceView}
//                             onOpenChange={setNewInvoiceView}
//                         >
//                             <h2 className="text-xl font-semibold mb-4">
//                                 Create New Invoice
//                             </h2>
//                             <InvoiceForm
//                                 data={invoiceFormData}
//                                 handleInputChange={handleInputChange}
//                                 submitForm={submitInvoiceForm}
//                             />
//                             <Button
//                                 variant="secondary"
//                                 onClick={() => setNewInvoiceView(false)}
//                             >
//                                 Close
//                             </Button>
//                         </Dialog>
//                     ) : selectedInvoice ? (
//                         <div>
//                             <h2 className="text-xl font-semibold mb-4">
//                                 Invoice Details
//                             </h2>
//                             <p>
//                                 <strong>Invoice ID:</strong>{' '}
//                                 {selectedInvoice.invoiceNo}
//                             </p>
//                             <p>
//                                 <strong>Customer Name:</strong>{' '}
//                                 {selectedInvoice.payer.name}
//                             </p>
//                             <p>
//                                 <strong>Address:</strong>{' '}
//                                 {selectedInvoice.payer.address}
//                             </p>
//                             <p>
//                                 <strong>Date Issued:</strong>{' '}
//                                 {new Date(
//                                     selectedInvoice.dateIssued,
//                                 ).toLocaleDateString()}
//                             </p>
//                             <Button onClick={() => setEditMode(true)}>
//                                 Edit Invoice
//                             </Button>
//                             {editMode && (
//                                 <Dialog
//                                     open={editMode}
//                                     onOpenChange={setEditMode}
//                                 >
//                                     <h2 className="text-xl font-semibold mb-4">
//                                         Edit Invoice
//                                     </h2>
//                                     <InvoiceForm
//                                         data={invoiceFormData}
//                                         handleInputChange={handleInputChange}
//                                         submitForm={submitInvoiceForm}
//                                     />
//                                     <Button
//                                         variant="secondary"
//                                         onClick={() => setEditMode(false)}
//                                     >
//                                         Cancel Edit
//                                     </Button>
//                                 </Dialog>
//                             )}
//                         </div>
//                     ) : (
//                         <p>Select an invoice to view details</p>
//                     )}
//                 </Card>
//             </div>
//         </div>
//     );
// }

// export default InvoicingEditor;
