export const formattedDate = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const time = new Date().toTimeString().slice(0, 5);
    const day = new Date().getDate();
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

    let getMonth = "";
    for (let i = 0; i < monthNames.length; i++) {
        if (i === month) {
            getMonth = monthNames[i];
            break;
        }
    }
    return `${getMonth} ${day} ${year} ${time}`;
}