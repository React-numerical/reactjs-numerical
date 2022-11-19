import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import 'chart.js/auto'
import { Line } from "react-chartjs-2";
import Select from 'react-select'
import axios from "axios";

const endpoint = "http://localhost:3500";

const FalsePosition =()=>{
    const [todo, setTodo] = useState([]);

    const [newEquation, setnewEquation] = useState("");
    const [newXL, setnewXL] = useState(0);
    const [newXR, setnewXR] = useState(0);
    const [state, setState] = useState([]);
    const [states, setStates] = useState({
        labels: state.map((element)=>{return element.Iteration}),
        datasets: [
          {
            label: 'Xi',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: state.map((element)=>{return element.Xi})
          },
          {
            label: 'XL',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'green',
            borderWidth: 2,
            data: state.map((element)=>{return element.Xl})
          },
          {
            label: 'XR',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'blue',
            borderWidth: 2,
            data: state.map((element)=>{return element.Xr})
          }
        ]
    });

    const fetchTodos = async () => {
        const { status, data }  = await axios.get(
            endpoint+"/data1"
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
        const newTodo = { id:""+(todo.length+1) ,Equation: newEquation,XL: newXL,XR: newXR,label: newEquation};
        const { status, data} = await axios.post(endpoint + "/data1", newTodo);
        fetchTodos();
        if (status === 200) {
            fetchTodos();
            setnewEquation("");
            setnewXL(0);
            setnewXR(0);
        }
        
    };

    const handleDeleteTodo = async id => {
        const { status, data} = await axios.delete(endpoint + `/data1/${id}`);
        if (status === 200) {
            fetchTodos();
        }
    };
    
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
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

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
        setState(data);
        setStates({
            labels: data.map((element)=>{return element.Iteration}),
            datasets: [
              {
                label: 'Xi',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'red',
                borderWidth: 2,
                data: data.map((element)=>{return element.Xi})
              },
              {
                label: 'XL',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'green',
                borderWidth: 2,
                data: data.map((element)=>{return element.Xl})
              },
              {
                label: 'XR',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'white',
                borderColor: 'blue',
                borderWidth: 2,
                data: data.map((element)=>{return element.Xr})
              }
            ]
        })
    }


    return (
            <Container>
                <h1>False Position Method</h1>
                <h3>Create Equation</h3>
                <Row>
                    <Col>
                    <input type="text" id="equation" value={newEquation} onChange={e => setnewEquation(e.target.value)} className="form-control"></input>
                    </Col>
                    <Col>
                    <input type="number" id="xl" value={newXL} onChange={e => setnewXL(e.target.value)} className="form-control"></input>
                    </Col>
                    <Col>
                    <input type="number" id="xr" value={newXR} onChange={e => setnewXR(e.target.value)} className="form-control"></input>
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
                            <th width="20%">XL</th>
                            <th width="20%">XR</th>
                            <th width="20%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {todo.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{element.Equation}</td>
                                <td>{element.XL}</td>
                                <td>{element.XR}</td>
                                <td>
                                <Button variant="light" style={ {margin:10} } onClick={() => {setEquation(element.Equation);setXL(element.XL);setXR(element.XR);}}>Use</Button>
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
                        <Form.Label>Input XL</Form.Label>
                        <input type="number" id="XL" value={XL} onChange={inputXL} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                        <Form.Label>Input XR</Form.Label>
                        <input type="number" id="XR" value={XR} onChange={inputXR} style={{width:"20%", margin:"0 auto"}} className="form-control"></input>
                    </Form.Group>
                    <Button variant="dark" onClick={calculateRoot}>
                        Calculate
                    </Button>
                </Form>
                <br></br>
                <h5>Answer = {X.toPrecision(7)}</h5>
                <Container>
                    <Row>
                        <Col>
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
                                    {state.map((element, index)=>{
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
                        </Col>
                        <Col>
                            <Line
                                data={states}
                                options={{
                                title:{
                                    display:true,
                                    text:'Bisection Method',
                                    fontSize:20
                                    },
                                legend:{
                                display:true,
                                position:'right'
                                }}}
                            />
                        </Col>
                    </Row>
                </Container>
            </Container>
            
    )
}

export default FalsePosition





