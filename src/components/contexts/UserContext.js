import React, { useReducer, useState, useEffect } from 'react';
import AccountOverview from "../../components/homePage/dashboard/profile/AccountOverview";

const Context = React.createContext();

const INITIAL_STATE = {
  username: 'jorge',
  email: 'jgabitto1792@gmail.com',
  courseID: 4
}

const ACTIONS = {
  SET_EMAIL: 'email',
  SET_USERNAME: 'username',
  SET_COURSE: 'course',
  SET_PASSWORD: 'password',
  SET_ALL: 'all'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_EMAIL:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS.SET_USERNAME:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS.SET_COURSE:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS.SET_PASSWORD:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS.SET_ALL:
      return action.payload.value;
    default:
      throw new Error();
  }
}
//connecting to user into in base
//MF: states are coming up with an error, why?


export const UserStore = ({ children }) => {
  const [userInfo, dispatchUser] = useReducer(reducer, INITIAL_STATE);

  const getUser = async () =>{
    //   return base("User_Info_Table").select({
    //     maxRecords: 3,
    //     view: "Grid view"
    // }).eachPage(function page(records, fetchNextPage) {
    //     // This function (`page`) will get called for each page of records.
    // console.log(records, "hello");
    //     // records.forEach(function(record) {
    //     //     console.log('Retrieved', record.get('User_ID'));
    //     // });
    //     fetchNextPage();
        
    
    //   }, function done(err) {
    //     if (err) { console.error(err); return; }
    //     return records;
    //   })
    
      const res = await fetch('https://api.airtable.com/v0/appm5NPkqO7P8ePUK/User_Info_Table?api_key=keyclOytaXo7NHQ8M')
      const { records } = await res.json();
      const data = records.reduce((acc, curr) => {
        const { fields, id } = curr;
        return [...acc, {...fields, id}]
      }, [])
      
      dispatchUser({type: "all", payload: { field: "all", value: data}});
    }

  useEffect(()=>{
      getUser();
  },[])

  return (
<>
    <Context.Provider
      value={[userInfo, dispatchUser]}
    >
      {children}
    </Context.Provider>
{/* 
   {User_Info_Table}.map(info => (
        <AccountOverview 
        key ={info.id}
        info={info}
        />
      )) */}
    
</>
  )
}
  
export default Context;

