import React,{useEffect,useState} from 'react';
import "./s.css";
const Statewise=()=>{

const[datas,setdata]=useState([]);
const[search,setSearch]=useState("");

    const getCovidData=async()=>{

        const d=await fetch("https://api.covid19india.org/data.json");
        const data=await d.json();
        setdata(data.statewise);
       
    }
    useEffect(()=>{
    getCovidData();
    },[])


    return( 
       <div className=" tc justify-center ">
           <div><h2 className="f1 pt4">India Covid-19 Dashboard</h2>
           <div className="tc justify-center" >
       <input type="text" className="search-box mt2 mb2 pa1 ba b--green bg-lightest-blue" placeholder="Enter a State or UT" value={search} onChange={(event)=>{setSearch(event.target.value)}}></input>
       <button class=" btns ml--2 mt2 mb2 pa1 pr3 pl3 ba  bg-light-green  " type="reset" value="Reset" onClick={(event)=>setSearch("")}><span className="t r">X</span></button> </div></div>
   
        {
            datas.filter((cur)=>{
                if(search=="") return cur;
                else if(cur.state.toLowerCase().includes(search.toLowerCase()))
                {
                    return cur;
                }
            }).map((cur,ind)=>{
            if((cur.state!=="State Unassigned")&&(cur.state!=="Dadra and Nagar Haveli and Daman and Diu"))
                return ( 
                 
                       <scroll>
        <div className=' overflow-auto height  w5 bg-washed-green br3 pa3 ma2 grow dib bw2 shadow-5 tc'>         
     <h2 className="pt-2 ">{cur.state}</h2>
     
           <div className="dib fixed-bottom mb5">
                            <h5 className="text-primary  a ">Confirmed: {cur.confirmed}</h5>
                            <h5 className="text-secondary b">Active: {cur.active}</h5>
                            <h5 className="text-success c ">  Recovered: {cur.recovered}</h5>
                            <h5 className="text-danger d ">Deaths: {cur.deaths}</h5>    
                            <p >(Last Updated:<br></br> {cur.lastupdatedtime})</p>
                            </div>
                               </div>
                               </scroll>  
                                         
                )

                else if(cur.state=="Dadra and Nagar Haveli and Daman and Diu")
                return ( 
                    <scroll>
     <div className=' overflow-auto height w5 bg-washed-green br3 pa3 ma2 grow dib bw2 shadow-5 tc'>         
  <h2 className="pt-2">Daman & Diu</h2>
  <div className="dib fixed-bottom mb5">
                         <h5 className="text-primary a ">Confirmed: {cur.confirmed}</h5>
                         <h5 className="text-secondary b">Active: {cur.active}</h5>
                         <h5 className="text-success  c">  Recovered: {cur.recovered}</h5>
                         <h5 className="text-danger d">Deaths: {cur.deaths}</h5>    
                         <p >(Last Updated:<br></br> {cur.lastupdatedtime})</p>
                            </div></div>
                            </scroll>                
             )
          })
        
        }               
        
        </div>
    )
}

export default Statewise;