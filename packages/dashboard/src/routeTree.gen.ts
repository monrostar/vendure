/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as LoginImport } from './routes/login';
import { Route as AboutImport } from './routes/about';
import { Route as AuthenticatedImport } from './routes/_authenticated';
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index';
import { Route as AuthenticatedDashboardImport } from './routes/_authenticated/dashboard';
import { Route as AuthenticatedProductsProductsImport } from './routes/_authenticated/_products/products';
import { Route as AuthenticatedProductVariantsProductVariantsImport } from './routes/_authenticated/_product-variants/product-variants';
import { Route as AuthenticatedFacetsFacetsImport } from './routes/_authenticated/_facets/facets';
import { Route as AuthenticatedCollectionsCollectionsImport } from './routes/_authenticated/_collections/collections';
import { Route as AuthenticatedProductsProductsIdImport } from './routes/_authenticated/_products/products_.$id';
import { Route as AuthenticatedProductVariantsProductVariantsIdImport } from './routes/_authenticated/_product-variants/product-variants_.$id';
import { Route as AuthenticatedFacetsFacetsIdImport } from './routes/_authenticated/_facets/facets_.$id';
import { Route as AuthenticatedCollectionsCollectionsIdImport } from './routes/_authenticated/_collections/collections_.$id';

// Create/Update Routes

const LoginRoute = LoginImport.update({
    id: '/login',
    path: '/login',
    getParentRoute: () => rootRoute,
} as any);

const AboutRoute = AboutImport.update({
    id: '/about',
    path: '/about',
    getParentRoute: () => rootRoute,
} as any);

const AuthenticatedRoute = AuthenticatedImport.update({
    id: '/_authenticated',
    getParentRoute: () => rootRoute,
} as any);

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedDashboardRoute = AuthenticatedDashboardImport.update({
    id: '/dashboard',
    path: '/dashboard',
    getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedProductsProductsRoute = AuthenticatedProductsProductsImport.update({
    id: '/_products/products',
    path: '/products',
    getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedProductVariantsProductVariantsRoute =
    AuthenticatedProductVariantsProductVariantsImport.update({
        id: '/_product-variants/product-variants',
        path: '/product-variants',
        getParentRoute: () => AuthenticatedRoute,
    } as any);

const AuthenticatedFacetsFacetsRoute = AuthenticatedFacetsFacetsImport.update({
    id: '/_facets/facets',
    path: '/facets',
    getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedCollectionsCollectionsRoute = AuthenticatedCollectionsCollectionsImport.update({
    id: '/_collections/collections',
    path: '/collections',
    getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedProductsProductsIdRoute = AuthenticatedProductsProductsIdImport.update({
    id: '/_products/products_/$id',
    path: '/products/$id',
    getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedProductVariantsProductVariantsIdRoute =
    AuthenticatedProductVariantsProductVariantsIdImport.update({
        id: '/_product-variants/product-variants_/$id',
        path: '/product-variants/$id',
        getParentRoute: () => AuthenticatedRoute,
    } as any);

const AuthenticatedFacetsFacetsIdRoute = AuthenticatedFacetsFacetsIdImport.update({
    id: '/_facets/facets_/$id',
    path: '/facets/$id',
    getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedCollectionsCollectionsIdRoute = AuthenticatedCollectionsCollectionsIdImport.update({
    id: '/_collections/collections_/$id',
    path: '/collections/$id',
    getParentRoute: () => AuthenticatedRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
    interface FileRoutesByPath {
        '/_authenticated': {
            id: '/_authenticated';
            path: '';
            fullPath: '';
            preLoaderRoute: typeof AuthenticatedImport;
            parentRoute: typeof rootRoute;
        };
        '/about': {
            id: '/about';
            path: '/about';
            fullPath: '/about';
            preLoaderRoute: typeof AboutImport;
            parentRoute: typeof rootRoute;
        };
        '/login': {
            id: '/login';
            path: '/login';
            fullPath: '/login';
            preLoaderRoute: typeof LoginImport;
            parentRoute: typeof rootRoute;
        };
        '/_authenticated/dashboard': {
            id: '/_authenticated/dashboard';
            path: '/dashboard';
            fullPath: '/dashboard';
            preLoaderRoute: typeof AuthenticatedDashboardImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/': {
            id: '/_authenticated/';
            path: '/';
            fullPath: '/';
            preLoaderRoute: typeof AuthenticatedIndexImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/_collections/collections': {
            id: '/_authenticated/_collections/collections';
            path: '/collections';
            fullPath: '/collections';
            preLoaderRoute: typeof AuthenticatedCollectionsCollectionsImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/_facets/facets': {
            id: '/_authenticated/_facets/facets';
            path: '/facets';
            fullPath: '/facets';
            preLoaderRoute: typeof AuthenticatedFacetsFacetsImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/_product-variants/product-variants': {
            id: '/_authenticated/_product-variants/product-variants';
            path: '/product-variants';
            fullPath: '/product-variants';
            preLoaderRoute: typeof AuthenticatedProductVariantsProductVariantsImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/_products/products': {
            id: '/_authenticated/_products/products';
            path: '/products';
            fullPath: '/products';
            preLoaderRoute: typeof AuthenticatedProductsProductsImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/_collections/collections_/$id': {
            id: '/_authenticated/_collections/collections_/$id';
            path: '/collections/$id';
            fullPath: '/collections/$id';
            preLoaderRoute: typeof AuthenticatedCollectionsCollectionsIdImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/_facets/facets_/$id': {
            id: '/_authenticated/_facets/facets_/$id';
            path: '/facets/$id';
            fullPath: '/facets/$id';
            preLoaderRoute: typeof AuthenticatedFacetsFacetsIdImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/_product-variants/product-variants_/$id': {
            id: '/_authenticated/_product-variants/product-variants_/$id';
            path: '/product-variants/$id';
            fullPath: '/product-variants/$id';
            preLoaderRoute: typeof AuthenticatedProductVariantsProductVariantsIdImport;
            parentRoute: typeof AuthenticatedImport;
        };
        '/_authenticated/_products/products_/$id': {
            id: '/_authenticated/_products/products_/$id';
            path: '/products/$id';
            fullPath: '/products/$id';
            preLoaderRoute: typeof AuthenticatedProductsProductsIdImport;
            parentRoute: typeof AuthenticatedImport;
        };
    }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
    AuthenticatedDashboardRoute: typeof AuthenticatedDashboardRoute;
    AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute;
    AuthenticatedCollectionsCollectionsRoute: typeof AuthenticatedCollectionsCollectionsRoute;
    AuthenticatedFacetsFacetsRoute: typeof AuthenticatedFacetsFacetsRoute;
    AuthenticatedProductVariantsProductVariantsRoute: typeof AuthenticatedProductVariantsProductVariantsRoute;
    AuthenticatedProductsProductsRoute: typeof AuthenticatedProductsProductsRoute;
    AuthenticatedCollectionsCollectionsIdRoute: typeof AuthenticatedCollectionsCollectionsIdRoute;
    AuthenticatedFacetsFacetsIdRoute: typeof AuthenticatedFacetsFacetsIdRoute;
    AuthenticatedProductVariantsProductVariantsIdRoute: typeof AuthenticatedProductVariantsProductVariantsIdRoute;
    AuthenticatedProductsProductsIdRoute: typeof AuthenticatedProductsProductsIdRoute;
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
    AuthenticatedDashboardRoute: AuthenticatedDashboardRoute,
    AuthenticatedIndexRoute: AuthenticatedIndexRoute,
    AuthenticatedCollectionsCollectionsRoute: AuthenticatedCollectionsCollectionsRoute,
    AuthenticatedFacetsFacetsRoute: AuthenticatedFacetsFacetsRoute,
    AuthenticatedProductVariantsProductVariantsRoute: AuthenticatedProductVariantsProductVariantsRoute,
    AuthenticatedProductsProductsRoute: AuthenticatedProductsProductsRoute,
    AuthenticatedCollectionsCollectionsIdRoute: AuthenticatedCollectionsCollectionsIdRoute,
    AuthenticatedFacetsFacetsIdRoute: AuthenticatedFacetsFacetsIdRoute,
    AuthenticatedProductVariantsProductVariantsIdRoute: AuthenticatedProductVariantsProductVariantsIdRoute,
    AuthenticatedProductsProductsIdRoute: AuthenticatedProductsProductsIdRoute,
};

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(AuthenticatedRouteChildren);

export interface FileRoutesByFullPath {
    '': typeof AuthenticatedRouteWithChildren;
    '/about': typeof AboutRoute;
    '/login': typeof LoginRoute;
    '/dashboard': typeof AuthenticatedDashboardRoute;
    '/': typeof AuthenticatedIndexRoute;
    '/collections': typeof AuthenticatedCollectionsCollectionsRoute;
    '/facets': typeof AuthenticatedFacetsFacetsRoute;
    '/product-variants': typeof AuthenticatedProductVariantsProductVariantsRoute;
    '/products': typeof AuthenticatedProductsProductsRoute;
    '/collections/$id': typeof AuthenticatedCollectionsCollectionsIdRoute;
    '/facets/$id': typeof AuthenticatedFacetsFacetsIdRoute;
    '/product-variants/$id': typeof AuthenticatedProductVariantsProductVariantsIdRoute;
    '/products/$id': typeof AuthenticatedProductsProductsIdRoute;
}

export interface FileRoutesByTo {
    '/about': typeof AboutRoute;
    '/login': typeof LoginRoute;
    '/dashboard': typeof AuthenticatedDashboardRoute;
    '/': typeof AuthenticatedIndexRoute;
    '/collections': typeof AuthenticatedCollectionsCollectionsRoute;
    '/facets': typeof AuthenticatedFacetsFacetsRoute;
    '/product-variants': typeof AuthenticatedProductVariantsProductVariantsRoute;
    '/products': typeof AuthenticatedProductsProductsRoute;
    '/collections/$id': typeof AuthenticatedCollectionsCollectionsIdRoute;
    '/facets/$id': typeof AuthenticatedFacetsFacetsIdRoute;
    '/product-variants/$id': typeof AuthenticatedProductVariantsProductVariantsIdRoute;
    '/products/$id': typeof AuthenticatedProductsProductsIdRoute;
}

export interface FileRoutesById {
    __root__: typeof rootRoute;
    '/_authenticated': typeof AuthenticatedRouteWithChildren;
    '/about': typeof AboutRoute;
    '/login': typeof LoginRoute;
    '/_authenticated/dashboard': typeof AuthenticatedDashboardRoute;
    '/_authenticated/': typeof AuthenticatedIndexRoute;
    '/_authenticated/_collections/collections': typeof AuthenticatedCollectionsCollectionsRoute;
    '/_authenticated/_facets/facets': typeof AuthenticatedFacetsFacetsRoute;
    '/_authenticated/_product-variants/product-variants': typeof AuthenticatedProductVariantsProductVariantsRoute;
    '/_authenticated/_products/products': typeof AuthenticatedProductsProductsRoute;
    '/_authenticated/_collections/collections_/$id': typeof AuthenticatedCollectionsCollectionsIdRoute;
    '/_authenticated/_facets/facets_/$id': typeof AuthenticatedFacetsFacetsIdRoute;
    '/_authenticated/_product-variants/product-variants_/$id': typeof AuthenticatedProductVariantsProductVariantsIdRoute;
    '/_authenticated/_products/products_/$id': typeof AuthenticatedProductsProductsIdRoute;
}

export interface FileRouteTypes {
    fileRoutesByFullPath: FileRoutesByFullPath;
    fullPaths:
        | ''
        | '/about'
        | '/login'
        | '/dashboard'
        | '/'
        | '/collections'
        | '/facets'
        | '/product-variants'
        | '/products'
        | '/collections/$id'
        | '/facets/$id'
        | '/product-variants/$id'
        | '/products/$id';
    fileRoutesByTo: FileRoutesByTo;
    to:
        | '/about'
        | '/login'
        | '/dashboard'
        | '/'
        | '/collections'
        | '/facets'
        | '/product-variants'
        | '/products'
        | '/collections/$id'
        | '/facets/$id'
        | '/product-variants/$id'
        | '/products/$id';
    id:
        | '__root__'
        | '/_authenticated'
        | '/about'
        | '/login'
        | '/_authenticated/dashboard'
        | '/_authenticated/'
        | '/_authenticated/_collections/collections'
        | '/_authenticated/_facets/facets'
        | '/_authenticated/_product-variants/product-variants'
        | '/_authenticated/_products/products'
        | '/_authenticated/_collections/collections_/$id'
        | '/_authenticated/_facets/facets_/$id'
        | '/_authenticated/_product-variants/product-variants_/$id'
        | '/_authenticated/_products/products_/$id';
    fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
    AuthenticatedRoute: typeof AuthenticatedRouteWithChildren;
    AboutRoute: typeof AboutRoute;
    LoginRoute: typeof LoginRoute;
}

const rootRouteChildren: RootRouteChildren = {
    AuthenticatedRoute: AuthenticatedRouteWithChildren,
    AboutRoute: AboutRoute,
    LoginRoute: LoginRoute,
};

export const routeTree = rootRoute._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/about",
        "/login"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/dashboard",
        "/_authenticated/",
        "/_authenticated/_collections/collections",
        "/_authenticated/_facets/facets",
        "/_authenticated/_product-variants/product-variants",
        "/_authenticated/_products/products",
        "/_authenticated/_collections/collections_/$id",
        "/_authenticated/_facets/facets_/$id",
        "/_authenticated/_product-variants/product-variants_/$id",
        "/_authenticated/_products/products_/$id"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_authenticated/dashboard": {
      "filePath": "_authenticated/dashboard.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_collections/collections": {
      "filePath": "_authenticated/_collections/collections.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_facets/facets": {
      "filePath": "_authenticated/_facets/facets.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_product-variants/product-variants": {
      "filePath": "_authenticated/_product-variants/product-variants.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_products/products": {
      "filePath": "_authenticated/_products/products.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_collections/collections_/$id": {
      "filePath": "_authenticated/_collections/collections_.$id.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_facets/facets_/$id": {
      "filePath": "_authenticated/_facets/facets_.$id.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_product-variants/product-variants_/$id": {
      "filePath": "_authenticated/_product-variants/product-variants_.$id.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_products/products_/$id": {
      "filePath": "_authenticated/_products/products_.$id.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
