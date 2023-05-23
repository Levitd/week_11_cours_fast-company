export function paginate(items = [], pageNumber, pageSize) {
    // pageNumber = (pageNumber > items.length / pageSize ? Math.ceil(items.length / pageSize) : pageNumber); //  Math.ceil(itemsCount / pageSize);
    const startIndex = (pageNumber - 1) * pageSize;
    // return (typeof items !== "undefined") ? [...items].splice(startIndex, pageSize) : [];
    return [...items].splice(startIndex, pageSize);
    // согласен, присвоить значение по умолчанию намного правильнее проверки, не подумал
}
