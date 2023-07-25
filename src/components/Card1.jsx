import React, { useEffect, useState } from "react";
import { Button , Card ,Form ,Input ,Select,Space} from 'antd';

// const title = <h1>Crypto Converter</h1>
import HeadTitle from "./HeadTitle";

// console.log(HeadTitle().props.children);


const Card1 = () =>{

    const apiUrl = `https://api.coingecko.com/api/v3/exchange_rates`
    const defaultFirstSelectValue = 'Bitcoin';
    const defaultSecondSelectValue = 'Ether';


    const [cryptoList,setCryptoList] = useState([])
    const [inputValue,setInputValue] = useState('0')
    const [firstSelect,setFirstSelect] = useState(defaultFirstSelectValue);
    const [secondSelect,setSecondSelect]  =useState(defaultSecondSelectValue)
    const [result,setResult] = useState("0");

    const names = [
        {
            value:'jack',
            label:'Jack',
        },
        {
            value:"lucy",
            label:"Lucy",
        },
        {
            value:'Mayank',
            label:"Mayank"
        },
        {
            value:'Yiminghe',
            label:"Yiminghe"
        }
    ]

    useEffect(()=>{

        fetchData()
    },[])
    async function fetchData(){
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        const data = jsonData.rates;
        const tempArray = Object.entries(data).map(item=>{
            return{
                    value: item[1].name,
                    label: item[1].name,
                    rate: item[1].value
                 }
        })

        setCryptoList(tempArray)
        // console.log(tempArray)
        //for loop method niche hai
        
    }

    useEffect(()=>{
        // console.log(inputValue,firstSelect,secondSelect)

        if(cryptoList.length == 0)
        {
            return;
        }
        const firstSelectRate = cryptoList.find((item)=>{
            return item.value === firstSelect
        }).rate
        const secondSelectRate = cryptoList.find((item)=>{
            return item.value === secondSelect
        }).rate

        // console.log(firstSelectRate,secondSelectRate)

        const resultValue = (inputValue*secondSelectRate)/firstSelectRate;
        setResult(resultValue.toFixed(4))
        // console.log(inputValue)
        if(inputValue === "")
        {
            setResult("")
        }
       

    },[inputValue,firstSelect,secondSelect])
    

    return (<>
        <div className="container">
            <Card className="crypto-card" title={HeadTitle()}>
                <Form>
                    <Form.Item>
                        <Input onChange={(event)=>{setInputValue(event.target.value)}}/>
                    </Form.Item>
                </Form>
                <div className="select-box">
                    <Select onChange={(value)=>{setFirstSelect(value)}}  style={{width:"200px"}} options={cryptoList}  defaultValue= {defaultFirstSelectValue}/>
                    <Select onChange={(value)=>{setSecondSelect(value)}} style={{width:"200px"}} options={cryptoList}  defaultValue= {defaultSecondSelectValue}/>
                </div>
                {inputValue&&<p>{inputValue} {firstSelect} = {result} {secondSelect}</p>}
                
            </Card>
        </div>
    </>)
}

export default Card1;




// const tempArray = [];
        // Object.entries(data).forEach(item =>{
        //     const tempObj = {
        //         value: item[1].name,
        //         label: item[1].name,
        //         rate: item[1].value
        //     }
        //     tempArray.push(tempObj)
        // })
        // console.log(tempArray)