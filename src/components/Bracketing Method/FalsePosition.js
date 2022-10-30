import { useEffect, useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";

const FalsePosition =()=>{
    const [todo, setTodo] = useState([]);
    const print = () =>{
        setValueIter(data.map((x)=>x.Iteration))
        setValueXi(data.map((x)=>x.Xi))
        setValueXl(data.map((x)=>x.Xl))
        setValueXr(data.map((x)=>x.Xr))
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="10%">Iteration</th>
                        <th width="50%">X</th>
                        <th width="20%">XL</th>
                        <th width="20%">XR</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>{element.Iteration}</td>
                            <td>{element.Xn} = {element.Xi}</td>
                            <td>{element.Xl}</td>
                            <td>{element.Xr}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
            </Container>
        );
    }
    
    const [newEquation, setnewEquation] = useState("");

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
    
    const Calfalsepos = (xl, xr) => {
        var xi,fXi,fXl,fXr,ea,scope;
        var iter = 0;
        var xstring = ""+iter;
        var MAX = 50;
        const e = 0.00001;
        var obj={};

        do
        {
            scope = {
                x:xl,
            }
            fXl = evaluate(Equation, scope)
            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)
            xi = (xl*(fXr)-xr*(fXl))/(fXr-fXl);
            scope = {
                x:xi,
            }
            fXi = evaluate(Equation, scope)
            iter ++;
            xstring = "X"+iter;
            if (fXi*fXr > 0)
            {
                ea = error(xr, xi);
                obj = {
                    Iteration:iter,
                    Xn:xstring,
                    Xi:xi,
                    Xl:xl,
                    Xr:xr
                }
                data.push(obj)
                xr = xi;
            }
            else if (fXi*fXr < 0)
            {
                ea = error(xl, xi);
                obj = {
                    Iteration:iter,
                    Xn:xstring,
                    Xi:xi,
                    Xl:xl,
                    Xr:xr
                }
                data.push(obj)
                xl = xi;
            }
        }while(ea>e && iter<MAX)
        setX(xi)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([0]);
    const [valueXi, setValueXi] = useState([0]);
    const [valueXl, setValueXl] = useState([0]);
    const [valueXr, setValueXr] = useState([0]);

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

    const inputEquation = (event) =>{
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calfalsepos(xlnum,xrnum);
        setHtml(print());
    }
    const [Count, setCount] = useState(0)
    const showChart = () =>{
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
                data: valueXi
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
            setchartHtml(null)
        }
    }

    return (
            <Container>
                <h1>False Position Method</h1>
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

export default FalsePosition





