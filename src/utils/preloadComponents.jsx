import React from 'react';

export const preloadComponent = (importFn) => {
    return {
        ...importFn(),
        preload: importFn
    };
};

export const lazyWithPreload = (factory) => {
    const Component = React.lazy(factory);
    Component.preload = factory;
    return Component;
}