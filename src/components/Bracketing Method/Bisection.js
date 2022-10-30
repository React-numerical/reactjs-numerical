import { useEffect, useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";

const Bisection =()=>{
    const [todo, setTodo] = useState([]);
    const initialData = [
        {
          "id": 1,
          "Equation": "x^5-14"
        },
        {
          "id": 2,
          "Equation": "x^4-13"
        },
        {
          "id": 3,
          "Equation": "x^3-12"
        },
        {
          "id": 4,
          "Equation": "x^2-11"
        }
      ]

    
    const [newEquation, setnewEquation] = useState("");

    const print = (array) =>{
        console.log(array)
        setValueIter(array.map((x)=>x.iteration));
        setValueXl(array.map((x)=>x.Xl));
        setValueXm(array.map((x)=>x.Xm));
        setValueXr(array.map((x)=>x.Xr));
        return(
            <Container>  
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {array.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
            
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
    
    const Calbisection = (xl, xr) => {
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            xm = (xl+xr)/2.0;
            scope = {
                x:xr,
                X:xr
            }
            console.log("before = "+Equation)
            fXr = evaluate(Equation, scope)
            console.log("after = "+fXr)
            scope = {
                x:xm,
                X:xm
            }
            fXm = evaluate(Equation, scope)

            iter ++;
            if (fXm*fXr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xr = xm;
            }
            else if (fXm*fXr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    
    const [chartHtml, setchartHtml] = useState(null);
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const handleSubmit = () => {
        if (Equation === "") return;
        const newTodo = { id:todo.length+1 ,Equation: newEquation };
        setTodo([...todo, newTodo]);
        setnewEquation("");
    };

    const handleDeleteTodo = id => {
        const newTodo = todo.filter(todo => todo.id !== id);
        setTodo(newTodo);
    };

    useEffect(()=>{
        fetch("http://localhost:3500/data")
            .then(res => res.json())
            .then(
                (result) => {
                    setTodo(result);
                }
            )
    },[])

    /*const fetchData = async () =>{
        const result = await axios.get("http://localhost:3500/data");
        setTodo(result);
        console.log(todo);
    };

    useEffect(()=>{
        fetchData();
    }, []);*/

    

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)

        Calbisection(xlnum,xrnum);

        
        setHtml(print(data));
        
    }
    const [Count, setCount] = useState(0)
    const showChart = (event) =>{
        var state = {
            labels: valueIter,
            datasets: [
              {
                label: 'Xl',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'red',
                borderWidth: 2,
                data: valueXl
              },
              {
                label: 'Xm',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'green',
                borderWidth: 2,
                data: valueXm
              },
              {
                label: 'Xr',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'blue',
                borderWidth: 2,
                data: valueXr
              }
            ]
        }
        if((Count+2)%2===0){
            setCount(Count+1);
            setchartHtml(<Line
                data={state}
                options={{
                title:{
                    display:true,
                    text:'Bisection Method',
                    fontSize:20
                    },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />);
        }else{
            setCount(Count+1);
            setchartHtml(null);
        }
    }
    return (
            <Container>
                <h1>Bisection Method</h1>
                <h3>Create Equation</h3>
                <input type="text" id="equation" value={newEquation} onChange={e => setnewEquation(e.target.value)} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                <br></br>
                <Button onClick={handleSubmit}>Create</Button>
                <br></br>
                <br></br>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="20%">Number</th>
                            <th width="60%">Equation</th>
                            <th width="20%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {todo.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{element.Equation}</td>
                                <td>
                                <Button onClick={e => setEquation(element.Equation)}>Use</Button>
                                <Button onClick={() => handleDeleteTodo(element.id)}>Delete</Button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Form >
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input XL</Form.Label>
                        <input type="number" id="XL" onChange={inputXL} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input XR</Form.Label>
                        <input type="number" id="XR" onChange={inputXR} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5>Answer = {X.toPrecision(7)}</h5>
                <Container>
                {html}
                <br></br>
                </Container>
                <Button variant="light"><img width={50} height={50} src="./chart1.png" alt="my image" onClick={showChart}/></Button>
                <br></br>
                {chartHtml}
            </Container>       
    )
}

export default Bisection
