import React from 'react';

const choice = (items) => (
    items[Math.floor(Math.random() * items.length)]
)

const remove = (items, item) => {
    const itemIdx = items.indexOf(item)
    return (itemIdx === -1 ? undefined : items.splice(itemIdx, 1))
}

export { choice, remove };