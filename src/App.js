import React from "react";
import Navigation from "./routes/navigation/navigation.component";
import {Routes,Route} from 'react-router-dom';
import Home from "./routes/home/home.component";




const Shop =() =>{
return(
  <h1>iam the shop page</h1>
)
}


const App = () => {
  return (
<Routes>
  <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='shop' element={<Shop/>}/>
  </Route>

</Routes>


  );

};

export default App;
