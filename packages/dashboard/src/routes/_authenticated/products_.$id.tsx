import { ContentLanguageSelector } from '@/components/layout/content-language-selector.js';
import { AssignedFacetValues } from '@/components/shared/assigned-facet-values.js';
import { EntityAssets } from '@/components/shared/entity-assets.js';
import { TranslatableFormField } from '@/components/shared/translatable-form-field.js';
import { Button } from '@/components/ui/button.js';
import { Card, CardContent } from '@/components/ui/card.js';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.js';
import { Input } from '@/components/ui/input.js';
import { Switch } from '@/components/ui/switch.js';
import { Textarea } from '@/components/ui/textarea.js';
import { useGeneratedForm } from '@/framework/form-engine/use-generated-form.js';
import { DetailPage, getDetailQueryOptions } from '@/framework/page/detail-page.js';
import { api } from '@/graphql/api.js';
import { assetFragment } from '@/graphql/fragments.js';
import { graphql } from '@/graphql/graphql.js';
import { Trans } from '@lingui/react/macro';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/products_/$id')({
    component: ProductDetailPage,
    loader: async ({ context, params }) => {
        const result = await context.queryClient.ensureQueryData(
            getDetailQueryOptions(productDetailDocument, { id: params.id }),
        );
        return { breadcrumb: [{ path: '/products', label: 'Products' }, result.product.name] };
    },
});

const productDetailFragment = graphql(
    `
        fragment ProductDetail on Product {
            id
            createdAt
            updatedAt
            enabled
            name
            slug
            description
            featuredAsset {
                ...Asset
            }
            assets {
                ...Asset
            }
            translations {
                id
                languageCode

                name
                slug
                description
            }
            
            facetValues {
                id
                name
                code
                facet {
                    id
                    name
                    code
                }
            }
        }
    `,
    [assetFragment],
);

const productDetailDocument = graphql(
    `
        query ProductDetail($id: ID!) {
            product(id: $id) {
                ...ProductDetail
            }
        }
    `,
    [productDetailFragment],
);

const updateProductDocument = graphql(
    `
        mutation UpdateProduct($input: UpdateProductInput!) {
            updateProduct(input: $input) {
                ...ProductDetail
            }
        }
    `,
    [productDetailFragment],
);

export function ProductDetailPage() {
    const params = Route.useParams();
    const queryClient = useQueryClient();
    const detailQueryOptions = getDetailQueryOptions(productDetailDocument, { id: params.id });
    const detailQuery = useSuspenseQuery(detailQueryOptions);
    const entity = detailQuery.data.product;
    const updateMutation = useMutation({
        mutationFn: api.mutate(updateProductDocument),
        onSuccess: () => {
            toast('Updated', {
                position: 'top-right',
            });
            form.reset();
            queryClient.invalidateQueries(detailQueryOptions.queryKey);
        },
        onError: err => {
            console.error(err);
        },
    });

    const { form, submitHandler } = useGeneratedForm({
        document: updateProductDocument,
        entity,
        setValues: entity => ({
            id: entity.id,
            enabled: entity.enabled,
            featuredAssetId: entity.featuredAsset?.id,
            assetIds: entity.assets.map(asset => asset.id),
            facetValueIds: entity.facetValues.map(facetValue => facetValue.id),
            translations: entity.translations.map(translation => ({
                id: translation.id,
                languageCode: translation.languageCode,
                name: translation.name,
                slug: translation.slug,
                description: translation.description,
            })),
        }),
        onSubmit(values) {
            updateMutation.mutate({ input: values });
        },
    });

    // log changes to the form
    useEffect(() => {
        console.log(form.getValues());
    }, [form.getValues()]);

    return (
        <DetailPage title={entity?.name ?? ''} route={Route} entity={entity}>
            <Form {...form}>
                <form onSubmit={submitHandler} className="space-y-8">
                    <div className="flex justify-between">
                        <ContentLanguageSelector className="mb-4" />
                        <Button
                            type="submit"
                            disabled={
                                !form.formState.isDirty || !form.formState.isValid || updateMutation.isPending
                            }
                        >
                            Submit
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-3 flex flex-col gap-4">
                            <Card className="">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="md:flex w-full gap-4">
                                            <div className="w-1/2">
                                                <TranslatableFormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                <Trans>Product name</Trans>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormDescription></FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <TranslatableFormField
                                                    control={form.control}
                                                    name="slug"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                <Trans>Slug</Trans>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormDescription></FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <TranslatableFormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        <Trans>Description</Trans>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Textarea className="resize-none" {...field} />
                                                    </FormControl>
                                                    <FormDescription></FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-1 flex flex-col gap-4">
                            <Card className="">
                                <CardContent className="pt-6">
                                    <FormField
                                        control={form.control}
                                        name="enabled"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <Trans>Enabled</Trans>
                                                </FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    <Trans>
                                                        When enabled, a product is available in the shop
                                                    </Trans>
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                            <Card className="">
                                <CardContent className="pt-6">
                                    <FormField
                                        control={form.control}
                                        name="facetValueIds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <Trans>Facet values</Trans>
                                                </FormLabel>
                                                <FormControl>
                                                    <AssignedFacetValues
                                                        facetValues={entity?.facetValues ?? []}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                            <Card className="">
                                <CardContent className="pt-6">
                                    <FormItem>
                                        <FormLabel>
                                            <Trans>Assets</Trans>
                                        </FormLabel>
                                        <FormControl>
                                            <EntityAssets
                                                assets={entity?.assets}
                                                featuredAsset={entity?.featuredAsset}
                                                compact={true}
                                                value={form.getValues()}
                                                onChange={value => {
                                                    form.setValue('featuredAssetId', value.featuredAssetId);
                                                    form.setValue('assetIds', value.assetIds);
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription></FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </Form>
        </DetailPage>
    );
}
