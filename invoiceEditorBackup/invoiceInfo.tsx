/* eslint-disable react/jsx-max-depth */
import { Copy, CreditCard, MoreVertical, Truck } from 'lucide-react';
import { Button } from './components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

import { Separator } from './components/ui/separator';
import { Bank, InvoiceState } from 'document-models/invoice';
import { useEffect, useMemo } from 'react';
import {
    BankSchema,
    InvoiceLineItemSchema,
    WalletSchema,
} from '../document-models/invoice/gen/schema/zod';

import { InvoiceLineItem, Wallet } from '../document-models/invoice/gen/schema';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './components/ui/table';
import { Sheet, SheetHeader, SheetTitle } from './components/ui/sheet';

export default function InvoiceInfo({
    invoice,
}: {
    readonly invoice: InvoiceState;
}) {
    useEffect(() => {
        console.log(invoice.lineItems);
    });

    const wallet = useMemo(() => {
        const parsed = WalletSchema().safeParse(
            invoice.issuer.paymentRouting?.wallet,
        );
        if (parsed.success) {
            return parsed.data;
        } else {
            return null;
        }
    }, [invoice.issuer.paymentRouting]);

    const bank = useMemo(() => {
        const parsed = BankSchema().safeParse(
            invoice.issuer.paymentRouting?.bank,
        );
        if (parsed.success) {
            return parsed.data;
        } else {
            return null;
        }
    }, [invoice.issuer.paymentRouting]);

    const lineItems = useMemo(() => {
        return invoice.lineItems.filter(
            (lineItem) => InvoiceLineItemSchema().safeParse(lineItem).success,
        ) as unknown as InvoiceLineItem[];
    }, [invoice.lineItems]);

    const itemsTotalTaxExcl = useMemo(() => {
        return lineItems.reduce((total, lineItem) => {
            return total + lineItem.quantity * lineItem.totalPriceTaxExcl;
        }, 0.0);
    }, [lineItems]);

    const itemsTotalTaxIncl = useMemo(() => {
        return lineItems.reduce((total, lineItem) => {
            return total + lineItem.quantity * lineItem.totalPriceTaxIncl;
        }, 0.0);
    }, [lineItems]);

    // const serviceLineItems = useMemo(() => {
    //     return invoice.lineItems.filter(
    //         (lineItem) => WorkItemSchema().safeParse(lineItem).success,
    //     ) as unknown as WorkItem[];
    // }, [invoice.lineItems]);

    // const expenseLineItems = useMemo(() => {
    //     return invoice.lineItems.filter(
    //         (lineItem) => ExpenseItemSchema().safeParse(lineItem).success,
    //     ) as unknown as ExpenseItem[];
    // }, [invoice.lineItems]);

    // const servicesTotal = useMemo(() => {
    //     return serviceLineItems.reduce((total, lineItem) => {
    //         return total + lineItem.quantity * lineItem.unitPrice;
    //     }, 0.0);
    // }, [serviceLineItems]);

    // const expensesTotal = useMemo(() => {
    //     return expenseLineItems.reduce((total, lineItem) => {
    //         return total + lineItem.amount;
    //     }, 0.0);
    // }, [expenseLineItems]);

    return (
        <div className="grid col-span-2">
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Invoice {invoice.invoiceNo}
                        </CardTitle>
                        <CardDescription>{invoice.issuer.name}</CardDescription>

                        <CardDescription>
                            Issued:{' '}
                            {new Date(invoice.dateIssued).toDateString()}
                        </CardDescription>
                        <CardDescription>
                            Due: {new Date(invoice.dateDue).toDateString()}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <Separator className="my-4" />
                    <div className="grid gap-4 grid-cols-2">
                        <div>
                            <div className="font-semibold text-lg">
                                {invoice.payer.name}
                            </div>
                            <div className="grid gap-0.5 not-italic text-muted-foreground">
                                <span>
                                    {invoice.payer.address?.streetAddress}
                                    {invoice.payer.address?.extendedAddress}
                                    {invoice.payer.address?.postalCode}
                                    {invoice.payer.address?.city}
                                    {invoice.payer.address?.country}
                                </span>
                                <span>
                                    <span className="font-semibold">
                                        Corp. Reg: {invoice.payer.corpRegId}
                                    </span>
                                    <span className="font-semibold">
                                        Tax ID: {invoice.payer.taxId}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">
                                {invoice.issuer.name}
                            </div>
                            <div className="grid gap-0.5 not-italic text-muted-foreground">
                                <span>
                                    {invoice.issuer.address?.streetAddress}
                                    {invoice.issuer.address?.extendedAddress}
                                    {invoice.issuer.address?.postalCode}
                                    {invoice.issuer.address?.city}
                                    {invoice.issuer.address?.country}
                                </span>
                                <span>
                                    <span className="font-semibold">
                                        Corp. Reg: {invoice.issuer.corpRegId}
                                    </span>
                                    <span className="font-semibold">
                                        Tax ID: {invoice.issuer.taxId}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-4 grid-cols-2">
                        <div className="grid col-start-2">
                            {bank ? <RenderBank bank={bank} /> : null}
                            {wallet ? <RenderWallet wallet={wallet} /> : null}
                        </div>
                    </div>
                    <Separator className="my-8" />
                    {lineItems.length ? (
                        <RenderServiceItems
                            lineItems={lineItems}
                            total={itemsTotalTaxIncl}
                        />
                    ) : null}
                    {/* <div className="grid px-6">
                        <TableCell className="text-end font-bold text-lg">
                            <span className="font-extralight text-sm">
                                USD{' '}
                            </span>
                            ${(servicesTotal + expensesTotal).toFixed(2)}{' '}
                        </TableCell>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    );
}

function RenderBank({ bank }: { readonly bank: Partial<Bank> }) {
    return (
        <div className="grid gap-0.5 not-italic text-muted-foreground">
            <div className="font-semibold text-lg">Vendor Bank</div>
            <span>
                <span className="font-semibold">Name: </span>
                {bank.name}
            </span>
            <span>
                <span className="font-semibold">Address: </span>
                {bank.address?.streetAddress}
                {bank.address?.extendedAddress}
                {bank.address?.postalCode}
                {bank.address?.city}
                {bank.address?.country}
            </span>
            <span>
                <span className="font-semibold">Account No.: </span>
                {bank.accountNum}
            </span>
            <span>
                <span className="font-semibold">Account Type: </span>
                {bank.accountType}
            </span>
            {bank.beneficiary ? (
                <span>
                    <span className="font-semibold">
                        Account Holder / Beneficiary:{' '}
                    </span>
                    {bank.beneficiary}
                </span>
            ) : null}
            {bank.ABA ? (
                <span>
                    <span className="font-semibold">ABA: </span> {bank.ABA}
                </span>
            ) : null}
            {bank.SWIFT ? (
                <span>
                    <span className="font-semibold">SWIFT: </span> {bank.SWIFT}
                </span>
            ) : null}
            {bank.memo ? (
                <span>
                    <span className="font-semibold">Memo: </span> {bank.memo}
                </span>
            ) : null}
        </div>
    );
}

function RenderWallet({ wallet }: { readonly wallet: Wallet }) {
    return (
        <div className="grid gap-0.5 not-italic text-muted-foreground">
            <div className="font-semibold">Vendor Wallet</div>
            <span>{wallet.address}</span>
            <span>
                <span className="font-semibold">RPC: </span>
                {wallet.rpc}
            </span>
        </div>
    );
}

function RenderServiceItems({
    lineItems,
    total,
}: {
    readonly lineItems: InvoiceLineItem[];
    readonly total: number;
}) {
    return (
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-1">
            <Sheet>
                <SheetHeader className="px-7">
                    <SheetTitle>Services</SheetTitle>
                </SheetHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead className="text-start">
                                    Quantity
                                </TableHead>
                                <TableHead className="text-center">
                                    Unit Price
                                </TableHead>
                                <TableHead className="text-end">
                                    Total
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lineItems.length
                                ? lineItems.map(
                                      (lineItem: InvoiceLineItem, idx) => {
                                          const item = lineItem;
                                          return (
                                              <TableRow key={lineItem.id}>
                                                  <TableCell>
                                                      <div className="">
                                                          {item.description}
                                                      </div>
                                                  </TableCell>
                                                  <TableCell className="text">
                                                      {item.quantity}
                                                  </TableCell>
                                                  <TableCell className="text-center">
                                                      {item.unitPriceTaxExcl.toFixed(
                                                          2,
                                                      )}
                                                  </TableCell>
                                                  <TableCell className="text-end">
                                                      {(
                                                          item.quantity *
                                                          item.unitPriceTaxExcl
                                                      ).toFixed(2)}
                                                  </TableCell>
                                              </TableRow>
                                          );
                                      },
                                  )
                                : null}
                            <TableRow>
                                <TableCell />
                                <TableCell />
                                <TableCell />
                                <TableCell className="text-end">
                                    {total.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Sheet>
        </div>
    );
}

// function RenderExpenseItems({
//     lineItems,
//     total,
// }: {
//     readonly lineItems: LineItem[];
//     readonly total: number;
// }) {
//     return (
//         <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-1">
//             <Sheet>
//                 <SheetHeader className="px-7">
//                     <SheetTitle>Expenses</SheetTitle>
//                 </SheetHeader>
//                 <CardContent>
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead className="font-semibold text-start">
//                                     Expense
//                                 </TableHead>
//                                 <TableHead className="font-semibold text-end">
//                                     Total
//                                 </TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {lineItems.length
//                                 ? lineItems.map((lineItem: LineItem, idx) => {
//                                       const item = lineItem as ExpenseItem;
//                                       return (
//                                           <TableRow key={idx}>
//                                               <TableCell>
//                                                   <div className="text-start">
//                                                       {item.description}
//                                                   </div>
//                                               </TableCell>
//                                               <TableCell className="text-end">
//                                                   {item.amount.toFixed(2)}
//                                               </TableCell>
//                                           </TableRow>
//                                       );
//                                   })
//                                 : null}
//                             <TableRow>
//                                 <TableCell />
//                                 <TableCell className="text-end">
//                                     {total.toFixed(2)}
//                                 </TableCell>
//                             </TableRow>
//                         </TableBody>
//                     </Table>
//                 </CardContent>
//             </Sheet>
//         </div>
//     );
// }
