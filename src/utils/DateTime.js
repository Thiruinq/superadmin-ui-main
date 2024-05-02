function formatDate(date) {
    // Get the year, month, and day from the date object
    const year = date.getFullYear();
    // Add 1 to month because JavaScript months are zero-based
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Get the hours, minutes, and seconds from the date object
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
}

function convertDateFormat(dateString) {
    if (!dateString) {
        return ""; // or any default value you prefer
    }
    const dateParts = dateString.split(" ")[0].split("-");
    const [year, month, day] = dateParts;
    return `${day}-${month}-${year}`;
}

function separateDateAndTime(datetimeString) {
    const date = new Date(datetimeString);

    // Separate date and time
    const dateString = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
    const timeString = date.toISOString().split('T')[1].split('.')[0].slice(0, -3);

    return { date: dateString, time: timeString };
}

function getDateOnly(datetimeString) {
    if (!datetimeString) {
        return ""; // or whatever default value or behavior you prefer
    }
    // Split the datetime string by space
    const parts = datetimeString.split(" ");
    // Take the first part, which represents the date
    const dateOnly = parts[0];
    return dateOnly;
}

export { getDateOnly, formatDate, separateDateAndTime, convertDateFormat }