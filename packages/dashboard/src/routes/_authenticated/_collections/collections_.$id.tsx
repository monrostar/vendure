import { ContentLanguageSelector } from '@/components/layout/content-language-selector.js';
import { ErrorPage } from '@/components/shared/error-page.js';
import { PermissionGuard } from '@/components/shared/permission-guard.js';
import { TranslatableFormField } from '@/components/shared/translatable-form-field.js';
import { Button } from '@/components/ui/button.js';
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
import { NEW_ENTITY_PATH } from '@/constants.js';
import { addCustomFields } from '@/framework/document-introspection/add-custom-fields.js';
import {
    CustomFieldsPageBlock,
    Page,
    PageActionBar,
    PageBlock,
    PageLayout,
    PageTitle,
} from '@/framework/layout-engine/page-layout.js';
import { getDetailQueryOptions, useDetailPage } from '@/framework/page/use-detail-page.js';
import { Trans, useLingui } from '@lingui/react/macro';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import {
    collectionDetailDocument,
    createCollectionDocument,
    getCollectionFiltersDocument,
    updateCollectionDocument,
} from './collections.graphql.js';
import { CollectionContentsTable } from './components/collection-contents-table.js';
import { Textarea } from '@/components/ui/textarea.js';
import { EntityAssets } from '@/components/shared/entity-assets.js';
import { api } from '@/graphql/api.js';
import { useQuery } from '@tanstack/react-query';
import { CollectionFiltersSelect } from './components/collection-filters-select.js';

export const Route = createFileRoute('/_authenticated/_collections/collections_/$id')({
    component: CollectionDetailPage,
    loader: async ({ context, params }) => {
        const isNew = params.id === NEW_ENTITY_PATH;
        const result = isNew
            ? null
            : await context.queryClient.ensureQueryData(
                  getDetailQueryOptions(addCustomFields(collectionDetailDocument), { id: params.id }),
                  { id: params.id },
              );
        if (!isNew && !result.collection) {
            throw new Error(`Collection with the ID ${params.id} was not found`);
        }
        return {
            breadcrumb: [
                { path: '/collections', label: 'Collections' },
                isNew ? <Trans>New collection</Trans> : result.collection.name,
            ],
        };
    },
    errorComponent: ({ error }) => <ErrorPage message={error.message} />,
});

export function CollectionDetailPage() {
    const params = Route.useParams();
    const navigate = useNavigate();
    const creatingNewEntity = params.id === NEW_ENTITY_PATH;
    const { i18n } = useLingui();

    const { form, submitHandler, entity, isPending, refreshEntity } = useDetailPage({
        queryDocument: addCustomFields(collectionDetailDocument),
        entityField: 'collection',
        createDocument: createCollectionDocument,
        updateDocument: updateCollectionDocument,
        setValuesForUpdate: entity => {
            return {
                id: entity.id,
                isPrivate: entity.isPrivate,
                featuredAssetId: entity.featuredAsset?.id,
                assets: entity.assets.map(asset => asset.id),
                parentId: entity.parent?.id,
                translations: entity.translations.map(translation => ({
                    id: translation.id,
                    languageCode: translation.languageCode,
                    name: translation.name,
                    slug: translation.slug,
                    description: translation.description,
                })),
                filters: entity.filters.map(f => ({
                    code: f.code,
                    arguments: f.args.map(a => ({ name: a.name, value: a.value })),
                })),
                inheritFilters: entity.inheritFilters,
                customFields: entity.customFields,
            };
        },
        transformCreateInput: values => {
            return {
                ...values,
                values: [],
            };
        },
        params: { id: params.id },
        onSuccess: async data => {
            toast(i18n.t('Successfully updated collection'), {
                position: 'top-right',
            });
            form.reset(form.getValues());
            if (creatingNewEntity) {
                await navigate({ to: `../${data?.id}`, from: Route.id });
            }
        },
        onError: err => {
            toast(i18n.t('Failed to update collection'), {
                position: 'top-right',
                description: err instanceof Error ? err.message : 'Unknown error',
            });
        },
    });

    return (
        <Page>
            <PageTitle>{creatingNewEntity ? <Trans>New collection</Trans> : (entity?.name ?? '')}</PageTitle>
            <Form {...form}>
                <form onSubmit={submitHandler} className="space-y-8">
                    <PageActionBar>
                        <ContentLanguageSelector />
                        <PermissionGuard requires={['UpdateCollection', 'UpdateCatalog']}>
                            <Button
                                type="submit"
                                disabled={!form.formState.isDirty || !form.formState.isValid || isPending}
                            >
                                <Trans>Update</Trans>
                            </Button>
                        </PermissionGuard>
                    </PageActionBar>
                    <PageLayout>
                        <PageBlock column="side">
                            <FormField
                                control={form.control}
                                name="isPrivate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Trans>Private</Trans>
                                        </FormLabel>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormDescription>
                                            <Trans>Private facets are not visible in the shop</Trans>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </PageBlock>
                        <PageBlock column="main">
                            <div className="md:flex w-full gap-4 mb-4">
                                <div className="w-1/2">
                                    <TranslatableFormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    <Trans>Name</Trans>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
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
                                            <Textarea placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </PageBlock>
                        <CustomFieldsPageBlock column="main" entityType="Collection" control={form.control} />
                        <PageBlock column="main" title={<Trans>Filters</Trans>}>
                            <FormField
                                control={form.control}
                                name="inheritFilters"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Trans>Inherit filters</Trans>
                                        </FormLabel>
                                        <FormControl>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormDescription>
                                            <Trans>
                                                If enabled, the filters will be inherited from the parent
                                                collection and combined with the filters set on this
                                                collection.
                                            </Trans>
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="filters"
                                render={({ field }) => (
                                    <CollectionFiltersSelect
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </PageBlock>
                        <PageBlock column="side">
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
                                            form.setValue('featuredAssetId', value.featuredAssetId, {
                                                shouldDirty: true,
                                                shouldValidate: true,
                                            });
                                            form.setValue('assetIds', value.assetIds, {
                                                shouldDirty: true,
                                                shouldValidate: true,
                                            });
                                        }}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        </PageBlock>
                        {!creatingNewEntity && (
                            <PageBlock column="main" title={<Trans>Facet values</Trans>}>
                                <CollectionContentsTable collectionId={entity?.id} />
                            </PageBlock>
                        )}
                    </PageLayout>
                </form>
            </Form>
        </Page>
    );
}
