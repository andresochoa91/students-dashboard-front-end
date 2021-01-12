import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import _ from 'lodash';

const Context = React.createContext();

export const UserStore = ({ children }) => {
  const [cookies, setCookie] = useCookies(['auth_token']);
  const [authToken, setAuthToken,] = useState(cookies['auth_token']);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (authToken && _.isEmpty(cookies)) {
      setCookie('auth_token', authToken.token);
      setUserInfo(authToken.info);
    }
  }, [authToken])

  useEffect(() => {
    if (!_.isEmpty(cookies)) {
      const getData = async () => {
        const response = await fetch('https://forked-student-dashboard.herokuapp.com/user', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify({ token: authToken }),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();

        setUserInfo(data);
      }
      getData();
    }
  }, [])

  console.log(userInfo)

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
      value={[authToken, setAuthToken, userInfo, setUserInfo]}
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

