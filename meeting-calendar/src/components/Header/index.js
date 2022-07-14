const Header = ({ monthName, year }) => {
    return (
        <div>
            <h1>{ monthName + ' ' + year }</h1>
            <p>Here are all your planned events. 
                You will find information for each event as well as plan a new one.
            </p>
        </div>
    );
};

export default Header;