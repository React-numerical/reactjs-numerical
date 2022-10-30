import { useEffect, useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";

const Secant =()=>{
    const [todo, setTodo] = useState([]);
    const [newEquation, setnewEquation] = useState("");

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

    const print = () =>{
        setValueIter(data.map((x)=>x.Iteration))
        setValueX0(data.map((x)=>x.X0))
        setValueX1(data.map((x)=>x.X1))
        setValueF0(data.map((x)=>x.F0))
        setValueF1(data.map((x)=>x.F1))
        return(
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="20%">Iteration</th>
                        <th width="20%">X0</th>
                        <th width="20%">f(X0)</th>
                        <th width="20%">X1</th>
                        <th width="20%">f(X1)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>{element.Iteration}</td>
                            <td>{element.X0}</td>
                            <td>{element.F0}</td>
                            <td>{element.X1}</td>
                            <td>{element.F1}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calsecant= (x0, x1) => {
        var f0,f1,ea,DF,DX,scope;
        var iter = 0;
        const e = 0.000001;
        var obj={};

        do
        {
            iter ++;
            scope = {
                x:x0,
            }
            f0 = evaluate(Equation, scope)
            scope = {
                x:x1,
            }
            f1 = evaluate(Equation, scope)

            DF = (f0-f1)/(x0-x1);
            DX = (-f1)/DF;
            x0 = x1;
            x1+=DX;
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                F0:f0,
                F1:f1
            }
            data.push(obj)
            ea = error(x0, x1)
            //ea = Math.abs(DX/x1)*100;
            
        }while(ea>e)
        setX(x1)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([0]);
    const [valueX0, setValueX0] = useState([0]);
    const [valueX1, setValueX1] = useState([0]);
    const [valueF0, setValueF0] = useState([0]);
    const [valueF1, setValueF1] = useState([0]);
    
    //const [Data,setData] = useState([])
    const [chartHtml, setchartHtml] = useState(null);
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^2)-7")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [X1,setX1] = useState(0)

    const inputEquation = (event) =>{
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        setX0(event.target.value)
    }
    const inputX1 = (event) =>{
        setX1(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const x1num = parseFloat(X1)
        Calsecant(x0num, x1num);
        setHtml(print());
    }

    const [Count, setCount] = useState(0)
    const showChart = () =>{
        var state = {
            labels: valueIter,
            datasets: [
              {
                label: 'X0',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'red',
                borderWidth: 2,
                data: valueX0
              },
              {
                label: 'X1',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'green',
                borderWidth: 2,
                data: valueX1
              },
              {
                label: 'f(x0)',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'blue',
                borderWidth: 2,
                data: valueF0
              },
              {
                label: "f'(x1)",
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'blue',
                borderWidth: 2,
                data: valueF1
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
                <h1>Secant Method</h1>
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
                    <Form.Label>Input g(x)</Form.Label>
                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X1</Form.Label>
                        <input type="number" id="X1" onChange={inputX1} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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
                <br></br>
            </Container>
            
    )
}

export default Secant





