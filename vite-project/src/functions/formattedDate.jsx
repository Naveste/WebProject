export const formattedDate = () => {
    const getYear = new Date().getFullYear();
    const getTime = new Date().toTimeString().slice(0, 5);
    const getDay = new Date().getDate();
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

    let getMonth = "";
    for (let i = 0; i < monthNames.length; i++) {
        const month = new Date().getMonth();
        if (i === month) {
            getMonth = monthNames[i];
            break;
        }
    }
    return `${getMonth} ${getDay} ${getYear} ${getTime}`;
}