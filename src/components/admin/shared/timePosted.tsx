import type { FC } from 'react';

interface TimePostedProps {
    dateString: string;
}

const TimePosted: FC<TimePostedProps> = ({ dateString }) => {
    const postedDate = new Date(dateString);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - postedDate.getTime();

    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    let timePostedMessage: string;
    if (daysDifference > 0) {
        timePostedMessage = `${daysDifference} days ago`;
    } else if (hoursDifference > 0) {
        timePostedMessage = `${hoursDifference} hours ago`;
    } else if (minutesDifference > 0) {
        timePostedMessage = `${minutesDifference} minutes ago`;
    } else {
        timePostedMessage = `${secondsDifference} seconds ago`;
    }

    return (
        <p>{timePostedMessage}</p>
    );
};

export default TimePosted;