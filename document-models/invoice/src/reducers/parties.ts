/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { LegalEntityId } from 'document-models/invoice/gen';
import { InvoicePartiesOperations } from '../../gen/parties/operations';

export const reducer: InvoicePartiesOperations = {
    editIssuerOperation(state, action, dispatch) {
        try {
            state.issuer = {
                ...state.issuer,
                address: {
                    city: action.input.city,
                    country: action.input.country,
                    extendedAddress: action.input.extendedAddress,
                    postalCode: action.input.postalCode,
                    stateProvince: action.input.stateProvince,
                    streetAddress: action.input.streetAddress,
                },
                contactInfo: {
                    tel: action.input.tel,
                    email: action.input.email,
                },
                country: action.input.country,
                id: action.input.id,
                name: action.input.name,
            };
        } catch (e) {
            console.error(e);
        }
    },
    editIssuerBankOperation(state, action, dispatch) {
        try {
            state.issuer.paymentRouting.bank = {
                ABA: action.input.ABA,
                IBAN: action.input.IBAN,
                SWIFT: action.input.SWIFT,
                accountNum:
                    action.input.accountNum ||
                    state.issuer.paymentRouting.bank.accountNum,
                accountType: action.input.accountType,
                address: {
                    city: action.input.city,
                    country: action.input.country,
                    extendedAddress: action.input.extendedAddress,
                    postalCode: action.input.postalCode,
                    stateProvince: action.input.stateProvince,
                    streetAddress: action.input.streetAddress,
                },
                beneficiary: action.input.beneficiary,
                contact: {
                    tel: action.input.tel,
                    email: action.input.email,
                },
                name: action.input.name,
                memo: action.input.memo
                intermediaryBank: {
                    ABAIntermediary: action.input.ABAIntermediary,
                    IBANIntermediary: action.input.IBANIntermediary,
                    SWIFTIntermediary: action.input.SWIFTIntermediary,
                    accountNumIntermediary:
                        action.input.accountNum ||
                        state.issuer.paymentRouting.bank.accountNumIntermediary,
                    accountTypeIntermediary: action.input.accountTypeIntermediary,
                    addressIntermediary: {
                        cityIntermediary: action.input.cityIntermediary,
                        countryIntermediary: action.input.countryIntermediary,
                        extendedAddressIntermediary: action.input.extendedAddressIntermediary,
                        postalCodeIntermediary: action.input.postalCodeIntermediary,
                        stateProvinceIntermediary: action.input.stateProvinceIntermediary,
                        streetAddressIntermediary: action.input.streetAddressIntermediary,
                    },
                    beneficiaryIntermediary: action.input.beneficiaryIntermediary,
                    contactIntermediary: {
                        telIntermediary: action.input.telIntermediary,
                        emailIntermediary: action.input.emailIntermediary,
                    },
                    nameIntermediary: action.input.nameIntermediary,
                    memoIntermediary: action.input.memoIntermediary
                },
            };
        } catch (e) {
            console.error(e);
        }
    },
    editIssuerWalletOperation(state, action, dispatch) {
        try {
            if (state.issuer.paymentRouting) {
                state.issuer.paymentRouting.wallet = {
                    ...action.input
                }
            }
        } catch(e) {
            console.error(e)
        }
    },
    editPayerOperation(state, action, dispatch) {
        try {
            state.payer = {
                ...state.payer,
                address: {
                    city: action.input.city,
                    country: action.input.country,
                    extendedAddress: action.input.extendedAddress,
                    postalCode: action.input.postalCode,
                    stateProvince: action.input.stateProvince,
                    streetAddress: action.input.streetAddress,
                },
                contactInfo: {
                    tel: action.input.tel,
                    email: action.input.email,
                },
                country: action.input.country,
                id: action.input.id,
                name: action.input.name,
            };
        } catch (e) {
            console.error(e);
        }
    },
    editPayerBankOperation(state, action, dispatch) {
        try {
            state.payer.paymentRouting.bank = {
                ABA: action.input.ABA,
                IBAN: action.input.IBAN,
                SWIFT: action.input.SWIFT,
                accountNum:
                    action.input.accountNum ||
                    state.payer.paymentRouting.bank.accountNum,
                accountType: action.input.accountType,
                address: {
                    city: action.input.city,
                    country: action.input.country,
                    extendedAddress: action.input.extendedAddress,
                    postalCode: action.input.postalCode,
                    stateProvince: action.input.stateProvince,
                    streetAddress: action.input.streetAddress,
                },
                beneficiary: action.input.beneficiary,
                contact: {
                    tel: action.input.tel,
                    email: action.input.email,
                },
                name: action.input.name,
                memo: action.input.memo
                intermediaryBank: {
                    ABAIntermediary: action.input.ABAIntermediary,
                    IBANIntermediary: action.input.IBANIntermediary,
                    SWIFTIntermediary: action.input.SWIFTIntermediary,
                    accountNumIntermediary:
                        action.input.accountNum ||
                        state.payer.paymentRouting.bank.accountNumIntermediary,
                    accountTypeIntermediary: action.input.accountTypeIntermediary,
                    addressIntermediary: {
                        cityIntermediary: action.input.cityIntermediary,
                        countryIntermediary: action.input.countryIntermediary,
                        extendedAddressIntermediary: action.input.extendedAddressIntermediary,
                        postalCodeIntermediary: action.input.postalCodeIntermediary,
                        stateProvinceIntermediary: action.input.stateProvinceIntermediary,
                        streetAddressIntermediary: action.input.streetAddressIntermediary,
                    },
                    beneficiaryIntermediary: action.input.beneficiaryIntermediary,
                    contactIntermediary: {
                        telIntermediary: action.input.telIntermediary,
                        emailIntermediary: action.input.emailIntermediary,
                    },
                    nameIntermediary: action.input.nameIntermediary,
                    memoIntermediary: action.input.memoIntermediary
                },
            };
        } catch (e) {
            console.error(e);
        }
    },
    editPayerWalletOperation(state, action, dispatch) {
        try {
            if (state.payer.paymentRouting) {
                state.payer.paymentRouting.wallet = {
                    ...action.input
                }
            }
        } catch(e) {
            console.error(e)
        }
    },
};