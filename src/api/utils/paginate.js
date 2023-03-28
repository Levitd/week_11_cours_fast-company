export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return (typeof items !== "undefined") ? [...items].splice(startIndex, pageSize) : [];
}
