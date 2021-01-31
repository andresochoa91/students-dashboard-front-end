import React, { useState } from "react";

const Context = React.createContext();

export const CalendarStore = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <Context.Provider value={[selectedDate, setSelectedDate]}>
            {children}
        </Context.Provider>
    );
};

export default Context;
