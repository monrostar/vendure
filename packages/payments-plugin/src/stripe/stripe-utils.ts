import { CurrencyCode, Order, LanguageCode } from '@vendure/core';
import Stripe from 'stripe';

/**
 * @description
 * From the [Stripe docs](https://stripe.com/docs/currencies#zero-decimal):
 * > All API requests expect amounts to be provided in a currency’s smallest unit.
 * > For example, to charge 10 USD, provide an amount value of 1000 (that is, 1000 cents).
 * > For zero-decimal currencies, still provide amounts as an integer but without multiplying by 100.
 * > For example, to charge ¥500, provide an amount value of 500.
 *
 * Therefore, for a fractionless currency like JPY, we need to divide the amount by 100 (since Vendure always
 * stores money amounts multiplied by 100). See https://github.com/vendure-ecommerce/vendure/issues/1630
 */
export function getAmountInStripeMinorUnits(order: Order): number {
    return currencyHasFractionPart(order.currencyCode)
        ? order.totalWithTax
        : Math.round(order.totalWithTax / 100);
}

/**
 * @description
 * Performs the reverse of `getAmountInStripeMinorUnits` - converting the Stripe minor units into the format
 * used by Vendure.
 */
export function getAmountFromStripeMinorUnits(order: Order, stripeAmount: number): number {
    return currencyHasFractionPart(order.currencyCode) ? stripeAmount : stripeAmount * 100;
}

function currencyHasFractionPart(currencyCode: CurrencyCode): boolean {
    const parts = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'symbol',
    }).formatToParts(123.45);

    return parts.some(p => p.type === 'fraction');
}

/**
 *
 * @description
 * Ensures that the payment intent metadata object contains the expected properties, as defined by the plugin.
 */
export function isExpectedVendureStripeEventMetadata(metadata: Stripe.Metadata): metadata is {
    channelToken: string;
    orderCode: string;
    orderId: string;
    languageCode: LanguageCode;
} {
    return !!metadata.channelToken && !!metadata.orderCode && !!metadata.orderId;
}
