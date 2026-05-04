export default   function getLowerPrice(el: any[]) {
    const tickets:number[] = [];
    el.forEach(ticket => {
        tickets.push(ticket.prezzo);
    });

    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(Math.min(...tickets));
}