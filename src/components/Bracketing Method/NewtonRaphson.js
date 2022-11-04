import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs'
import { Line } from "react-chartjs-2";
import Select from 'react-select'
import axios from "axios";

const endpoint = "http://localhost:3500";

const NewtonRaphson =()=>{
    const [todo, setTodo] = useState([]);

    const [newEquation, setnewEquation] = useState("");
    const [newX0, setnewX0] = useState(0);

    const fetchTodos = async () => {
        const { status, data }  = await axios.get(
            endpoint+"/data4"
        );
        console.log("data = ");
        console.log(data);
        console.log("status = "+status)
        if (status === 200) {
            setTodo(data);
          }
    }

    useEffect(()=>{
        fetchTodos();
    },[]);

    const handleSubmit = async () => {
        if (Equation === "") return;
        const newTodo = { id:""+(todo.length+1) ,Equation: newEquation,X0: newX0,label: newEquation};
        const { status, data} = await axios.post(endpoint + "/data4", newTodo);
        fetchTodos();
        if (status === 200) {
            fetchTodos();
            setnewEquation("");
            setnewX0(0);
        }
        
    };

    const handleDeleteTodo = async id => {
        const { status, data} = await axios.delete(endpoint + `/data4/${id}`);
        if (status === 200) {
            fetchTodos();
        }
    };

    const print = () =>{
        setValueIter(data.map((x)=>x.Iteration))
        setValueX0(data.map((x)=>x.X0))
        setValueX1(data.map((x)=>x.X1))
        setValueF0(data.map((x)=>x.F0))
        setValueF1(data.map((x)=>x.F0diff))
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="10%">Iteration</th>
                        <th width="20%">X0</th>
                        <th width="20%">f(x) = {Equation}</th>
                        <th width="20%">f'(x) = {Equationdiff1}</th>
                        <th width="20%">X1</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index)=>{
                        return  (
                        <tr key={index}>
                            <td>{element.Iteration}</td>
                            <td>{element.X0}</td>
                            <td>{element.F0}</td>
                            <td>{element.F0diff}</td>
                            <td>{element.X1}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
            </Container>
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const Calnewton= (x0) => {
        var x1,f0,f0diff,ea,scope;
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
            f0diff = evaluate(Equationdiff1, scope)
            x1 = x0 - (f0/f0diff)
            obj = {
                Iteration:iter,
                X0:x0,
                X1:x1,
                F0:f0,
                F0diff:f0diff
            }
            
            data.push(obj)
            ea = error(x0, x1)
            x0 = x1            
        }while(ea>e)
        setX(x1)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([0]);
    const [valueX0, setValueX0] = useState([0]);
    const [valueX1, setValueX1] = useState([0]);
    const [valueF0, setValueF0] = useState([0]);
    const [valueF1, setValueF1] = useState([0]);

    const [chartHtml, setchartHtml] = useState(null);
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [Equationdiff1,setEquationdiff1] = useState("")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)

    const inputEquation = (event) =>{
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        setX0(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        setEquationdiff1(""+derivative(Equation,'x'))
        Calnewton(x0num);
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
                <h1>Newton Raphson Method</h1>
                <h3>Create Equation</h3>
                <Row>
                    <Col>
                    <input type="text" id="equation" value={newEquation} onChange={e => setnewEquation(e.target.value)} className="form-control"></input>
                    </Col>
                    <Col>
                    <input type="number" id="xl" value={newX0} onChange={e => setnewX0(e.target.value)} className="form-control"></input>
                    </Col>
                </Row>
                <br></br>
                <Button variant="dark" onClick={handleSubmit}>Create</Button>
                <br></br>
                <br></br>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Number</th>
                            <th width="30%">Equation</th>
                            <th width="20%">X0</th>
                            <th width="20%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {todo.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{element.Equation}</td>
                                <td>{element.X0}</td>
                                <td>
                                <Button variant="light" style={ {margin:10} } onClick={() => {setEquation(element.Equation);setX0(element.X0);setEquationdiff1(""+derivative(element.Equation,'x'));}}>Use</Button>
                                <Button variant="light" style={ {margin:10} }onClick={() => handleDeleteTodo(element.id)}>Delete</Button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Form >
                    <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                        <Select options={todo} onChange={(e) => {setEquation(e.Equation)}}/>
                        <br></br>

                        <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input X0</Form.Label>
                        <input type="number" id="X0" value={X0} onChange={inputX0} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
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

export default NewtonRaphson





