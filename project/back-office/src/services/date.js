export function getDate(dateToRender) {
    let value = dateToRender;

    if(!isNaN(value)) value = Number(value);

    return new Date(value);
}

export function addDaysToDate(dateBefore, days) {
    let dateAfter = new Date(getDate(dateBefore));

    dateAfter.setDate(dateAfter.getDate()+days);

    return dateAfter;
}